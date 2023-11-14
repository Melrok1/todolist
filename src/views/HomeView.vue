<template>
  <div class="home">
    <button @click="toggleAddTodoForm">Add new list</button>
    <add-new-todo-vue v-if="isAddTodoFormVisible"/>
    <edit-todo-form v-if="isEditTodoModalVisible" />
    <todo-list-vue />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from 'vuex';
import AddNewTodoVue from "@/components/AddNewTodoForm.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";
import TodoListVue from "@/components/TodoComponents/TodoList.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    AddNewTodoVue, TodoListVue, EditTodoForm
  },
  setup() {
    const store = useStore();

    const isAddTodoFormVisible = computed(
      () => store.getters['modalState/isAddNewTodoModalVisible']
    );

    const isEditTodoModalVisible = computed(
      () => store.getters['modalState/isEditTodoModalVisible']
    )

    const toggleAddTodoForm = () => {
      store.dispatch('modalState/setAddNewTodoModal', !isAddTodoFormVisible.value);
    };

    return {
      isAddTodoFormVisible,
      isEditTodoModalVisible,
      toggleAddTodoForm
    };
  },
});
</script>