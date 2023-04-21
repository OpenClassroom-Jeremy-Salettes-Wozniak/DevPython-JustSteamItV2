export class ModelApi{

    constructor(url){
        this.url = url;
    }

    async getResponse(){
        let response = await fetch(this.url);
        let data = await response.json();
        return data;
    }

    async getResults(){
        let data = await this.getResponse();
        return data.results;
    }
    

}
