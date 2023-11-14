<template>
  <div
    class="div-icon-wrapper"
    v-bind="$attrs"
    :style="{
      '--icon-color': color,
      '--icon-hover-color': hoverColor,
      '--icon-active-color': activeColor
    }"
  >
    <svg :class="`icon-${size} icon-${name}`">
      <use :href="iconUrl" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import iconPath from '@/assets/svg/spritesheet.svg';

export default defineComponent({
  name: "Icon-vue",
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    size: {
      type: String as PropType<'sm'|'md'|'lg'>,
      default: 'md'
    },
    color: {
      type: String as PropType<string|undefined>,
      default: '#333333'
    },
    hoverColor: {
      type: String as PropType<string|undefined>,
      default: '#000000'
    },
    activeColor: {
      type: String as PropType<string|undefined>,
      default: '#1d6c10'
    }
  },
  setup(props) {
    const iconUrl = computed(() => {
      return `${iconPath}#icon-${props.name}`;
    });

    return {
      iconUrl
    };
  },
});
</script>

<style scoped lang="scss">
.div-icon-wrapper {
  transition: all 0.5s;
  
  [class^="icon-"] {
    cursor: pointer;
    fill: var(--icon-color);

    &:hover {
      fill: var(--icon-hover-color);
    }

    &:active {
      fill: var(--icon-active-color);
    }
  }
}
</style>
