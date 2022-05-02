<script setup>
import CountyList from "@/components/CountyList.vue";
import TravelCard from "@/components/TravelCard.vue";

// swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Grid, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

const router = useRouter();
const store = useStore();
const multiData = computed(() => store.state.multiData);

// 初始化資料
const getResult = () => {
  let options = [
    {
      type: "Activity",
      query: {
        top: 6,
        skip: 20,
      },
    },
    {
      type: "Restaurant",
      query: {
        top: 10,
        skip: 20,
      },
    },
    {
      type: "Hotel",
      query: {
        top: 4,
      },
    },
  ];

  options.forEach((option) => {
    const { type, query } = option;
    store.dispatch("getResult", {
      type,
      query,
    });
  });
};

// Swiper options
const modules = [Navigation, Grid, Pagination];
const swpierOptions = {
  breakpoints: {
    320: {
      slidesPerView: 1,
      grid: { rows: 2, fill: "row" },
    },
    600: {
      slidesPerView: 2,
      grid: { rows: 2, fill: "row" },
    },
    900: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
      grid: { rows: 1 },
    },
    1300: {
      slidesPerView: 5,
      grid: { rows: 1 },
    },
  },
  pagination: {
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

// 轉換頁面
const switchPage = (path) => router.push(path);

const changeArea = (options) => {
  const { query, option } = options;
  console.log(query, option);
  router.replace({
    path: "/city",
    query,
  });
  store.dispatch("changeArea", option);
};

onMounted(() => {
  store.commit("UPDATE_POSITION", "");
  store.commit("UPDATE_AREA", "");
  store.commit("UPDATE_TITLE", "");
  getResult();
});
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Home banner -->
    <section
      v-aos
      class="flex h-[60vh] flex-col items-center justify-center bg-home-banner bg-cover bg-center bg-no-repeat"
    >
      <!-- Title group -->
      <div class="mb-10 space-y-4 text-center text-white">
        <h3 v-aos class="banner-title">想去哪裡玩?</h3>
        <h4 v-aos="{ delay: 200 }" class="text-lg text-shadow-lg">
          這裡共有上千個活動及美食等著你去一同體驗
        </h4>
      </div>
    </section>

    <!-- Choose City section -->
    <section class="relative py-20">
      <CountyList @handle-change-area="changeArea">
        <template #home-page>
          <div v-aos class="z-10 whitespace-nowrap text-center">
            <h3 class="main-title mb-4" v-text="'縣市快選'"></h3>
            <h4 class="sub-title" v-text="'choose cities'"></h4>
          </div>
        </template>
      </CountyList>
      <!-- Rounded Rectangle -->
      <div
        v-aos="{ type: 'fade-right' }"
        class="absolute left-0 top-0 z-0 h-80 w-full rounded-br-[136px] bg-[#f7f7f7] lg:w-9/12"
      ></div>
      <!-- Traveler Image -->
      <img
        v-aos="{ type: 'zoom-in' }"
        class="absolute left-0 -bottom-48 z-10 hidden w-28 lg:block lg:w-auto"
        src="@/assets/img/traveler.png"
        alt="traveler"
      />
    </section>

    <!-- Activity section -->
    <section class="relative my-10 lg:py-40">
      <div class="container mx-auto flex flex-col items-center px-10">
        <div class="grid grid-cols-12 gap-4 sm:gap-10">
          <!-- Activity Card -->
          <div class="col-span-12 lg:col-span-9">
            <div v-aos="{ delay: 500 }" class="grid grid-cols-12 gap-6">
              <TravelCard
                v-for="(activity, index) in multiData.activitys"
                :key="index"
                v-aos="{ delay: (index + 1) * 80 }"
                :data="activity"
                :class="[index <= 2 ? '' : 'lg:translate-x-20']"
                class="col-span-12 sm:col-span-6 lg:col-span-4"
                api-type="Activity"
              />
            </div>
          </div>

          <!-- Title group -->
          <div
            class="order-first col-span-12 space-y-4 text-center lg:order-last lg:col-span-3 lg:text-left"
          >
            <h3 v-aos class="main-title" v-text="'多久沒有出門走走了呢?'"></h3>

            <h4
              v-aos="{ delay: 100 }"
              class="sub-title"
              v-text="`let's get out`"
            ></h4>
            <button
              v-aos="{ delay: 200 }"
              class="btn btn-gradient relative hidden pr-10 pl-6 uppercase tracking-wider lg:block"
              @click="switchPage('/activity')"
            >
              更多funny
              <div class="btn-decoration"></div>
            </button>
          </div>
        </div>

        <!-- Hidden button -->
        <button
          class="btn btn-gradient relative mt-10 block pl-6 pr-10 uppercase tracking-wider lg:hidden"
          @click="switchPage('/activity')"
        >
          更多funny
          <div class="btn-decoration"></div>
        </button>
      </div>

      <!-- Food-mark image -->
      <img
        v-aos="{ type: 'zoom-in' }"
        class="absolute right-0 -bottom-60 z-10 hidden w-28 lg:block lg:w-auto"
        src="@/assets/img/food-mark.png"
        alt="traveler"
      />
    </section>

    <!-- Food section -->
    <section class="relative my-40">
      <div
        class="container mx-auto flex flex-col items-center gap-20 px-10 xl:flex-row xl:items-start"
      >
        <!-- Title group -->
        <div class="z-20 space-y-2 whitespace-nowrap text-center xl:text-left">
          <h3 v-aos class="main-title" v-text="'餐飲美食'"></h3>
          <h4 v-aos="{ delay: 100 }" class="sub-title" v-text="'tasty'"></h4>
          <button
            v-aos="{ delay: 200 }"
            class="btn btn-gradient relative hidden pl-6 pr-10 tracking-wider xl:block"
            @click="switchPage('/food')"
          >
            更多美味
            <div class="btn-decoration"></div>
          </button>
        </div>
        <!-- Food card -->
        <swiper
          v-aos="{ delay: 500 }"
          :modules="modules"
          :navigation="true"
          :breakpoints="swpierOptions.breakpoints"
          :space-between="30"
        >
          <swiper-slide
            v-for="food in multiData.foods"
            :key="food.RestaurantID"
          >
            <TravelCard :data="food" api-type="Restaurant">
              <template #image-layout>
                <div
                  :style="{
                    backgroundImage: `url('${food.Picture.PictureUrl1}')`,
                  }"
                  class="flex h-80 cursor-pointer items-end justify-between rounded-lg bg-cover bg-center bg-no-repeat p-2"
                >
                  <div class="text-white">
                    <p
                      class="text-lg font-semibold"
                      v-text="food.RestaurantName"
                    ></p>
                    <p v-text="food.Class"></p>
                  </div>
                  <span
                    class="whitespace-nowrap rounded-full bg-black p-2 text-white"
                    v-text="food.City"
                  >
                  </span>
                </div>
              </template>
              <template #info-layout>
                <div></div>
              </template>
            </TravelCard>
          </swiper-slide>
        </swiper>
      </div>

      <!-- hidden button -->
      <div class="relative flex justify-center pl-6 pr-10 xl:hidden">
        <button class="btn btn-gradient mt-10" @click="switchPage('/food')">
          更多美味
          <div class="btn-decoration"></div>
        </button>
      </div>

      <!-- Rounded Rectangle -->
      <div
        v-aos="{ type: 'fade-right' }"
        class="absolute left-0 -top-24 z-0 h-80 w-0 rounded-r-full bg-[#f7f7f7] sm:w-2/3"
      ></div>
    </section>

    <!-- Hotel section-->
    <section class="relative my-40">
      <div class="container mx-auto grid grid-cols-12 gap-4 px-10 lg:gap-20">
        <!-- Title group -->
        <div class="z-10 col-span-12 space-y-2 text-center">
          <h3 v-aos class="main-title" v-text="'精選住宿'"></h3>
          <h4
            v-aos="{ delay: 100 }"
            class="sub-title"
            v-text="'Accommodation'"
          ></h4>
        </div>
        <!-- Hotel card -->
        <div class="col-span-12">
          <div class="grid grid-cols-12 gap-4">
            <TravelCard
              v-for="(hotel, index) in multiData.hotels"
              :key="hotel.HotelID"
              v-aos="{ delay: (index + 1) * 200 }"
              :data="hotel"
              :class="[index % 2 === 0 ? 'lg:-translate-y-10' : '']"
              class="group sm:col-span-6 lg:col-span-3"
              api-type="Hotel"
            />
          </div>
        </div>
        <div class="col-span-12 flex justify-center">
          <button
            class="btn btn-gradient z-10 mt-10 pr-10 pl-6 tracking-wider relative"
            @click="switchPage('/hotel')"
          >
            更多住宿
            <div class="btn-decoration"></div>
          </button>
        </div>
      </div>
      <div
        v-aos="{ type: 'zoom-in' }"
        class="absolute -bottom-40 z-0 h-full w-full rounded-t-full bg-[#f7f7f7]"
      ></div>
    </section>
  </div>
</template>

<style scoped></style>
