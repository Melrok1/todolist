<template>
  <div class="add-new-todo-wrapper">
    <input type="text" name="todoTitle" />
    <input type="text" name="todoContent" />
    <date-picker />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DatePicker from '../components/InputComponents/DatePicker.vue'

export default defineComponent({
  name: 'AddNewTodoForm',
  components: {
    DatePicker
  },
});
</script>