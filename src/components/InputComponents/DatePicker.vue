<template>
  <VueDatePicker v-model="date"></VueDatePicker>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
  components: { VueDatePicker },
  setup() {
    const date = ref<Date | null>(null);

    return {
      date,
    };
  },
});
</script>