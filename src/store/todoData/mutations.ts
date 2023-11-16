import { MutationTree } from "vuex";
import { TodoItemType, TodoStateType } from "@/ts/interface";

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

  DELETE_TODO(state, todoId) {
    state.todos = state.todos.filter((t) => t.id !== todoId);
  },

  UPDATE_TODO(state, payload) {
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

  SET_TODOS(state, todos) {
    state.todos = todos;
  },
};

export default mutations;
