import jwt from 'jsonwebtoken'
import {getUser} from "../../../src/services/db/user.service";

export default async function handler(req, res) {
    const { token } = req.body;

    if(!token){
        res.status(400).json({message: 'Missing token'});
        return;
    }

    jwt.verify(token, 'secret', async (err, decoded) => {
        if(err){
            res.status(401).json({message: err.message});
            return;
        }

        if(decoded.exp){
            const date = new Date(0);
            date.setUTCSeconds(decoded.exp);
            if(date < new Date()){
                res.status(401).json({message: 'Token expired'});
                return;
            }
        }

        const user = await getUser(decoded.data.email);

        if(!user){
            res.status(401).json({message: 'User not found'});
            return;
        }

        res.status(200).json({user: user});
    });
}