class api{

    constructor(url){
        this.url = url;
    }

    async getResponse(){
        let response = await fetch(this.url);
        let data = await response.json();
        return data;
    }
}