import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const { token } = req.body;

    if(!token){
        res.status(400).json({message: 'Missing token'});
        return;
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err){
            res.status(401).json({message: err.message});
            return;
        }
        res.status(200).json({message: 'Token is valid'});
    });
}