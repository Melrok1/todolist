<template>
  <div class="add-new-todo-wrapper">
    <text-input v-model="title" placeholder="Add title"/>
    <text-input v-model="content" placeholder="Add todo content"/>
    <date-picker v-model="expirationDate" />
    <alert-message v-if="titleError" :message="titleError" type="warning" />
    <alert-message v-if="contentError" :message="contentError" type="warning" />
    <div class="add-new-todo-buttons">
      <button @click="saveTodo">Save</button>
      <button @click="closeAddTodoForm">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { validateTitle, validateContent } from "@/ts/validation";
import DatePicker from "./InputComponents/DatePicker.vue";
import TextInput from "@/components/InputComponents/TextInput.vue";
import AlertMessage from "@/components/Messages/AlertMessage.vue";

export default defineComponent({
  name: "AddNewTodoForm",
  components: {
    DatePicker,
    TextInput,
    AlertMessage
  },
  setup() {
    const store = useStore();
    const title = ref<string>('');
    const content = ref<string>('');
    const expirationDate = ref<Date | null>(null);
    const titleError = ref<string>('');
    const contentError = ref<string>('');

    watch(title, (newTitle) => {
      titleError.value = validateTitle(newTitle, 20);
    });

    watch(content, (newContent) => {
      contentError.value = validateContent(newContent);
    });

    const closeAddTodoForm = () => {
      store.dispatch("modalState/setAddNewTodoModal", false);
    };

    const saveTodo = () => {

      titleError.value = validateTitle(title.value, 20);
      contentError.value = validateContent(content.value);

      if (titleError.value || contentError.value) {
        return;
      }

      const newTodo = {
        title: title.value,
        content: content.value,
        dueDate: expirationDate.value,
      };

      store.dispatch("todoData/addTodo", newTodo);
      closeAddTodoForm();
    };

    return {
      saveTodo,
      closeAddTodoForm,
      title,
      content,
      expirationDate,
      titleError,
      contentError
    };
  },
});
</script>

<style lang="scss" scoped>
.add-new-todo-wrapper {
	position: absolute;
	top: 15%;
	left: 50%;
	transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  margin: 1rem auto 3rem;
  padding: 1rem;
  border: 1px solid rgb(179, 179, 179);
  background: rgb(235, 235, 235);
  border-radius: $border-radius;
  box-shadow: $shadow-1;

  @include response-above(sm) {
    max-width: 40rem;
  }
}
</style>
