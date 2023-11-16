<template>
  <div class="edit-todo-form-wrapper">
		<h4>Edit todo</h4>
    <text-input v-model="title" placeholder="Add title"/>
		<text-area-input v-model="content" placeholder="Add todo content"/>
    <date-picker v-model="dueDate" />
		<div class="todo-is-done">
			<span>
				Todo id done: 
			</span>
			<icon 
				v-if="!isDone" 
				@click="isDone = true"
				name="square" 
				size="md" 
				color="red" 
				hoverColor="red"
			/>
			<icon 
				v-else 
				@click="isDone = false"
				name="square-check" 
				size="md" 
				color="green" 
				hoverColor="green"
			/>
		</div>
		
		<alert-message v-if="titleError" :message="titleError" type="warning" />
		<alert-message v-if="contentError" :message="contentError" type="warning" />
		
		<div class="buttons-wrapper">
			<button @click="updateTodo">Save</button>
			<button @click="closeEditForm">close</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { validateTitle, validateContent } from "@/ts/validation";
import DatePicker from "./InputComponents/DatePicker.vue";
import TextInput from "@/components/InputComponents/TextInput.vue";
import TextAreaInput from "./InputComponents/TextAreaInput.vue";
import AlertMessage from "@/components/Messages/AlertMessage.vue";
import Icon from "./Icons/Icon.vue";

export default defineComponent({
	name: "Edit-todo-form",
	components: {
		DatePicker,
    TextInput,
    AlertMessage,
		TextAreaInput,
		Icon
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
				dueDate: dueDate.value ?? null,
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
        dueDate.value = todo.dueDate ?? null;
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
	transform: translateX(-50%);
  max-width: 90%;
  width: 90%;
  margin: 1rem auto 3rem;
  padding: 1rem;
  border: 1px solid #b3b3b3;
  background: #ebebeb;
  border-radius: $border-radius;
  box-shadow: $shadow-1;
  @include flexbox(column);
  @include response-above(sm) {
    max-width: 25rem;
  }

	h4 {
		margin-bottom: 1rem;
	}

	.buttons-wrapper {
		@include flexbox;
		button:first-of-type {
			margin-right: 1rem;
		}
	}

	.todo-is-done {
		margin: 1rem auto;
		@include flexbox;

		span {
			margin-right: 0.25rem;
		}
	}
}

</style>
