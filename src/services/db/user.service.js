import clientPromise from "../../../lib/mongodb";
import { ConfigService } from "../config/config.service";

const client = await clientPromise;

const db = client.db(ConfigService.database.dbName);

export const getUser = async (email) => {
    const user = await db.collection("users").findOne({
        email: email
    });

    if(user){
        //remove password from user object
        delete user.password;
        return user;
    }
    return null;
}