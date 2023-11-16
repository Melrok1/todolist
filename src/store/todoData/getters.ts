import { GetterTree } from "vuex";
import { TodoStateType } from "@/ts/interface";

const getters: GetterTree<TodoStateType, object> = {
  allTodos: (state) => state.todos,
  getTodoById: (state) => (id: string) => state.todos.find((t) => t.id === id),
};

export default getters;
