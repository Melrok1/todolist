<template>
  <div
    class="icon-wrapper"
    v-bind="$attrs"
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
.icon-wrapper {
  transition: all 0.5s;

  [class^="icon-"] {
    cursor: pointer;
    fill: $color-text;

    &:hover {
      fill: $color-error;
    }
  }

  .icon-sm {
    width: 1rem;
    height: 1rem;
  }

  .icon-md {
    width: 1.2rem;
    height: 1.2rem;
  }

  .icon-lg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
