<template>
  <div class="todo-item-wrapper">
    <div class="todo-control">
      <icon name="edit" />
      <span :class="isRemainingTime ? 'success-message' : 'error-message'">{{ remainingTime }}</span>
      <icon name="trash" />
      <!-- 
        <icon name="checkbox"/>
      -->
    </div>
    <article>
      <header>
        <icon name="checkbox" />
        <h3>{{ todo.title }}</h3>

      </header>
      <span>{{ todo.content }}</span>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, onUnmounted, toRefs } from "vue";
import { TodoItemType } from "@/components/interface/interface";
import Icon from "@/components/Icons/Icon.vue";

export default defineComponent({
  name: "TodoItem",
	components: {
		Icon
	},
  props: {
    todo: {
      type: Object as PropType<TodoItemType>,
      required: true,
    },
  },
  setup(props) {
		const { todo } = toRefs(props);
    const remainingTime = ref<string>('');
		let isRemainingTime = ref<boolean>(true);

    const calculateRemainingTime = () => {
			if(todo.value.dueDate === null) return;

      const now = new Date();
      const deadline = new Date(todo.value.dueDate);
      const timeDiff = deadline.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        remainingTime.value = `${days} day${days === 1 ? '' : 's'} 
        ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

				isRemainingTime.value = true;
      } else {
        remainingTime.value = 'passed';
				isRemainingTime.value = false;
        clearInterval(interval);
      }
    };

    let interval = setInterval(calculateRemainingTime, 1000);

    onMounted(() => {
      calculateRemainingTime();
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
			remainingTime,
			isRemainingTime
    };
  },
});
</script>


<style lang="scss" scoped>
.todo-item-wrapper {
	max-width: $todo-item-max-width;
  margin: 1rem auto;
  padding-bottom: 0.25rem;
  border: $border;
  border-radius: $border-radius;

	.todo-control {
		flex-wrap: wrap;
    margin-bottom: 0.15rem;
    padding: 0.2rem 1rem 0.2rem 1rem;
    background: $todo-item-header-color;
    border-radius: $border-radius $border-radius 0 0;
		@include flexbox(row, space-between);
	}
  
  article { 
    header {
      @include flexbox(row, start);
      padding: 0.5rem 1rem;

      h3 {
        text-align: left;
        margin: 0 0.5rem;
      }
    }   
  }
}
</style>
