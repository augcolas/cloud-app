import clientPromise from "../../lib/mongodb";
import { ConfigService } from "./config/config.service";

let client;
let db;

const connectToDatabase = async () => {
    client = await clientPromise;
    db = client.db(ConfigService.database.dbName);
};

// Ensure connection to the database when the module is imported
connectToDatabase();

export const getLikesById = async (id, type) => {
    return  await db.collection("likes").findOne({
        idTMDB: id,
        type: type
    });
}

export const getLikes = async (xAccessToken) => {
    const user = await db.collection("users").findOne({
        token: xAccessToken
    });

    if (!user) {
        return { error: 'User not found' };
    }

    return user.likes;
}

export const updateLikes = async (id,type,xAccessToken) => {

    const user = await db.collection("users").findOne({
        token: xAccessToken
    });

    if (!user) {
        return { error: 'User not found' };
    }

    if(!user.likes){
        user.likes = [];
    }

    if(user.likes.includes(id)){
        await db.collection("users").updateOne(
            { token: xAccessToken },
            { $pull: { likes: id } }
        );
        await removeLike(id,type);
    }
    else{
        await db.collection("users").updateOne(
            { token: xAccessToken },
            { $push: { likes: id } }
        );
        await addLike(id,type);
    }
    return await getLikes(xAccessToken);
}

export const getLiked = async (max_results = 0, type) => {
    const liked = await db.collection("likes")
        .find({
            likeCounter: { $gt: 0 },
            type: type
        })
        .limit(max_results)
        .toArray();

    return liked.map(elem => {
        return {
            id: elem.idTMDB,
            likeCounter: elem.likeCounter
        }
    });
}

const addLike = async (id, type) => {
    const like = await db.collection("likes").findOne({
        idTMDB: id,
        type: type
    });

    if (like) {
        await db.collection("likes").updateOne({
                idTMDB: id,
                type: type
            },
            { $inc: { likeCounter : 1 } }
        )

    } else {
        await db.collection("likes").insertOne(
            {
                idTMDB: id,
                likeCounter: 1,
                type: type
            }
        )
    }
}

const removeLike = async (id, type) => {
    const like = await db.collection("likes").findOne({
        idTMDB: id,
        type: type
    });
    let resMongo, data;

    if (like) {
        resMongo = await db.collection("likes").updateOne({
                idTMDB: id,
                type: type
            },
            { $inc: { likeCounter : -1 } }
        )
        data = {
            action: 'likeCounter decremented',
            id: id,
            matchedCount: resMongo.matchedCount,
            modifiedCount: resMongo.modifiedCount
        }
        return data;
    } else {
        return { error: 'Like not found' };
    }
}