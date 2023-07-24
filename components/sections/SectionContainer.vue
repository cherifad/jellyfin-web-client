<template>
    <div class="px-7">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-semibold">{{ title }}</h1>
            <NuxtLink v-if="withButton" :to="link" class="border-white flex gap-2 border-[.5px] rounded-full px-9 py-3 font-bold group">
                See more
                <ArrowSmallRightIcon class="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
        </div>
        <div class="h-auto pt-3">
          <slot />
        </div>
    </div>
</template>

<script setup>
import { ArrowSmallRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  title : {
    type: String,
    required: true,
  },
  link : {
    type: String,
    required: true,
  },
  withButton : {
    type: Boolean,
    default: true,
  }
});
</script>