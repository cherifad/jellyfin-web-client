<template>
  <div class="bg-[#111111] text-white min-h-screen flex flex-col">
    <Header />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>
