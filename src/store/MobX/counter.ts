import { observable, makeAutoObservable, action } from "mobx";

class CounterStore {
  counter: number = 0;

  constructor() {
    makeAutoObservable(this, {
      counter: observable,
      increment: action,
      decrement: action,
      reset: action,
    });
  }

  increment = () => {
    this.counter++;
  };

  decrement() {
    this.counter--;
  }

  reset() {
    this.counter = 0;
  }
}

const counterStore = new CounterStore();
export default counterStore;
