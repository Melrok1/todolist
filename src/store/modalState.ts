import { MutationTree, ActionTree, GetterTree } from "vuex";
import { ModalStateType } from "@/ts/interface";

// init state
const state: ModalStateType = {
  isAddNewTodoModalVisible: false,
  isEditTodoModalVisible: false,
  currentTodoId: null,
};

// getters
const getters: GetterTree<ModalStateType, any> = {
  isAddNewTodoModalVisible: (state) => state.isAddNewTodoModalVisible,
  isEditTodoModalVisible: (state) => state.isEditTodoModalVisible,
  getCurrentTodoId: (state) => state.currentTodoId,
};

// mutations
const mutations: MutationTree<ModalStateType> = {
  SET_ADD_NEW_TODO_MODAL_VISIBILITY(state, isVisible: boolean) {
    state.isAddNewTodoModalVisible = isVisible;
  },
  SET_EDIT_TODO_MODAL_VISIBILITY(state, isVisible: boolean) {
    state.isEditTodoModalVisible = isVisible;
  },
  SET_CURRENT_TODO_ID(state, currentId: number | null) {
    state.currentTodoId = currentId;
  },
};

// actions
const actions: ActionTree<ModalStateType, any> = {
  setAddNewTodoModal({ commit }, isVisible: boolean) {
    commit("SET_ADD_NEW_TODO_MODAL_VISIBILITY", isVisible);
  },
  setEditTodoModal({ commit }, isVisible: boolean) {
    commit("SET_EDIT_TODO_MODAL_VISIBILITY", isVisible);
  },
  setCurrentTodoId({ commit }, currentId: number | null) {
    commit("SET_CURRENT_TODO_ID", currentId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
