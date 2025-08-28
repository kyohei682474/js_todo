import { EventEmitter } from "../EventEmitter.js";
export class TodoListModel extends EventEmitter {
    #items
    /**
       * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
       */
  constructor(items =[]){
    super();
    this.#items = items;
  }
  //状態の問い合わせ
  //アイテムの合計を取得
  getTotalCount() {
    return this.#items.length;
  }
  
  getCompletedCount() {
    return this.#items.filter(item => item.completed).length
  }
  //全体のtodoから完了のtodoを引くことで未完了のtodoを表示する
  getUncompletedCount() {
    return this.getTotalCount() - this.getCompletedCount();
  }
  //表示できるtodoアイテムの配列を返す
  getTodoItems() {
    return this.#items;
  }

  //状態の変更を通知して、リスナー関数を登録する。
  onChange(listener){
    this.addEventListener("change", listener);
  }

  //変化を通知する。登録済みリスナー関数呼び出す。
  emitChange() {
    this.emit("change");
    }
  //Todoアイテムを追加する
  //外部にモデルが変化したことを通知するためにemitChang呼び出す。
  addTodoItem(todoItem) {
    this.#items.push(todoItem);
    this.emitChange();
  }

  //todoアイテムのcompleted状態を更新して変化を通知する。
  updateTodo({id, completed}) {
    const todoItem = this.#items.find(item => item.id === id);
    if (!todoItem) {
        return;
      } else {
        todoItem.completed = completed;
        this.emitChange();
      }
    }


  deleteTodo({id}) {
    this.#items = this.#items.filter(todoItem => {
      return todoItem.id !== id});
    this.emitChange();
  }

  editTodo({id}) {
    //railsと同じパターンでインスタンスの中から指定したidを持つ配列を探し定数に代入する
    const todoItem = this.#items.find(item => item.id === id);
    if(!todoItem) {
      return;
    } else{
      const newTitle = window.prompt("新しタイトルを入力してください", todoItem.title);
      if(!newTitle){
        return;
      } else {
        todoItem.title = newTitle; //新しいタイトルを代入する
        this.emitChange(); //変化を通知する
      }

    }
  }


}

