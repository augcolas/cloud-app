import clientPromise from "../../lib/mongodb";

const client = await clientPromise;
const db = client.db("cloud-db");
export const getLikes = async (id) => {
    const likes = await db.collection("likes").findOne({idTMDB: id});

    return { status: 200, data: { likes: likes } };
}

export const updateLikes = async (id) => {
    const like = await db.collection("likes").findOne({idTMDB: id});
    let resMongo, data;

    if (like) {
        resMongo = await db.collection("likes").updateOne(
            {idTMDB: id},
            { $inc: { likeCounter : 1 } }
        )
        data = {
            action: 'likeCounter incremented',
            id: id,
            matchedCount: resMongo.matchedCount,
            modifiedCount: resMongo.modifiedCount
        }
        return { status: 201, data: data };
    } else {
        resMongo = await db.collection("likes").insertOne(
            {
                idTMDB: id,
                likeCounter: 1
            }
        )
        data = {
            action: 'likeCounter created',
            id: id,
            insertedId: resMongo.insertedId
        }
        return { status: 201, data: data };
    }
}

export const getLikedMovies = async (max_results = 0) => {
    const liked_movies = await db.collection("likes").find({likeCounter: { $gt: 0 }}).limit(max_results).toArray();
    return liked_movies.map(movie => {
        return {
            id: movie.idTMDB,
            likeCounter: movie.likeCounter
        }
    });
}