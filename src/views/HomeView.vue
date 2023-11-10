<template>
  <div class="home">
    <button @click="toggleAddListForm">Add new list</button>
    <add-new-todo-vue v-if="isAddListFormVisible"/>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import AddNewTodoVue from "@/components/AddNewTodo.vue";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    AddNewTodoVue,
  },
  setup() {
    const store = useStore();

    const isAddListFormVisible = computed(
      () => store.getters['modalState/isAddNewListModalVisible']
    );

    const toggleAddListForm = () => {
      store.dispatch('modalState/setAddNewListModal', !isAddListFormVisible.value);
    };

    return {
      isAddListFormVisible,
      toggleAddListForm
    };
  },
});
</script>

