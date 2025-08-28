import { element,render } from "./view/html-util.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { ToDoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";


export class App {
  //初期化を行う
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  //タスクの追加を行う(定義)
  hadleAddTask(title) {
    this.#todoListModel.addTodoItem(new TodoItemModel({ title, completed: false }));
  }
  //タスクの更新を行う(定義)
  handleUpdateTask({id, completed}) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  //タスクの削除を行う(定義)
  handleDeleteTask({ id }){
    
    this.#todoListModel.deleteTodo({ id });
  }

  handleEditTask({ id}) {
    this.#todoListModel.editTodo({ id });
  }

  main() {

    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
   
    //状態の更新を行なっていく
    this.#todoListModel.onChange(() => {
      const todoItems =  this.#todoListModel.getTodoItems();
      const todoListElement = this.#todoListView.createElement(todoItems, {
        //第二引数として渡している
        onUpdateTodo: ({ id, completed }) => {
          this.#todoListModel.updateTodo( {id, completed });
        },
        onDeleteTodo: ({ id }) => {
          if (!window.confirm("本当に削除しますか？")) return; 
          this.#todoListModel.deleteTodo({ id });
        },
        onEditTodo: ({ id }) => {
          this.#todoListModel.editTodo( { id });
        }
      })
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `全てのタスク: ${this.#todoListModel.getTotalCount()} 
                                          完了タスク: ${this.#todoListModel.getCompletedCount()}
                                          未完了タスク: ${this.#todoListModel.getUncompletedCount()} 
                                          `;
    });

    //初回の状態の更新を行う
    formElement.addEventListener("submit", (event)=> {
      event.preventDefault();
      this.#todoListModel.addTodoItem(new ToDoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = "";
    })

    
  }



}