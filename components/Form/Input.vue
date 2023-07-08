<template>
  <input
    :placeholder="placeholder"
    :type="type"
    v-model="value"
    class="mb-4 w-full px-7 py-3 border-black border-2 outline-none bg-transparent rounded-xl"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "Placeholder",
  },
  defaultValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const emits = defineEmits(["input"]);

const value = ref(props.defaultValue);

watch(
  () => value.value,
  (newValue) => {
    emits("input", newValue);
  }
);
</script>
