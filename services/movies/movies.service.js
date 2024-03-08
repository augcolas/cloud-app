import {ConfigService} from "/services/config/config.service";
import fetch from 'node-fetch';

const getOptions = {
    method: 'GET',
    headers: ConfigService.themoviedb.headers
};


export const searchMovies = async (query, page= null) => {
    const url = new URL(ConfigService.themoviedb.urls.search);

    url.searchParams.append('query', query);
    page !== null ? url.searchParams.append('page', page) : null;


    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));

    if(apiResponse.success === false){
        return handleError(apiResponse);
    }

    return { status: 200, data: apiResponse.results };
}

export const getMovies = async (params= null) => {
    let url = new URL(ConfigService.themoviedb.urls.discover);

    if(params.query){
        url = new URL(ConfigService.themoviedb.urls.search);
        url.searchParams.append('query', params.query);
    }

    if(params.page){
        url.searchParams.append('page', params.page);
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


export const getTopRatedMovies = async () => {

        const url = new URL(ConfigService.themoviedb.urls.toprated);

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
