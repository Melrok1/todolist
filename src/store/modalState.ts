import { MutationTree, ActionTree, GetterTree } from "vuex";

export interface ModalState {
  isAddNewListModalVisible: boolean;
}

// init state
const state: ModalState = {
  isAddNewListModalVisible: false,
};

// getters
const getters: GetterTree<ModalState, any> = {
  isAddNewListModalVisible: (state) => state.isAddNewListModalVisible,
};

// mutations
const mutations: MutationTree<ModalState> = {
  SET_ADD_NEW_LIST_MODAL_VISIBILITY(state, isVisible: boolean) {
    state.isAddNewListModalVisible = isVisible;
  },
};

// actions
const actions: ActionTree<ModalState, any> = {
  setAddNewListModal({ commit }, isVisible: boolean) {
    commit("SET_ADD_NEW_LIST_MODAL_VISIBILITY", isVisible);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
