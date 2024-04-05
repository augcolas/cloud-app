import { ConfigService } from "../config/config.service";
import fetch from 'node-fetch';

const getOptions = {
    method: 'GET',
    headers: ConfigService.themoviedb.headers
};

export const getMovies = async (params= null) => {
    let url = new URL(ConfigService.themoviedb.urls.movies.discover);

    if(params.query){
        url = new URL(ConfigService.themoviedb.urls.movies.search);
        url.searchParams.append('query', params.query);
    }

    if(params.page){
        url.searchParams.append('page', params.page);
    }

    //url.searchParams.append('include_adult', true);

    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => handleFetchError(err));

    if(apiResponse.success === false){
        handleError(apiResponse);
        return;
    }

    return apiResponse;
}

export const getMovie = async (id) => {

    const url = new URL(ConfigService.themoviedb.urls.movies.movie + '/' + id);

    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => handleFetchError(err));

    if(apiResponse.success === false){
        handleError(apiResponse);
        return;
    }

    return apiResponse;
}

export const getVideos = async (id) => {

        const url = new URL(ConfigService.themoviedb.urls.movies.movie + '/' + id + '/videos');

        const apiResponse = await fetch(url, getOptions)
            .then(r => r.json())
            .catch(err => handleFetchError(err));

        if(apiResponse.success === false){
            handleError(apiResponse);
            return;
        }

        return apiResponse.results;
}

export const getRecommendations = async (id) => {

        const url = new URL(ConfigService.themoviedb.urls.movies.movie + '/' + id + '/recommendations');

        const apiResponse = await fetch(url, getOptions)
            .then(r => r.json())
            .catch(err => handleFetchError(err));

        if(apiResponse.success === false){
            handleError(apiResponse);
            return;
        }

        return apiResponse.results;
}


export const getTopRatedMovies = async () => {

        const url = new URL(ConfigService.themoviedb.urls.movies.toprated);

        const apiResponse = await fetch(url, getOptions)
            .then(r => r.json())
            .catch(err => handleFetchError(err));

        if(apiResponse.success === false){
            handleError(apiResponse);
            return;
        }

        return apiResponse.results;

}

const handleError = (response) => {
    console.error('error: ' + response.status_message)
}

const handleFetchError = (err) => {
    console.error('fetch error:' + err);
}
