import { getLiked } from '../../../../src/services/likes.service';
import { getRecommendations } from "../../../../src/services/series/series.service";

/**
 * @swagger
 *  /api/series/discover/recommended:
 *    get:
 *      description: Returns recommended series
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {
    const liked_series = await getLiked(10, 'serie');
    const recommended_series = [];

    for (const serie of liked_series) {
        const id = serie.id;
        const recommendations = await getRecommendations(id);
        recommended_series.push(...recommendations);
    }

    const unique_recommended_series = recommended_series.filter(onlyUnique);
    res.json({ status: 200, data: unique_recommended_series });
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}