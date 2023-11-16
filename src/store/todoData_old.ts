import { MutationTree, ActionTree, GetterTree } from "vuex";
import { TodoItemType, TodoStateType } from "@/ts/interface";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// init state
const state: TodoStateType = {
  todos: [],
};

// getters
const getters: GetterTree<TodoStateType, object> = {
  allTodos: (state) => state.todos,
  getTodoById: (state) => (id: string) => {
    return state.todos.find((t) => t.id === id);
  },
};

// actions
const actions: ActionTree<TodoStateType, object> = {
  async addTodo({ commit }, todoItem: TodoItemType) {
    const db = getFirestore();
    const todoId = todoItem.id.toString();
    const todoRef = doc(db, "todos", todoId);

    await setDoc(todoRef, todoItem);

    commit("ADD_TODO", { ...todoItem, id: todoRef.id });
  },

  async toggleTodoDone(
    { commit },
    payload: { isDoneState: boolean; todoId: string }
  ) {
    const db = getFirestore();
    const todoRef = doc(db, "todos", payload.todoId.toString());

    // Aktualizujeme Todo vo Firestore
    await setDoc(todoRef, { isDone: payload.isDoneState }, { merge: true });

    // Aktualizujeme Todo vo Vuexu
    commit("TOGGLE_TODO_DONE", payload);
  },

  async deleteTodo({ commit }, todoId: number) {
    const db = getFirestore();
    const todoRef = doc(db, "todos", todoId.toString());
    await deleteDoc(todoRef);

    commit("DELETE_TODO", todoId);
  },

  async updateTodo(
    { commit },
    payload: { updatedTodo: TodoItemType; todoId: string }
  ) {
    const db = getFirestore();
    const todoRef = doc(db, "todos", payload.todoId.toString());

    await setDoc(todoRef, payload.updatedTodo, { merge: true });
    commit("UPDATE_TODO", payload);
  },

  async fetchTodos({ commit }) {
    const db = getFirestore();
    const todoCollection = collection(db, "todos");
    const todoSnapshot = await getDocs(todoCollection);
    const todos = todoSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        dueDate: data.dueDate?.toDate(),
      };
    });
    commit("SET_TODOS", todos);
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
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
