<template>
  <div class="todo-item-wrapper">
    {{ todo }}
		<h3>{{ todo.title }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TodoItemType } from "@/components/interface/interface";

export default defineComponent({
  name: "TodoItem",
  props: {
    todo: {
      type: Object as PropType<TodoItemType>,
			required: true
    },
  },
  setup() {
		const test = "";

		return {
			test,
		}
	},
});
</script>
