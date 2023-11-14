import { MutationTree, ActionTree, GetterTree } from "vuex";
import { TodoItemType, TodoStateType } from "@/ts/interface";

// init state
const state: TodoStateType = {
  todos: [],
};

// getters
const getters: GetterTree<TodoStateType, object> = {
  allTodos: (state) => state.todos,
};

// actions
const actions: ActionTree<TodoStateType, object> = {
  addTodo({ commit }, todoItem: TodoItemType) {
    commit("ADD_TODO", todoItem);
  },
  toggleTodoDone(
    { commit },
    payload: { isDoneState: boolean; todoId: number }
  ) {
    commit("TOGGLE_TODO_DONE", payload);
  },
};

// mutations
const mutations: MutationTree<TodoStateType> = {
  ADD_TODO(state, todoItem: TodoItemType) {
    state.todos.push(todoItem);
  },
  TOGGLE_TODO_DONE(state, payload) {
    const todo = state.todos.find((t) => t.id === payload.todoId);
    if (todo) {
      todo.isDone = payload.isDoneState;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
