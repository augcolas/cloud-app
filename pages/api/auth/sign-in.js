import jwt from 'jsonwebtoken'
import clientPromise from "/lib/mongodb";
import {ConfigService} from "/src/services/config/config.service";

const client = await clientPromise;
const db = client.db(ConfigService.database.dbName);

export default async function handler(req, res) {

    const { email, password } = req.body

    const user = await db.collection('users').findOne({ email: email, password: password });

    if(!user){
        res.status(401).json({message: 'Invalid credentials'});
        return;
    }

    const jwt_token = jwt.sign({
        data: {
            email: email,
        }
    }, 'secret', { expiresIn: '1h' });

    res.status(200).json({
        token: jwt_token
    });
}