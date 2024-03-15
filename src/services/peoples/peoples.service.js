import { ConfigService } from "../config/config.service";
import fetch from 'node-fetch';

const getOptions = {
    method: 'GET',
    headers: ConfigService.themoviedb.headers
};

export const getPeople = async (id) => {

        const url = new URL(ConfigService.themoviedb.urls.peoples.person + '/' + id);

        const apiResponse = await fetch(url, getOptions)
            .then(r => r.json())
            .catch(err => handleFetchError(err));

        if(apiResponse.success === false){
            handleError(apiResponse);
            return;
        }

        return apiResponse;
}

const handleError = (response) => {
    console.error('error: ' + response);
}

const handleFetchError = (error) => {
    console.error('fetch error: ' + error);
}