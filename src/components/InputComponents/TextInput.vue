<template>
  <input type="text" v-model="internalValue" :placeholder="placeholder" />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

export default defineComponent({
  name: "Text-input",
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    placeholder: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const internalValue = computed({
      get: () => props.modelValue,
      set: (value: string) => emit("update:modelValue", value),
    });

    return {
      internalValue,
    };
  },
});
</script>
