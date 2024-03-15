import { ConfigService } from "../config/config.service";
import fetch from 'node-fetch';

const getOptions = {
    method: 'GET',
    headers: ConfigService.themoviedb.headers
};

export const getSeries = async (params= null) => {
    let url = new URL(ConfigService.themoviedb.urls.series.discover);

    if(params.query){
        url = new URL(ConfigService.themoviedb.urls.series.search);
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

    return apiResponse.results;
}

export const getSerie = async (id) => {

    const url = new URL(ConfigService.themoviedb.urls.series.serie + '/' + id);

    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));

    if(apiResponse.success === false){
        return handleError(apiResponse);
    }

    return apiResponse;
}

export const getVideos = async (id) => {

    const url = new URL(ConfigService.themoviedb.urls.series.serie + '/' + id + '/videos');

    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));

    if(apiResponse.success === false){
        return handleError(apiResponse);
    }

    return apiResponse.results;
}

export const getRecommendations = async (id) => {

    const url = new URL(ConfigService.themoviedb.urls.series.serie + '/' + id + '/recommendations');

    const apiResponse = await fetch(url, getOptions)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));

    if(apiResponse.success === false){
        return handleError(apiResponse);
    }

    return apiResponse.results;
}


export const getTopRatedSeries = async () => {

    const url = new URL(ConfigService.themoviedb.urls.series.toprated);

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
    throw new Error(response.status_message);
}
