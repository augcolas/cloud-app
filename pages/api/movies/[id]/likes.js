import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config/config.service";
import { getLikes, updateLikes } from "/services/movies/likes.service";


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
            const response = await updateLikes(id);
            res.status(response.status).json(response);
            break;

        case "GET":

            const responseGet = await getLikes(id);
            res.status(responseGet.status).json(responseGet);
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}