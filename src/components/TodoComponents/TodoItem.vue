<template>
  <div class="todo-item-wrapper">
    <header>
      <span :class="isRemainingTime ? 'success-message' : 'error-message'">{{ remainingTime }}</span>
      <h3>{{ todo.title }}</h3>
			<button>Delete</button>
      <!-- 
        <icon name="checkbox"/>
      -->
    </header>
    <article>
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
		//Icon
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
  padding: 1rem;
  border: $border;
  border-radius: $border-radius;

	header {
		flex-wrap: wrap;
		@include flexbox(row, space-between);

		h3 {
			text-align: left;
			margin-bottom: 0.5rem;
		}
	}

}
</style>
