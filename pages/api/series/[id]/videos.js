import { getVideos } from "/services/series/series.service";

/**
 * @swagger
 *  /api/series/{id}/videos:
 *    get:
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              default: 59941
 *          description: serie id
 *      description: Returns the videos of a serie
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {
    const id = parseInt(req.query.id, 10);

    switch (req.method) {
        case "GET":
            const videos = await getVideos(id);
            res.json({ status: 200, data: videos });
            break;
        default:
            res.status(405).end("Method Not Allowed");
            break;
    }
}