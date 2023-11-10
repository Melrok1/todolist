<template>
    <input 
      type="text" 
      :value="value" 
      @input="onInput" 
      :placeholder="placeholder"
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      // Vlastnosť 'modelValue' umožňuje dvojsmernú väzbu
      modelValue: {
        type: String as PropType<string>,
        default: ''
      },
      // Voliteľná vlastnosť pre placeholder text
      placeholder: {
        type: String as PropType<string>,
        default: ''
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      // Emituje udalosť pri zmene hodnoty v textovom poli
      const onInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        emit('update:modelValue', target.value);
      };
  
      return {
        onInput,
        value: props.modelValue,
        // placeholder: props.placeholder
      };
    }
  });
  </script>