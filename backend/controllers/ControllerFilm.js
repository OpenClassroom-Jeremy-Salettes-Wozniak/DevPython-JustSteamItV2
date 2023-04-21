import { ModelApi } from '../models/ModelApi.js';
import { ModelFilm } from '../models/ModelFilm.js';

import { ViewFilm } from '../views/ViewFilm.js';

export default class ControllerFilm {
    
    constructor() {
        this.displayBestFilm();
    }

    async displayBestFilm() {
        let Api = await new ModelApi("http://127.0.0.1:8001/api/v1/titles/?sort_by=-imdb_score").getResults();
        let api_url_film = await Api[0].url;
        let Api_response_film = await new ModelApi(api_url_film).getResponse();
        let Film = await new ModelFilm(Api_response_film);
        let View = await new ViewFilm(Film);

    }


    

}