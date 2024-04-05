import { getLikesById, updateLikes } from "../../../../src/services/likes.service";


/**
 * @swagger
 *  /api/peoples/{id}/likes:
 *      patch:
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *                  default: 1
 *              description: people id
 *          description: Updates the likes of a people
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
 *                  default: 1
 *              description: people id
 *          description: Returns the likes of a people
 *          responses:
 *              200:
 *                  description: Success Response
 */
export default async function handler(req, res) {

    const id = parseInt(req.query.id, 10);

    switch (req.method) {

        case "PATCH":
            const response = await updateLikes(id, 'people');
            res.status(201).json(response);
            break;

        case "GET":
            const likes = await getLikesById(id, 'people');

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