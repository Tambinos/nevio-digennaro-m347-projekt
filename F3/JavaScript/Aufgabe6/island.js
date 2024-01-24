export default class Island {
    constructor({ name, country = "an unknown country", imageUrl = "no image available :/" }) {
        this.name = name;
        this.country = country;
        this.imageUrl = imageUrl;
    }
}
