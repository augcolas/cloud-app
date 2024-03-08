import { getPeople } from '/services/peoples/peoples.service';
import { getLikes } from "/services/likes.service";

/**
 * @swagger
 *  /api/peoples/{id}:
 *    get:
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              default: 0
 *          description: people id
 *      description: Returns a people
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {
    const id = parseInt(req.query.id, 10);

    switch (req.method) {

        case "GET":
            const people = await getPeople(id);

            const likes = await getLikes(id, 'people');

            if(people){
                if (likes && likes.likeCounter) {
                    people.likes = likes.likeCounter;
                } else {
                    people.likes = 0;
                }

                res.json({ status: 200, data: { people: people } });
            }
            else {
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}