<template>
  <div class="todo-list-wrapper">
		<div v-for="(todo, index) in filteredTodos" :key="index">
      <todo-item-vue :todo="todo"/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import TodoItemVue from "@/components/TodoComponents/TodoItem.vue";

export default defineComponent({
	name: 'TodoList',
  components: {
    TodoItemVue
  },
  props: {
    filteredTodos: {
      type: Object,
      required: true,
    }
  },
  setup() {
    const store = useStore();

    const getTodoFromStore = computed(() => store.getters["todoData/allTodos"]);
		
    return {
      getTodoFromStore,
    };
  },
});
</script>
