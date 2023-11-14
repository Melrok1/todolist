<template>
  <div class="home">
    <div class="control-panel">
      <button @click="toggleAddTodoForm">Add new list</button>
      <div class="searchbar">
        <input type="text" v-model="searchQuery"/>
      </div>
      <div class="buttons">
        <button @click="setFilter('all')">show all</button>
        <button @click="setFilter('done')">show all done</button>
        <button @click="setFilter('inProgress')">show in progress</button>
        <button @click="setFilter('noDeadline')">show without deadline</button>
      </div>
    </div>
    <add-new-todo-vue v-if="isAddTodoFormVisible" />
    <edit-todo-form v-if="isEditTodoModalVisible" />
    <todo-list-vue :filteredTodos="filteredTodos"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import AddNewTodoVue from "@/components/AddNewTodoForm.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";
import TodoListVue from "@/components/TodoComponents/TodoList.vue";
import { TodoItemType } from "@/ts/interface";

export default defineComponent({
  name: "HomeView",
  components: {
    AddNewTodoVue,
    TodoListVue,
    EditTodoForm,
  },
  setup() {
    const store = useStore();
    const currentFilter = ref<string>("all");
    const searchQuery = ref("");

    const setFilter = (filterType: string) => {
      currentFilter.value = filterType;
    };

    const isAddTodoFormVisible = computed(
      () => store.getters["modalState/isAddNewTodoModalVisible"]
    );

    const isEditTodoModalVisible = computed(
      () => store.getters["modalState/isEditTodoModalVisible"]
    );

    const toggleAddTodoForm = () => {
      store.dispatch(
        "modalState/setAddNewTodoModal",
        !isAddTodoFormVisible.value
      );
    };

    const filteredTodos = computed(() => {
      const todos = store.state.todoData.todos;
      let filtered = todos;

      if (currentFilter.value === "done") {
        filtered = todos.filter((todo: TodoItemType) => todo.isDone);
      } else if (currentFilter.value === "inProgress") {
        filtered = todos.filter((todo: TodoItemType) => !todo.isDone);
      } else if (currentFilter.value === "noDeadline") {
        filtered = todos.filter((todo: TodoItemType) => todo.dueDate === null);
      }

      if (searchQuery.value) {
        filtered = filtered.filter(
          (todo: TodoItemType) =>
            todo.title.includes(searchQuery.value) ||
            todo.content.includes(searchQuery.value)
        );
      }

      return filtered;
    });

    return {
      isAddTodoFormVisible,
      isEditTodoModalVisible,
      searchQuery,
      toggleAddTodoForm,
      setFilter,
      filteredTodos,
    };
  },
});
</script>
