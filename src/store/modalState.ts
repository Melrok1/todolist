import { MutationTree, ActionTree, GetterTree } from "vuex";

// interface
export interface ModalState {
  isAddNewTodoModalVisible: boolean;
}

// init state
const state: ModalState = {
  isAddNewTodoModalVisible: false,
};

// getters
const getters: GetterTree<ModalState, any> = {
  isAddNewTodoModalVisible: (state) => state.isAddNewTodoModalVisible,
};

// mutations
const mutations: MutationTree<ModalState> = {
  SET_ADD_NEW_TODO_MODAL_VISIBILITY(state, isVisible: boolean) {
    state.isAddNewTodoModalVisible = isVisible;
  },
};

// actions
const actions: ActionTree<ModalState, any> = {
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
