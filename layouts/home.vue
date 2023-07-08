<template>
  <div class="bg-[#111111] text-white min-h-screen">
    <Header />
    <div ref="main" class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const main = ref(null);

onMounted(() => {
  main.value.style.marginTop = `-${main.value.previousElementSibling.offsetHeight}px`;
});
</script>
