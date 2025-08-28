import { element } from "./html-util.js";  
export class TodoItemView {
 
  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onEditTodo}){
    const todoItemElement = todoItem.completed
        ? element`<li class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <input type="checkbox" class="checkbox" checked>
              <s class="mb-0">${todoItem.title}</s>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-danger btn-sm">削除</button>
            </div>
          </li>`
        : element`<li class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <input type="checkbox" class="checkbox">
              <span>${todoItem.title}</span>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-success btn-sm">編集</button>
              <button class="btn btn-danger btn-sm">削除</button>
            </div>
          </li>`;
    //チェックボックスのトグルの処理を行う
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change",() => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      })
    })

    //編集ボタンの処理を行う
    const editButtonElement = todoItemElement.querySelector(".btn-success");
      //チェックボックスにてチェックが入っている場合は編集ボタンが存在しないため、if文で存在する場合のみイベントリスナーを登録する
    if(editButtonElement) {
      editButtonElement.addEventListener("click", () => {
        onEditTodo({
          id: todoItem.id
        })
      })
    }

    //削除ボタンの処理を行う
    const deleteButtonElement = todoItemElement.querySelector(".btn-danger");
      deleteButtonElement.addEventListener("click", () => { 
        onDeleteTodo({
          id: todoItem.id
        })
      })
    //作った要素を返す
    return todoItemElement;
     
  }
}