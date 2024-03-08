import { getMovies } from "../../services/movies/movies.service";

/**
 * @swagger
 *  /api/movies:
 *      get:
 *          parameters:
 *            - in: query
 *              name: query
 *              required: false
 *              schema:
 *                  type: string
 *              description: search query
 *            - in: query
 *              name: page
 *              required: false
 *              schema:
 *                  type: integer
 *                  default: 1
 *                  description: page number
 *          description: Returns a paginated list of movies
 *          responses:
 *              200:
 *                  description: Success Response
 */
export default async function handler(req , res){
    const searchParams = req.query;

    const movies = await getMovies(searchParams);

    switch (req.method) {
        case 'GET':
            res.json({ status: 200, data: movies, method: "GET" });
            break;
        default:
            res.status(405).end();
            break;
    }
}