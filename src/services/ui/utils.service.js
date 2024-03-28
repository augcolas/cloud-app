import {ConfigService} from "../config/config.service";

export const getPosterPath = (poster_path) => {
    return 'url(' + ConfigService.themoviedb.utils.image.poster_path + '/' + poster_path + ')';
}