<template>
  <div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog
        as="div"
        @close="userCanClose ? closeModal() : warnUser()"
        class="relative z-10"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full relative max-w-[70vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                :class="preventClose ? 'border-red-500 border-4 -translate-y-2' : ''"
              >
                <XMarkIcon
                  v-if="userCanClose"
                  class="absolute top-4 right-4 h-6 w-6 cursor-pointer"
                  @click="closeModal"
                />
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 mb-3"
                >
                  {{ modalTitle }}
                </DialogTitle>
                <slot />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { popUpSize } from "@/utils/constants";

const props = defineProps({
  modalTitle: {
    type: String,
    default: "Payment successful",
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  userCanClose: {
    type: Boolean,
    default: true,
  }
});

const emits = defineEmits(["close"]);

const isOpen = ref(props.showModal);
const preventClose = ref(false);

function closeModal() {
  isOpen.value = false;
}

function warnUser() {
  preventClose.value = true;
  setTimeout(() => {
    preventClose.value = false;
  }, 1000);
}

watch(
  () => props.showModal,
  (value) => {
    isOpen.value = value;
  }
);

watch(
  () => isOpen.value,
  (value) => {
    if (!value) {
      emits("close", false);
    }
  }
);
</script>
