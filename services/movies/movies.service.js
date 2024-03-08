import {ConfigService} from "/services/config/config.service";
import fetch from 'node-fetch';

const getOptions = {
    method: 'GET',
    headers: ConfigService.themoviedb.headers
};

//GET movies from TMDB API
export const getMovies = async (page= null) => {
    const url = new URL(ConfigService.themoviedb.urls.discover);

    if(page){
        url.searchParams.append('page', page);
    }

    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));


    if(apiResponse.success === false){
        return handleError(apiResponse);
    }

    return { status: 200, data: apiResponse.results };
}

export const getMovie = async (id) => {

    const url = new URL(ConfigService.themoviedb.urls.movie + '/' + id);

    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));

    if(apiResponse.success === false){
        return handleError(apiResponse);
    }

    return { status: 200, data: apiResponse };
}

export const getVideos = async (id) => {

        const url = new URL(ConfigService.themoviedb.urls.movie + '/' + id + '/videos');

        const apiResponse = await fetch(url, getOptions)
            .then(r => r.json())
            .catch(err => console.error('error:' + err));

        if(apiResponse.success === false){
            return handleError(apiResponse);
        }

        return { status: 200, data: apiResponse.results };
}

export const getRecommendations = async (id) => {

        const url = new URL(ConfigService.themoviedb.urls.movie + '/' + id + '/recommendations');

        const apiResponse = await fetch(url, getOptions)
            .then(r => r.json())
            .catch(err => console.error('error:' + err));

        if(apiResponse.success === false){
            return handleError(apiResponse);
        }

        return apiResponse.results;
}

const handleError = (response) => {
    console.error('error: ' + response.status_message)
    return { status: 500, error: "Internal Server Error" };
}
