<template>
  <textarea 
    ref="textareaRef"
    v-model="internalValue" 
    :placeholder="placeholder"
    @input="adjustHeight"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch } from "vue";

export default defineComponent({
	name:"Text-area-input",
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
      if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
      }
    };

    // Ako reakcia na zmenu hodnoty, prispôsobíme výšku
    watch(internalValue, () => {
      adjustHeight();
    });

    return {
      internalValue,
      adjustHeight,
      textareaRef
    };
  },
});
</script>
