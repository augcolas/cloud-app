import { getLikesById, updateLikes } from "../../../../src/services/likes.service";


/**
 * @swagger
 *  /api/movies/{id}/likes:
 *      patch:
 *          headers:
 *              x-access-token:
 *                  schema:
 *                      type: string
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

    if(req.method === "PATCH"){
        const xAccessToken = req.headers['x-access-token'];
        const response = await updateLikes(id, 'movie', xAccessToken)
        console.log(response)
        res.status(201).json(response);

    }
    else if(req.method === "GET"){
        getLikesById(id, 'movie').then((likes) => {
            if (likes) {
                res.status(200).json({ likes: likes });
            }
            else {
                res.status(404).json({ status: 404, error: "Not Found" });
            }
        });

    }
    else{
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}