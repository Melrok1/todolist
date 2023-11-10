<template>
  <div class="home">
    <button @click="toggleAddTodoForm">Add new list</button>
    <add-new-todo-vue v-if="isAddTodoFormVisible"/>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import AddNewTodoVue from "@/components/AddNewTodo.vue";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    AddNewTodoVue,
  },
  setup() {
    const store = useStore();

    const isAddTodoFormVisible = computed(
      () => store.getters['modalState/isAddNewTodoModalVisible']
    );

    const toggleAddTodoForm = () => {
      store.dispatch('modalState/setAddNewTodoModal', !isAddTodoFormVisible.value);
    };

    return {
      isAddTodoFormVisible,
      toggleAddTodoForm
    };
  },
});
</script>

<style lang="scss" scoped>


</style>