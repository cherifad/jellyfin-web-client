<template>
  <div
    class="w-full h-fit"
    :style="{ marginBottom: `-${marginBottom}px` }"
    :id="sliderId"
    ref="slider"
  >
    <slot ref="slider-content"> </slot>
    <div
      ref="pagination"
      class="flex -z-10 flex-col items-end px-12 -translate-y-full pb-7 text-white"
    >
      <div class="flex gap-3">
        <button @click="prevSlide">Previous</button>
        <button @click="nextSlide">Next</button>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex gap-3">
          <button
            v-for="(slide, index) in totalSlides"
            :key="index"
            @click="currentSlide = index"
            class="px-4 py-2"
            :class="
              currentSlide === index
                ? 'bg-red-500 rounded-full text-white'
                : 'bg-gray-500 rounded-full text-white'
            "
          >
            {{ index + 1 }}
          </button>
        </div>
        <div class="flex gap-3 mt-3">
          <div v-for="(slide, index) in totalSlides">
            <TransitionRoot
              :show="currentSlide === index"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
            >
              <div
                :key="index"
                @click="currentSlide = index"
                class="h-1 rounded-full w-16 bg-white"
              ></div>
            </TransitionRoot>
            <div
              v-if="currentSlide !== index"
              :key="index"
              @click="currentSlide = index"
              class="h-1 rounded-full w-16 bg-gray-600"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { TransitionRoot } from "@headlessui/vue";

const props = defineProps({
  sliderId: {
    type: String,
    required: true,
  },
  itemsCount: {
    type: Number,
    required: false,
  },
  autoPlay: {
    type: Boolean,
    required: false,
    default: false,
  },
  autoPlaySpeed: {
    type: Number,
    required: false,
    default: 3000,
  },
});

const currentSlide = ref(0);
const totalSlides = ref(0);
const slides = ref([]);
const timer = ref(null);
const pagination = ref(null);
const slider = ref(null);
const marginBottom = ref(0);

onMounted(() => {
  slides.value = slider.value.querySelectorAll(`.slider-child`);
  totalSlides.value = slides.value.length;
  changeSlide();
  setTimer();
  slider.value.addEventListener("mouseenter", () => {
    clearInterval(timer.value);
  });
  slider.value.addEventListener("mouseleave", () => {
    setTimer();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    }
    if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });
  marginBottom.value =
    pagination.value.clientHeight;
});

function setTimer() {
  if (!props.autoPlay) {
    return;
  }
  if (timer.value) {
    clearInterval(timer.value);
  }
  timer.value = setInterval(() => {
    nextSlide();
  }, props.autoPlaySpeed);
}

function nextSlide() {
  currentSlide.value >= totalSlides.value - 1
    ? (currentSlide.value = 0)
    : currentSlide.value++;
  setTimer();
}

function prevSlide() {
  currentSlide.value <= 0
    ? (currentSlide.value = totalSlides.value - 1)
    : currentSlide.value--;
  setTimer();
}

watch(currentSlide, (newVal, oldVal) => {
  changeSlide();
});

watch(props.itemsCount, (newVal, oldVal) => {
  console.log("itemsCount changed from", oldVal, "to", newVal);
  slides.value = slider.value.querySelectorAll(`.slider-child`);
  totalSlides.value = slides.value.length;
  changeSlide();
});

function changeSlide() {
  slides.value.forEach((slide, index) => {
    if (index === currentSlide.value) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}
</script>
