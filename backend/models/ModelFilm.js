export class ModelFilm {
    /*
    * @param {Object} data
    */
    constructor(data) {
        this.data = data;
        this.actors = this.data.actors;
        this.avg_vote = this.data.avg_vote;
        this.budget = this.data.budget;
        this.budget_currency = this.data.budget_currency;
        this.company = this.data.company;
        this.countries = this.data.countries;
        this.date_published = this.data.date_published;
        this.description = this.data.description;
        this.directors = this.data.directors;
        this.duration = this.data.duration;
        this.genres = this.data.genres;
        this.id = this.data.id;
        this.image_url = this.data.image_url;
        this.imdb_score = this.data.imdb_score;
        this.languages = this.data.languages;
        this.long_description = this.data.long_description;
        this.metascore = this.data.metascore;
        this.original_title = this.data.original_title;
        this.rated = this.data.rated;
        this.reviews_from_critics = this.data.reviews_from_critics;
        this.reviews_from_users = this.data.reviews_from_users;
        this.title = this.data.title;
        this.url = this.data.url;
        this.usa_gross_income = this.data.usa_gross_income;
        this.votes = this.data.votes;
        this.worldwide_gross_income = this.data.worldwide_gross_income;
        this.writers = this.data.writers;
        this.year = this.data.year;
    }
        

}