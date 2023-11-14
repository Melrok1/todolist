<template>
  <div class="edit-todo-form-wrapper">
		test
		<p>
			Aktualne id: 
			{{ currentId }}
		</p>
		<p>
			{{ getTodoById }}
		</p>
		<button @click="closeEditForm">close</button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
	name: 'Edit-todo-form',
  setup() {
    const store = useStore();
		const currentId = ref<number | null>(null);

		const closeEditForm = () => {
			store.dispatch("modalState/setEditTodoModal", false);
			store.dispatch("modalState/setCurrentTodoId", null);
		}

    const getTodoById = computed(() => {
      return store.getters['todoData/getTodoById'](currentId.value);
    })
		
		onMounted(() => {
			currentId.value = store.state.modalState.currentTodoId;
		})
		
		return {
			closeEditForm,
			currentId,
			getTodoById
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
