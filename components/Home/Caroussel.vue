<template>
        <SliderParent
        sliderId="testHomeSlider"
        :itemsCount="itemsCount"
        :autoPlay="true"
        :key="itemsCount"
        :autoPlaySpeed="5000"
        >
        <SliderChild v-if="latest.length > 0" v-for="item in latest" :key="item.Id">
            <MediaHomeSliderCard
            :key="item.Id"
            :backImage="item.BackdropImageTags[0]"
            :title="item.Name"
            :resume="item.Overview"
            tip="New"
            Type="Movie"
            :itemId="item.Id"
            /></SliderChild>
        </SliderParent>
</template>

<script setup>
import { getLatest, ItemType } from "@/api/common";
import MediaHomeSliderCard from "@/components/media/HomeSliderCard.vue";
import SliderParent from "@/components/common/SliderParent.vue";
import SliderChild from "@/components/common/SliderChild.vue";

const latest = ref([]);
const itemsCount = ref(0);

const props = defineProps({
  maxItems: {
    type: Number,
    required: false,
    default: 5,
  },
});

onMounted(async () => {
  const res = await getLatest(
    "db4c1708cbb5dd1676284a40f2950aba",
    ItemType.Mixed,
    props.maxItems
  );
  latest.value = res.data;
  itemsCount.value = res.data.length;
});
</script>
