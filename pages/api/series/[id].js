import clientPromise from '/lib/mongodb';
import { ConfigService } from "/services/config/config.service";
import { getSerie } from '/services/series/series.service';

/**
 * @swagger
 *  /api/series/{id}:
 *    get:
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              default: 59941
 *          description: serie id
 *      description: Returns a serie
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {

    const id = parseInt(req.query.id, 10);

    const client = await clientPromise;
    const db = client.db(ConfigService.database.dbName);

    switch (req.method) {

        case "GET":
            const serie = await getSerie(id);

            const likes = await db.collection("likes").findOne({idTMDB: id});

            if(serie){
                if (likes && likes.likeCounter) {
                    serie.likes = likes.likeCounter;
                } else {
                    serie.likes = 0;
                }

                res.json({ status: 200, data: { serie: serie } });
            }
            else {
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}