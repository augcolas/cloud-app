import { getTopRatedMovies } from '/services/movies/movies.service';

/**
 * @swagger
 *  /api/movies/discover/toprated:
 *    get:
 *      description: Returns top rated movies
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {
    const movies = await getTopRatedMovies();
    res.json({status: 200, data: movies});
}