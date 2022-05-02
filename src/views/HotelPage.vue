<script setup>
import Pagination from "@/components/Pagination.vue";
import TravelCard from "@/components/TravelCard.vue";

import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const keywordInput = ref("");

const hotelData = computed(() => store.state.data);
const totalLength = computed(() => store.state.totalLength);

const totalPage = computed(() => store.state.totalPage);
const currentPage = computed(() => store.state.currentPage);

const getData = (options = null) => {
  hotelData.value.splice(0);
  store.dispatch("getResultWithPage", {
    type: "Hotel",
    city: "",
    perData: 12,
    filter: keywordInput.value ? options : null,
  });
};

const onPageChanged = (pageIndex) => {
  store.commit("UPDATE_CURRENT_PAGE", pageIndex);
  getData();
};

onMounted(() => {
  store.commit("UPDATE_CURRENT_PAGE", 1);
  getData();
});
</script>

<template>
  <div>
    <section
      v-aos
      class="flex min-h-[60vh] w-full items-center bg-hotel-banner bg-cover bg-center bg-no-repeat pt-32 pb-4 md:justify-start"
    >
      <div class="container mx-auto px-10 text-white">
        <h3
          v-aos
          class="banner-title"
          v-text="'在任何角落都能找到舒適住宿'"
        ></h3>
        <p
          v-aos="{ delay: 100 }"
          class="mt-2 text-lg"
          v-text="'還不知道想去哪裡嗎?別擔心。'"
        ></p>
        <form
          v-aos="{ delay: 300 }"
          class="relative mt-4 flex flex-col divide-y-2 rounded-lg border-4 border-[#e7e7e7] bg-white text-black md:w-[750px] md:flex-row md:divide-y-0 md:divide-x-2 md:rounded-full"
          @submit.prevent="getData({ keyword: keywordInput })"
        >
          <div class="relative w-full md:w-1/3">
            <input
              v-model="keywordInput"
              class="w-full p-3.5 px-8 outline-none md:rounded-tl-full md:rounded-bl-full"
              placeholder="搜尋目的地和住宿"
              type="text"
            />
            <i class="fas fa-hotel absolute left-2 top-4 text-[#1EB893]"></i>
          </div>
          <div class="relative w-full bg-gray-200 py-3.5 px-8 md:w-1/3">
            <input
              disabled
              class="disabled: w-full outline-none"
              placeholder="2022/1/8 - 2022/1/10"
              type="text"
            />
            <img
              class="absolute top-4 left-2"
              src="../assets/img/date-icon.png"
              alt="date-icon"
            />
          </div>
          <div
            class="relative w-full bg-gray-200 py-3.5 px-8 md:w-1/3 md:rounded-tr-full md:rounded-br-full"
          >
            <input
              disabled
              class="outline-none"
              placeholder="2 x 成人, 1 x 客房"
              type="text"
            />
            <img
              class="absolute top-4 left-2"
              src="../assets/img/people-icon.png"
              alt="people-icon"
            />
          </div>
          <button
            type="submit"
            class="btn btn-gradient right-0 mx-4 mb-2 py-3.5 md:absolute md:mx-0"
          >
            <i class="fas fa-search mr-1.5"></i>搜尋
          </button>
        </form>
      </div>
    </section>
    <section class="container mx-auto my-10 px-10">
      <div v-aos="{ delay: 100 }" class="flex items-center">
        <h3 class="mr-4 text-2xl font-bold" v-text="'熱門住宿'"></h3>
        <span class="font-bold">
          共有
          <strong
            class="mx-2 text-lg text-primary"
            v-text="totalLength"
          ></strong>
          家住宿
        </span>
      </div>
      <div v-if="totalLength" class="mt-10 grid grid-cols-12 gap-4">
        <TravelCard
          v-for="(hotel, index) in hotelData"
          :key="hotel.hotelID"
          v-aos="{ delay: (index + 1) * 50, type: 'zoom-in' }"
          :data="hotel"
          api-type="Hotel"
          class="group col-span-12 cursor-pointer rounded-lg bg-white shadow-custom duration-200 ease-out hover:shadow-custom-hover md:col-span-6 lg:col-span-3"
        />
      </div>
      <div v-else class="flex justify-center">
        <img src="../assets/img/no-data-img.jpg" alt="查無資料" />
      </div>
    </section>
    <div v-if="totalLength > 20" class="flex justify-center pb-10">
      <Pagination
        :total-pages="totalPage"
        :current-page="currentPage"
        @page-changed="onPageChanged"
      />
    </div>
  </div>
</template>

<style></style>
