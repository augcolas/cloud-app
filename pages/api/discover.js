import fetch from 'node-fetch';
import { ConfigService } from '/services/config/config.service';
import { getMovies } from '/services/movies/movies.service';

/**
 * @swagger
 *  /api/discover:
 *      get:
 *          description: Returns movies
 *          responses:
 *              200:
 *                  description: Success Response
 */
export default async function handler(req, res) {
    const discoveries = await getMovies();
    res.json(discoveries);
}