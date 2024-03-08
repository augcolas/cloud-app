import { getVideos } from "/services/movies/movies.service";

/**
 * @swagger
 *  /api/movies/{id}/videos:
 *    get:
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              default: 1096197
 *          description: movie id
 *      description: Returns the videos of a movie
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