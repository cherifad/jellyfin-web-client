<template>
    <div class="overflow-hidden">
        <ImageBlock v-if="isLoaded" :src="src" :alt="alt" class="w-full h-full" />
        <div class="animate-pulse w-full h-full bg-gray-300" v-else></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
    default: "",
  },
});

const isLoaded = ref(false);

onMounted(() => {
  const img = new Image();
  console.log("loading");
  img.src = props.src;
  img.onload = () => {
    console.log("loaded");
    isLoaded.value = true;
  };
});
</script>
