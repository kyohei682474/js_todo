import { element  } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";
export class TodoListView {
  createElement(todoItems, { onUpdateTodo, onDeleteTodo, onEditTodo}) {
    const todoListElement = element`<ul></ul>`;
    todoItems.forEach(todoItem => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onUpdateTodo, 
        onDeleteTodo, 
        onEditTodo
      });
      //削除、、編集、更新された要素をtodoListElementに追加する
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;

    
    }
    
}