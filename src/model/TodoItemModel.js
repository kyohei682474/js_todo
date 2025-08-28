let todoItemIndex = 0;

export class ToDoItemModel {
  //**@type {number} TodoアイテムID */
  id;
  //**@type {stirng} Todoアイテムタイトル */
  title;
  //+*@type }{boolean} Todoアイテム状態 */
  completed;

  constructor({ title, completed = false }) {
    this.id = todoItemIndex++;
    this.title = title;
    this.completed = completed;
  }
}
