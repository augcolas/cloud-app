import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config/config.service";
import { getLikes, updateLikes } from "/services/likes.service";


/**
 * @swagger
 *  /api/series/{id}/likes:
 *      patch:
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *                  default: 59941
 *              description: serie id
 *          description: Updates the likes of a serie
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
 *                  default: 59941
 *              description: serie id
 *          description: Returns the likes of a serie
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
            const response = await updateLikes(id, 'serie');
            res.status(response.status).json(response);
            break;

        case "GET":

            const responseGet = await getLikes(id, 'serie');
            res.status(responseGet.status).json(responseGet);
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}