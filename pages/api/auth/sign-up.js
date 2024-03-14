import jwt from 'jsonwebtoken'
import clientPromise from "/lib/mongodb";
import {ConfigService} from "/src/services/config/config.service";

const client = await clientPromise;
const db = client.db(ConfigService.database.dbName);

export default async function handler(req, res) {

    const { email, password, firstName, lastName } = req.body

    if(!email || !password || !firstName || !lastName){
        res.status(400).json({message: 'Missing input'});
        return;
    }

    if(!email.includes('@')){
        res.status(400).json({message: 'Invalid email'});
        return;
    }

    if(password.length < 6){
        res.status(400).json({message: 'Password too short'});
        return;
    }

    const jwt_token = jwt.sign({
        data: {
            email: email
        }
    }, 'secret', { expiresIn: '1h' });

    await saveUserToDatabase({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        token: jwt_token
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    });

    res.status(200).json({
        token: jwt_token
    });
}

const saveUserToDatabase = async (userData) => {
    //check if user already exists via email
    const user = await db.collection("users").findOne({ email: userData.email });
    if (user) {
        throw new Error("User already exists");
    }
    else{
        // Save user in database
        await db.collection("users").insertOne(userData);
    }

}