import clientPromise from "/lib/mongodb";
import { ConfigService } from "/src/services/config/config.service";

const client = await clientPromise;

const db = client.db(ConfigService.database.dbName);

export const getLikes = async (id,type) => {
    return  await db.collection("likes").findOne({
        idTMDB: id,
        type: type
    });
}

export const updateLikes = async (id,type) => {
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
            { $inc: { likeCounter : 1 } }
        )
        data = {
            action: 'likeCounter incremented',
            id: id,
            matchedCount: resMongo.matchedCount,
            modifiedCount: resMongo.modifiedCount
        }
        return data;
    } else {
        resMongo = await db.collection("likes").insertOne(
            {
                idTMDB: id,
                likeCounter: 1,
                type: type
            }
        )
        data = {
            action: 'likeCounter created',
            id: id,
            insertedId: resMongo.insertedId
        }
        return data;
    }
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