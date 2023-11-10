<template>
  <div class="home">
    <button @click="toggleAddListForm">Add new list</button>
    <add-new-todo-vue v-if="isAddListFormVisible"/>
  </div>
</template>

<script lang="ts">
import AddNewTodoVue from "@/components/AddNewTodo.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    AddNewTodoVue,
  },
  setup() {
    const isAddListFormVisible = ref(false);

    const toggleAddListForm = () => {
      isAddListFormVisible.value = !isAddListFormVisible.value;
    };

    return {
      isAddListFormVisible,
      toggleAddListForm
    };
  },
});
</script>

