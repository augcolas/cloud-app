import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config/config.service";
import { getLikes, updateLikes } from "/services/likes.service";


/**
 * @swagger
 *  /api/movies/{id}/likes:
 *      patch:
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *                  default: 1096197
 *              description: movie id
 *          description: Updates the likes of a movie
 *          responses:
 *              200:
 *                  description: Success Response
 *      get:
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *                  default: 1096197
 *              description: movie id
 *          description: Returns the likes of a movie
 *          responses:
 *              200:
 *                  description: Success Response
 */
export default async function handler(req, res) {

    const id = parseInt(req.query.id, 10);

    const client = await clientPromise;
    const db = client.db(ConfigService.database.dbName);

    switch (req.method) {

        case "PATCH":
            const response = await updateLikes(id, 'movie');
            res.status(201).json(response);
            break;

        case "GET":
            const likes = await getLikes(id, 'movie');

            if(likes){
                res.status(200).json(likes);
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }

            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}