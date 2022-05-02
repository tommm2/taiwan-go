<script setup>
import { computed, defineProps, defineEmits, toRefs } from "vue";
const props = defineProps({
  maxVisibleButton: {
    type: Number,
    required: false,
    default: 3,
  },

  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["pageChanged"]);

const { maxVisibleButton, totalPages, currentPage } = toRefs(props);

const isInFirstPage = computed(() => currentPage.value === 1);
const isInLastPage = computed(() => currentPage.value === totalPages.value);

const startPage = computed(() => {
  if (currentPage.value === 1) {
    return 1;
  }

  if (currentPage.value === totalPages.value) {
    if (totalPages.value === 2) {
      return 1;
    }
    return totalPages.value - maxVisibleButton.value + 1;
  }

  return currentPage.value - 1;
});

const endPage = computed(() => {
  return Math.min(
    startPage.value + maxVisibleButton.value - 1,
    totalPages.value
  );
});


const pages = computed(() => {
  const range = [];

  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value,
    });
  }

  return range;
});
</script>

<template>
  <div class="flex space-x-3">
    <button
      :class="{ 'pointer-events-none text-[#d0d0d0]': isInFirstPage }"
      class="text-lg"
      @click="$emit('pageChanged', currentPage - 1)"
    >
      <i class="fas fa-angle-left"></i>
    </button>
    <ul class="flex space-x-3">
      <li
        v-for="page in pages"
        :key="page.name"
        :class="{
          'pointer-events-none border-transparent bg-black': page.isDisabled,
        }"
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#d0d0d0] text-[#d0d0d0] duration-200 hover:border-transparent hover:bg-black"
        @click="emit('pageChanged', page.name)"
      >
        {{ page.name }}
      </li>
    </ul>
    <button
      :class="{ 'pointer-events-none text-[#d0d0d0]': isInLastPage }"
      class="text-lg"
      @click="$emit('pageChanged', currentPage + 1)"
    >
      <i class="fas fa-angle-right"></i>
    </button>
  </div>
</template>

<style></style>
