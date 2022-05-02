<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";

const router = useRouter();

const links = [
  { text: "特色活動", url: "/activity" },
  { text: "美食饗宴", url: "/food" },
  { text: "精選住宿", url: "/hotel" },
];

const menuIsShow = computed(() => store.state.menuIsShow);

const toggleMenu = () => store.commit("UPDATE_MENU_STATE", !menuIsShow.value);

const SwitchPage = (url) => {
  router.push(url);
};
</script>
<template>
  <nav class="fixed top-0 z-50 w-full bg-white shadow-custom">
    <ul class="flex flex-col justify-between md:flex-row">
      <div class="flex w-full items-center justify-between py-7 px-9 md:w-auto">
        <router-link to="/">
          <img src="@/assets/img/logo-black.png" alt="logo-black" />
        </router-link>
        <button class="block md:hidden" @click="toggleMenu">
          <i
            :class="{ '-rotate-90': menuIsShow }"
            class="fas fa-bars text-2xl duration-200"
          ></i>
        </button>
      </div>
      <!-- 畫面大於 768px 時顯示，小於時不顯示 -->
      <div class="hidden items-center space-x-10 px-9 md:flex">
        <li
          v-for="(link, index) in links"
          :key="index"
          class="relative font-bold tracking-widest after:absolute after:-bottom-3 after:right-8 after:hidden after:rounded-full after:bg-secondary after:p-1 hover:after:block"
        >
          <router-link :to="link.url">{{ link.text }}</router-link>
        </li>
      </div>

      <!-- 畫面大於 768px 不顯示，小於時顯示 -->
      <div
        :class="[menuIsShow ? 'h-40' : 'h-0']"
        class="flex flex-col items-center justify-center overflow-hidden duration-300 ease-in-out md:hidden"
      >
        <li
          v-for="(link, index) in links"
          :key="index"
          class="w-full cursor-pointer py-4 text-center font-bold tracking-widest duration-200 hover:bg-[#707070] hover:text-white"
          @click.prevent="SwitchPage(link.url)"
        >
          <a href="#">{{ link.text }}</a>
        </li>
      </div>
    </ul>
  </nav>
</template>
<style>
.active {
  @apply after:block;
}
</style>
