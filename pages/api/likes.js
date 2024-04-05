import {getLikes} from "../../src/services/likes.service";

export default async function handler(req, res) {
    const xAccessToken = req.headers['x-access-token'];
    if(!xAccessToken){
        res.status(401).end();
    }

    if(req.method === "GET"){
        const response = await getLikes(xAccessToken);
        res.status(200).json(response);
    }
    else{
        res.status(405).end();
    }
}