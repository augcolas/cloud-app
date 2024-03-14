import { getLiked } from '/src/services/likes.service';
import { getRecommendations } from "/src/services/movies/movies.service";

/**
 * @swagger
 *  /api/movies/discover/recommended:
 *    get:
 *      description: Returns recommended movies
 *      responses:
 *          200:
 *              description: Success Response
 */
export default async function handler(req, res) {
    const liked_movies = await getLiked(10, 'movie');
    const recommended_movies = [];

    for (const movie of liked_movies) {
        const id = movie.id;
        const recommendations = await getRecommendations(id);
        recommended_movies.push(...recommendations);
    }

    const unique_recommended_movies = recommended_movies.filter(onlyUnique);
    res.json({ status: 200, data: unique_recommended_movies });
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}