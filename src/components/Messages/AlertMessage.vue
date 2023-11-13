<template>
  <div :class="`alert-message-wrapper ${messageType}`">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: "AlertMessage",
  props: {
    type: {
      type: String as PropType<'success' | 'error' | 'info' | 'warning'>,
      default: 'info',
    },
    message: {
      type: String as PropType<string>,
      required: true,
    }
  },
	setup(props) {
		const messageType = computed(() => {
      switch (props.type) {
        case 'success': return 'success-message';
        case 'error': return 'error-message';
        case 'info': return 'info-message';
        case 'warning': return 'warning-message';
        default: return 'info-message';
      }
    });

		return {
      messageType
		}
	}
});
</script>
