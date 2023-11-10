<template>
  <div class="add-new-todo-wrapper">
    <text-input placeholder="test" />
    <text-input placeholder="test2" />
    <date-picker />
    <div class="add-new-todo-buttons">
      <button @click="saveTodo">Save</button>
      <button @click="closeAddTodoForm">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import DatePicker from "../components/InputComponents/DatePicker.vue";
import TextInput from "@/components/InputComponents/TextInput.vue";

export default defineComponent({
  name: "AddNewTodoForm",
  components: {
    DatePicker,
    TextInput,
  },
	setup() {
		const store = useStore();
		const title = ref('');
		const content = ref('');
		const expirationDate = ref<Date | null>(null);

		const closeAddTodoForm = () => {
			store.dispatch('modalState/setAddNewTodoModal', false);
		}

		const saveTodo = () => {
			const newTodo = {
				title: title.value,
				content: content.value,
				expirationDate: expirationDate.value
			};

			store.dispatch('todoData/addTodo', newTodo);
			closeAddTodoForm();
		}

		return {
			closeAddTodoForm,
			saveTodo,
			title,
			content,
			expirationDate,
		}
	}
});
</script>

























<style lang="scss" scoped>
.add-new-todo-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  margin: 1rem auto 3rem;
  padding: 1rem;
  border: 1px solid rgb(179, 179, 179);
  border-radius: $border-radius;
  box-shadow: $shadow-1;

	@include response-above(sm) {
		max-width: 40rem;
	}
}
</style>