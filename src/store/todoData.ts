import { MutationTree, ActionTree, GetterTree } from "vuex";
import { TodoItemType, TodoStateType } from "@/ts/interface";

// init state
const state: TodoStateType = {
  todos: [],
};

// getters
const getters: GetterTree<TodoStateType, object> = {
  allTodos: (state) => state.todos,
  getTodoById: (state) => (id: number) => {
    return state.todos.find((t) => t.id === id);
  },
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
  deleteTodo({ commit }, todoId: number) {
    commit("DELETE_TODO", todoId);
  },
  updateTodo({ commit }, payload: { updatedTodo: object; todoId: number }) {
    commit("UPDATE_TODO", payload);
  },
};

// mutations
const mutations: MutationTree<TodoStateType> = {
  ADD_TODO(state, todoItem: TodoItemType) {
    state.todos.push(todoItem);
  },
  TOGGLE_TODO_DONE(state, payload) {
    // focus todo using find
    const todo = state.todos.find((t) => t.id === payload.todoId);
    if (todo) {
      todo.isDone = payload.isDoneState;
    }
  },
  DELETE_TODO(state, todoId) {
    state.todos = state.todos.filter((t) => t.id !== todoId);
  },
  UPDATE_TODO(state, payload) {
    // focus todo using findIndex
    const index = state.todos.findIndex((t) => t.id === payload.todoId);
    if (index !== -1) {
      const originalTodo = state.todos[index];
      const mergedTodo = {
        ...originalTodo,
        ...payload.updatedTodo,
      };
      state.todos[index] = mergedTodo;
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
