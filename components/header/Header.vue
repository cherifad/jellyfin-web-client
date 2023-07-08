<template>
    <div class="flex items-center justify-between p-3 text-white">
        <div class="flex items-center gap-6">
            <Bars3Icon class="h-8 w-8" />
            <ul class="flex items-center gap-6">
                <li>Movie</li>
                <li>TV Show</li>
                <li>{{ $t("welcome") }}</li>
            </ul>
        </div>
        <NuxtLink to="/" class="font-bold text-xl">Adlen Flix</NuxtLink>
        <div class="flex items-center gap-6">
            <MagnifyingGlassIcon class="h-8 w-8" />
            <BellIcon class="h-8 w-8" />
            <div class="flex items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-white">
    
                </div>
                <ChevronDownIcon class="h-8 w-8" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Bars3Icon, MagnifyingGlassIcon, BellIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

</script>