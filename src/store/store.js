import Vue from "vue";
import Vuex from "vuex";

// Vue.use = 전역으로 플러그인을 사용하기 위해?
Vue.use(Vuex);

const Storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        arr.push(
          JSON.parse(localStorage.getItem(localStorage.key(i)))
          // this.todoItems.push(localStorage.key(i));
        );
      }
    }
    return arr;
  },
};

// Vuex 기술요소
// state: 여러 컴포넌트에 공유되는 데이터 data
// getter: 연산된 state 값을 접근하는 속성 computed
// mutations: state 값을 변경하는 이벤트 로직 ∙ 메서드 methods
// actions: 비동기 처리 로직을 선언하는 메서드 aysnc methods

export const store = new Vuex.Store({
  state: {
    todoItems: Storage.fetch(),
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    },
  },
  mutations: {
    addOneItem(state, todoItem) {
      let obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      // this.todoItems.push(obj);
      state.todoItems.push(obj);
    },
    clearTodo(state) {
      localStorage.clear();
      state.todoItems = [];
    },
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem);
      state.todoItems.splice(payload.index, 1);
      localStorage.removeItem(payload.todoItem.item);
    },
    toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed =
        !state.todoItems[payload.index].completed;
      // 로컬 스토리지의 데이터를 갱신
      localStorage.removeItem(payload.todoItem.item);
      localStorage.setItem(
        payload.todoItem.item,
        JSON.stringify(payload.todoItem)
      );
    },
  },
});
