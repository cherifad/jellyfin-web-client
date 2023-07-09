<template>
  <PopUp :showModal="showModal" :modalTitle="title" @close="showModal = false">
    <div>
      <p>{{ message }}</p>
      <div class="flex justify-end gap-2">
        <button
          v-if="buttonStyle === 'yesNoButton'"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="showModal = false"
        >
          {{ noText }}
        </button>
        <button
          v-if="buttonStyle === 'yesNoButton'"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          @click="showModal = false"
        >
          {{ yesText }}
        </button>
        <button
          v-if="buttonStyle === 'OkButton'"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          @click="showModal = false"
        >
          {{ okText }}
        </button>
        <button
          v-if="buttonStyle === 'CancelButton'"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="showModal = false"
        >
          {{ cancelText }}
        </button>
      </div>
    </div>
  </PopUp>
</template>

<script setup lang="ts">
const buttonStyle = ["yesNoButton", "OkButton", "CancelButton"];
const showModal = ref(false);
const result = ref(false);

const props = defineProps({
  title: {
    type: String,
    default: "Are you sure?",
  },
  message: {
    type: String,
    default: "Are you sure you want to delete this item?",
  },
  buttonStyle: {
    type: String,
    default: "yesNoButton",
  },
  yesText: {
    type: String,
    default: "Yes",
  },
  noText: {
    type: String,
    default: "No",
  },
  okText: {
    type: String,
    default: "Ok",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
const answer = defineEmits(["answer"]);

watch(
  () => props.show,
  (value) => {
    showModal.value = value;
  }
);

</script>
