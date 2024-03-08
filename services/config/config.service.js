export const ConfigService = {
    themoviedb: {
        urls: {
            movies: {
                discover: 'https://api.themoviedb.org/3/discover/movie',
                movie: 'https://api.themoviedb.org/3/movie',
                toprated:'https://api.themoviedb.org/3/movie/top_rated',
                search: 'https://api.themoviedb.org/3/search/movie'
            }
        },
        keys: {
            API_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmRkOTdhOWNmMjI0ODc3MjMzNWY1NTJlMjU3MmFhOCIsInN1YiI6IjY1ZTliNzU3MzM5NmI5MDE2MjgzYWVjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pXiaYeGXWVkgOXYNujvs8LnDKnZuCURcPiAeyVZZnRU',
            API_KEY: 'ffdd97a9cf2248772335f552e2572aa8'
        },
        headers: {
            accept: 'application/json',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmRkOTdhOWNmMjI0ODc3MjMzNWY1NTJlMjU3MmFhOCIsInN1YiI6IjY1ZTliNzU3MzM5NmI5MDE2MjgzYWVjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pXiaYeGXWVkgOXYNujvs8LnDKnZuCURcPiAeyVZZnRU'
        }
    }
}