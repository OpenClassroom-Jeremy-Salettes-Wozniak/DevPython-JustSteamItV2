// Controllers
import FilmController from "./controllers/ControllerFilm.js";

class Main {

    constructor() {
        this.filmController = new FilmController();
        this.init();
    }

    init() {
        console.log("main init");
        this.film__by_imdb();
        this.films_by_imdb();
        this.film_by_genres();
    }
    
    async film__by_imdb(){
        try {
            // ...
        }
        catch (e) {
            console.log("Main.film__by_imdb() error : " + e);
        }
    }


    async films_by_imdb(){
        try {
            // ...
        }
        catch (e) {
            console.log("Main.films_by_imdb() error : " + e);
        }
    }

    async film_by_genres(){
        try {
            
        }
        catch (e) {
            console.log("Main.film_by_genres() error : " + e);
        }
    }



}

new Main();