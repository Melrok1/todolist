import { MutationTree, ActionTree, GetterTree } from "vuex";
import { ModalStateType } from "@/components/interface/interface";

// init state
const state: ModalStateType = {
  isAddNewTodoModalVisible: false,
};

// getters
const getters: GetterTree<ModalStateType, any> = {
  isAddNewTodoModalVisible: (state) => state.isAddNewTodoModalVisible,
};

// mutations
const mutations: MutationTree<ModalStateType> = {
  SET_ADD_NEW_TODO_MODAL_VISIBILITY(state, isVisible: boolean) {
    state.isAddNewTodoModalVisible = isVisible;
  },
};

// actions
const actions: ActionTree<ModalStateType, any> = {
  setAddNewTodoModal({ commit }, isVisible: boolean) {
    commit("SET_ADD_NEW_TODO_MODAL_VISIBILITY", isVisible);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
