import { getMovie } from '../../../src/services/movies/movies.service';
import { getLikesById } from "../../../src/services/likes.service";

/**
 * @swagger
 *  /api/movies/{id}:
 *    get:
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              default: 1096197
 *          description: movie id
 *      description: Returns a movie
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {

    const id = parseInt(req.query.id, 10);

    switch (req.method) {

        case "GET":
            const movie = await getMovie(id);

            const likes = await getLikesById(id, 'movie');

            if(movie){
                if (likes && likes.likeCounter) {
                    movie.likes = likes.likeCounter;
                } else {
                    movie.likes = 0;
                }

                res.json({ status: 200, data: { movie: movie } });
            }
            else {
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}