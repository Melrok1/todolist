<template>
  <div class="edit-todo-form-wrapper">
    <text-input v-model="title" placeholder="Add title"/>
    <text-input v-model="content" placeholder="Add todo content"/>
    <date-picker v-model="dueDate" />
		<p>{{  isDone }}</p>
		
		<alert-message v-if="titleError" :message="titleError" type="warning" />
		<alert-message v-if="contentError" :message="contentError" type="warning" />
		
		<button @click="updateTodo">Save</button>
		<button @click="closeEditForm">close</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { validateTitle, validateContent } from "@/ts/validation";
import DatePicker from "./InputComponents/DatePicker.vue";
import TextInput from "@/components/InputComponents/TextInput.vue";
import AlertMessage from "@/components/Messages/AlertMessage.vue";

export default defineComponent({
	name: "Edit-todo-form",
	components: {
		DatePicker,
    TextInput,
    AlertMessage
	},
  setup() {
    const store = useStore();
		const currentId = ref<number | null>(null);
		const title = ref<string>('');
    const content = ref<string>('');
    const dueDate = ref<Date | null>(null);
		const isDone = ref<boolean>(false);
		const titleError = ref<string>('');
    const contentError = ref<string>('');

    watch(title, (newTitle) => {
      titleError.value = validateTitle(newTitle, 20);
    });

    watch(content, (newContent) => {
      contentError.value = validateContent(newContent);
    });

		const closeEditForm = () => {
			store.dispatch("modalState/setEditTodoModal", false);
			store.dispatch("modalState/setCurrentTodoId", null);
		}

		const updateTodo = () => {
			const updatedTodo = {
				title: title.value,
				content: content.value,
				dueDate: dueDate.value,
				isDone: isDone.value
			}
			store.dispatch("todoData/updateTodo", {updatedTodo, todoId: currentId.value});
			closeEditForm();
		}

    const loadTodo = () => {
      const todo = store.getters["todoData/getTodoById"](currentId.value);
      if (todo) {
        title.value = todo.title;
        content.value = todo.content;
        dueDate.value = todo.dueDate;
				isDone.value = todo.isDone;
      }
    };
		
		onMounted(() => {
			currentId.value = store.state.modalState.currentTodoId;
			loadTodo();
		})
		
		return {
			closeEditForm,
			updateTodo,
			loadTodo,
			currentId,
			title,
			content,
			dueDate,
			isDone,
			titleError,
			contentError,
		}
  },
});
</script>

<style lang="scss" scoped>

.edit-todo-form-wrapper {
	position: absolute;
	top: 15%;
	left: 50%;
	transform: translate(-50%,-50%);
  max-width: 90%;
  margin: 1rem auto 3rem;
  padding: 1rem;
  border: 1px solid #b3b3b3;
  background: #ebebeb;
  border-radius: $border-radius;
  box-shadow: $shadow-1;
  
  @include flexbox(column);
  @include response-above(sm) {
    max-width: 40rem;
  }
}

</style>
