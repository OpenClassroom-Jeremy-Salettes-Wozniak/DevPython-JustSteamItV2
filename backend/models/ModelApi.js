export class ModelApi{

    constructor(url){
        this.url = url;
    }

    // Get the response from the API
    async getResponse(){
        let response = await fetch(this.url);
        let data = await response.json();
        return data;
    }

    // Get the results from the API
    async getResults(){
        let data = await this.getResponse();
        return data.results;
    }
    

}
