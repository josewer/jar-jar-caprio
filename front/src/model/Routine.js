
export class Routine {
  constructor(name, description, id = null, userId = null) {
    this.id = id;
    this.userId = userId; 
    this.name = name;
    this.description = description;
  }
}
