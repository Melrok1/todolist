<template>
  <div
    class="icon-wrapper"
    v-bind="$attrs"
  >
    <svg :class="`icon-lg icon-${name}`">
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
    }
  },
  setup(props) {
		//const iconsPath = '@/assets/svg/spritesheets.svg';

    const iconUrl = computed(() => {
      return `${iconPath}#icon-${props.name}`;
    });

    return {
      iconUrl
    };
  },
});
</script>

<style scoped>
.icon-wrapper {
  transition: all 0.5s;
}
</style>
