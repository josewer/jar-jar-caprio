export class Exercise {

    constructor (name , category , muscle , id = null) {
        this. name = name;
        this.category = category;
        this.muscle = muscle;
        this.id = id ?? crypto.randomUUID();
    }
}