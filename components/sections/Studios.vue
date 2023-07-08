<template>
  <div class="flex flex-wrap">
    <StudioSingleStudioCard 
        v-for="item in studio" 
        :key="item.Id" 
        :studio-id="item.Id" 
        :studio-img-tag="item.ImageTags.Thumb"
    ></StudioSingleStudioCard>
  </div>
</template>

<script setup>
import { getStudio } from "@/api/common";

const studio = ref([]);

onMounted(async () => {
  const res = await getStudio("db4c1708cbb5dd1676284a40f2950aba", 12);
  studio.value = res.data.Items;
  console.log(studio.value);
});
</script>
