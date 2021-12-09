export class Todo {
  _id: string;
  title: string;
  completed: boolean;

  constructor(
    id: string,
    title: string,
    completed: boolean = false,
  ) {
    this._id = id;
    this.title = title;
    this.completed = completed;
  }
}
