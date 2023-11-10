import { MutationTree, ActionTree, GetterTree } from "vuex";

// interface
export interface TodoItem {
  title: string;
  content: string;
  dueDate: Date | null;
}

export interface TodoState {
  todos: TodoItem[];
}

// init state
const state: TodoState = {
  todos: [],
};

// getters
const getters: GetterTree<TodoState, any> = {
  allTodos: (state) => state.todos,
};

// actions
const actions: ActionTree<TodoState, any> = {
  addTodo({ commit }, todoItem: TodoItem) {
    commit("ADD_TODO", todoItem);
  },
};

// mutations
const mutations: MutationTree<TodoState> = {
  ADD_TODO(state, todoItem: TodoItem) {
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
