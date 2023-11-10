<template>
  <div class="home">
    <add-new-todo-vue />
  </div>
</template>

<script lang="ts">
import AddNewTodoVue from '@/components/AddNewTodo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AddNewTodoVue
  },
});
</script>

