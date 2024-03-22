export const ConfigService = {
    themoviedb: {
        urls: {
            movies: {
                discover: 'https://api.themoviedb.org/3/discover/movie',
                movie: 'https://api.themoviedb.org/3/movie',
                toprated:'https://api.themoviedb.org/3/movie/top_rated',
                search: 'https://api.themoviedb.org/3/search/movie'
            },
            series: {
                discover: 'https://api.themoviedb.org/3/discover/tv',
                serie: 'https://api.themoviedb.org/3/tv',
                toprated:'https://api.themoviedb.org/3/tv/top_rated',
                search: 'https://api.themoviedb.org/3/search/tv'
            },
            peoples: {
                person: 'https://api.themoviedb.org/3/person'
            }
        },
        headers: {
            accept: 'application/json',
            authorization: 'Bearer ' + process.env.API_TOKEN
        }
    },
    database: {
        dbName: 'cloud-db',
    }
}