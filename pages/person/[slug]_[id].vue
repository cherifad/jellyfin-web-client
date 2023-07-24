<template>
  <div v-if="dataLoaded" class="flex">
    <div class="w-1/3 h-[70vh] px-7">
      <SinglePeople
        class="w-full h-full"
        :people="personDetails"
        peopleRole="Actor"
      />
    </div>
    <div class="w-2/3 px-7">
      <SectionsSectionContainer title="About" link="." :withButton="false">
        <p v-if="personDetails.resume" class="text-gray-400 font-semibold">
          {{ limitText(personDetails.resume, 800) }}
          <span
            v-if="textLimited"
            class="text-blue-500 cursor-pointer"
            @click="showFullText = true"
            >Show more</span
          >
          <PopUp
            @close="showFullText = false"
            :show-modal="showFullText"
            :modalTitle="'Overview - ' + personDetails.name"
          >
            {{ personDetails.resume }}
          </PopUp>
        </p>
        <div class="flex gap-5 mt-5">
          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">Birthdate</h1>
            <p class="text-lg">
              {{ toLocaleDateString(personDetails.birthDate) }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">Birthplace</h1>
            <p class="text-lg">{{ personDetails.birthPlace }}</p>
          </div>
          <div class="flex flex-col gap-1" v-if="personDetails.deathDate">
            <h1 class="text-2xl font-semibold">Deathdate</h1>
            <p class="text-lg">{{ personDetails.deathDate }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">Links</h1>
            <ul class="text-lg flex gap-1">
              <li v-for="(id, name) in personDetails.providerIds" :key="id">
                <a :href="'/' + id" class="text-lg">{{ name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </SectionsSectionContainer>
      <SectionsSectionContainer
        title="Related Media"
        link="."
        :withButton="false"
        class="mt-5"
      >
        <swiper
          :spaceBetween="30"
          :modules="[SwiperAutoplay]"
          :slidesPerView="3"
          :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
          ref="swiperRef"
        >
          <swiper-slide
            v-for="relatedMedia in relatedMedias"
            :key="relatedMedia.Id"
          >
            <SectionsSingleItem
              :key="relatedMedia.Id"
              :item-title="relatedMedia.Name"
              :item-img="relatedMedia.BackdropImageTags[0]"
              :item-id="relatedMedia.Id"
              :item-first-genre="relatedMedia.Genres[0]"
            />
          </swiper-slide>
        </swiper>
      </SectionsSectionContainer>
    </div>
  </div>
  <Loading v-else />
</template>

<script setup lang>
import { getPeopleDetails, getPeopleMedia } from "@/api/common";
import { toLocaleDateString } from "@/utils";

const { slug, id } = useRoute().params;

const personDetails = ref(null);
const relatedMedias = ref(null);
const dataLoaded = ref(false);
const textLimited = ref(false)
const showFullText = ref(false)
const textLimit = ref(0)

onMounted(async () => {
  const relatedMedia = await getPeopleMedia(id);
  console.log(relatedMedia.data.Items);
  relatedMedias.value = relatedMedia.data.Items;
  personDetails.value = await getPeopleDetails(id);
  if (personDetails.value) {
    dataLoaded.value = true;
  }
  useHead({
    title: personDetails.value.name,
  });
});

function limitText(text, limit) {
  textLimit.value = limit
  if (text.length > limit) {
    textLimited.value = true
    return text.substring(0, limit) + "...";
  } else {
    textLimited.value = false
    return text;
  }
}
</script>
