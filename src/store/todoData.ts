import { MutationTree, ActionTree, GetterTree } from "vuex";
import { TodoItemType, TodoStateType } from "@/components/interface/interface";

// init state
const state: TodoStateType = {
  todos: [],
};

// getters
const getters: GetterTree<TodoStateType, any> = {
  allTodos: (state) => state.todos,
};

// actions
const actions: ActionTree<TodoStateType, any> = {
  addTodo({ commit }, todoItem: TodoItemType) {
    commit("ADD_TODO", todoItem);
  },
};

// mutations
const mutations: MutationTree<TodoStateType> = {
  ADD_TODO(state, todoItem: TodoItemType) {
    state.todos.push(todoItem);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
