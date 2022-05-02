<script setup>
import { ref } from "vue";

const isShow = ref(false);

const goTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

window.addEventListener("scroll", () => {
  const { scrollTop } = document.documentElement;

  isShow.value = scrollTop > 300 ? true : false;
});
</script>

<template>
  <button
    :class="[isShow ? '-translate-x-10' : 'translate-x-20']"
    class="fixed bottom-10 right-4 z-10 h-14 w-14 rounded-full bg-gradient-to-b from-primary to-secondary text-white duration-200 ease-in-out
    group shadow-custom"
    @click="goTop"
  >
    <i class="group-hover:animate-bounce fas fa-angle-up text-2xl"></i>
  </button>
</template>

<style></style>
