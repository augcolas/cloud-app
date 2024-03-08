import { getTopRatedSeries } from '/services/series/series.service';

/**
 * @swagger
 *  /api/series/discover/toprated:
 *    get:
 *      description: Returns top rated series
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {
    const series = await getTopRatedSeries();
    res.json({status: 200, data: series});
}