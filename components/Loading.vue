<template>
  <div class="h-screen flex flex-1 justify-center items-center">
    <div
      class="flex gap-3 text-black bg-white px-4 py-2 font-semibold w-fit rounded-md items-center"
    >
      <ArrowPathIcon class="h-8 animate-spin w-8" />
      {{ $t("fetching_data") }}
    </div>
  </div>
</template>

<script setup lanf="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/solid"; 
</script>
