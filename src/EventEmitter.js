export class EventEmitter {

  #listeners = new Map();

  addEventListener(type, listener) {
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set());
    }

    const listenersSet = this.#listeners.get(type)
    listenersSet.add(listener);
  }

  emit(type) {
   const listenersSet = this.#listeners.get(type); 
    if(!listenersSet) {
      return;
    }
    listenersSet.forEach(listener =>{
      listener.call(this);
    })
  }

  removeEventListener(type, listener) {
    const listenersSet = this.#listeners.get(type);
    if(!listenersSet) {
      return;
    }
    listenersSet.delete
  }
}
