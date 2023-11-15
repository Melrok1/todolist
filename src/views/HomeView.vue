<template>
  <div class="home">
    <div class="control-panel">
      <button @click="toggleAddTodoForm">Add new list</button>
      <div class="searchbar">
        <input type="text" v-model="searchQuery" />
      </div>
      <div class="filter-buttons">
        <button
          :class="['filter-button', { active: currentFilter === 'all' }]"
          @click="setFilter('all')"
        >
          All
        </button>
        <button
          :class="['filter-button', { active: currentFilter === 'done' }]"
          @click="setFilter('done')"
        >
          Done
        </button>
        <button
          :class="['filter-button', { active: currentFilter === 'inProgress' }]"
          @click="setFilter('inProgress')"
        >
          In progress
        </button>
        <button
        :class="['filter-button', { active: currentFilter === 'noDeadline' }]"
          @click="setFilter('noDeadline')"
        >
          No deadline
        </button>
      </div>
    </div>
    <add-new-todo-vue v-if="isAddTodoFormVisible" />
    <edit-todo-form v-if="isEditTodoModalVisible" />
    <todo-list-vue :filteredTodos="filteredTodos" />
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
      currentFilter,
    };
  },
});
</script>


<style lang="scss" scoped>

.searchbar,
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  max-width: $search-buttons-max-width;
  margin: 1rem auto;
  border: $border;
  border-radius: $border-radius;
  padding: 1rem 1rem 0.5rem 1rem; 
}

.filter-buttons {
  @include flexbox(row, start, center);
  
  button {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    
    &:last-of-type {
      margin-right: 0;
    }
  }
}

.searchbar {
  @include flexbox;
}

.filter-buttons::after,
.searchbar::after {
  position: absolute;
  top: 0;
  left: 3rem;
  transform: translate(0, -50%);
  background: #fff;
  padding: 0.25rem;
  color: $color-text;
}

.filter-buttons::after {
  content: "Filters";
}

.searchbar::after {
  content: "Searchbar";
}
</style>
