<template>
  <textarea 
    ref="textareaRef"
    v-model="internalValue" 
    class="text-area-wrapper"
    :placeholder="placeholder"
    @input="adjustHeight"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "Text-area-input",
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    placeholder: {
      type: String as PropType<string>,
      default: "",
    }
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const internalValue = computed({
      get: () => props.modelValue,
      set: (value: string) => emit("update:modelValue", value),
    });

    const textareaRef = ref<HTMLTextAreaElement | null>(null);

    const adjustHeight = () => {
      nextTick(() => {
        if (textareaRef.value) {
          textareaRef.value.style.height = 'auto';
          textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
        }
      });
    };

    watch(internalValue, adjustHeight);

    onMounted(adjustHeight);

    return {
      internalValue,
      adjustHeight,
      textareaRef
    };
  },
});
</script>
