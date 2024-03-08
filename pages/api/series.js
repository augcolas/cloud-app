import { getSeries } from "/services/series/series.service";

/**
 * @swagger
 *  /api/series:
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
 *          description: Returns a paginated list of series
 *          responses:
 *              200:
 *                  description: Success Response
 */
export default async function handler(req , res){
    const searchParams = req.query;

    const series = await getSeries(searchParams);

    switch (req.method) {
        case 'GET':
            res.json({ status: 200, data: series});
            break;
        default:
            res.status(405).end();
            break;
    }
}