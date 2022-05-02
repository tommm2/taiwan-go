<script setup>
import CountyList from "@/components/CountyList.vue";
import TravelCard from "@/components/TravelCard.vue";

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Grid, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

const imgNotFound = new URL(
  "../assets/img/image-not-found.png",
  import.meta.url
);

const modules = [Navigation, Grid, Pagination];
const swpierOptions = {
  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    },
  },
  breakpoints2: {
    320: {
      slidesPerView: 1,
      grid: {
        rows: "2",
        fill: "row",
      },
    },
    600: {
      slidesPerView: 2,
      grid: {
        rows: "2",
        fill: "row",
      },
    },
    950: {
      slidesPerView: 3,
      grid: {
        rows: "2",
        fill: "row",
      },
    },
    1300: {
      slidesPerView: 4,
      grid: {
        rows: "2",
        fill: "row",
      },
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

const store = useStore();
const route = useRoute();
const router = useRouter();

const title = computed(() => store.state.title);
const multiData = computed(() => store.state.multiData);

const countyQuery = ref("");

const changeArea = (options) => {
  const { query, option } = options;

  router.replace({
    path: "/city",
    query,
  });
  store.dispatch("changeArea", option);
  countyQuery.value = query.county;
  getResult();
};

const getResult = () => {
  let types = ["ScenicSpot", "Activity", "Restaurant", "Hotel"];
  let query = { top: 10 };

  types.forEach((type) => {
    store.dispatch("getResult", {
      type,
      city: countyQuery.value,
      query,
    });
  });
};

onMounted(() => {
  countyQuery.value = route.query.county;
  getResult();
});
</script>

<template>
  <div class="overflow-x-hidden py-16">
    <div
      class="h-[25vw] w-full bg-city-banner bg-cover bg-center bg-no-repeat object-none sm:h-[20vw] lg:h-[10vw]"
    ></div>
    <section class="bg-bg-color py-10">
      <CountyList @handle-change-area="changeArea">
        <template #choose-city-page>
          <div class="z-10 whitespace-nowrap text-center">
            <h3 v-aos class="main-title" v-text="'縣市快選'"></h3>
            <h4
              v-aos="{ delay: 100 }"
              class="sub-title"
              v-text="'choose cities'"
            ></h4>
          </div>
        </template>
      </CountyList>
    </section>
    <section class="container mx-auto mt-20 px-10">
      <h3 class="mb-4 flex items-center text-2xl font-extrabold">
        <strong class="mr-2 font-semibold text-secondary" v-text="title">
        </strong
        >景點介紹
      </h3>
      <swiper
        :modules="modules"
        :space-between="30"
        :breakpoints="swpierOptions.breakpoints"
        :navigation="true"
        :pagination="swpierOptions.pagination"
      >
        <swiper-slide
          v-for="spot in multiData.scenicSpots"
          :key="spot.scenicSpotID"
        >
          <TravelCard :data="spot" api-type="ScenicSpot">
            <template #info-layout>
              <div class="space-y-2 p-4">
                <div
                  class="truncate text-lg font-bold"
                  :title="spot.ScenicSpotName"
                  v-text="spot.ScenicSpotName"
                ></div>
                <div
                  class="text-sm text-[#a8a8a8] line-clamp-5"
                  :title="spot.Description || spot.DescriptionDetail"
                  v-text="spot.Description || spot.DescriptionDetail"
                ></div>
                <div class="flex items-center">
                  <img
                    class="mr-2"
                    src="../assets/img/time-icon.png"
                    alt="time-icon"
                  />
                  <span
                    class="truncate"
                    :title="spot.OpenTime || '未提供'"
                    v-text="spot.OpenTime || '未提供'"
                  ></span>
                </div>
                <div class="flex items-center">
                  <img
                    class="mr-2"
                    src="../assets/img/location-icon.png"
                    alt="location-icon"
                  />
                  <span
                    class="truncate"
                    :title="spot.Address"
                    v-text="spot.Address"
                  ></span>
                </div>
              </div>
            </template>
          </TravelCard>
        </swiper-slide>
      </swiper>
    </section>
    <section class="container mx-auto mt-20 px-10">
      <h3 class="mb-4 flex items-center text-2xl font-extrabold">
        <img
          class="mr-2"
          src="../assets/img/activity-icon.png"
          alt="activity-icon"
        />
        特色活動
      </h3>
      <swiper
        :modules="modules"
        :space-between="30"
        :breakpoints="swpierOptions.breakpoints2"
        :navigation="true"
        :pagination="swpierOptions.pagination"
      >
        <swiper-slide
          v-for="activity in multiData.activitys"
          :key="activity.ActivityID"
        >
          <TravelCard :data="activity" api-type="Activity" />
        </swiper-slide>
      </swiper>
    </section>
    <section class="mt-20 bg-bg-color py-4">
      <div class="container mx-auto py-10 px-10">
        <h3 class="mb-4 flex items-center text-2xl font-extrabold">
          <img
            class="mr-2"
            src="../assets/img/food-icon.png"
            alt="activity-icon"
          />
          餐飲美食
        </h3>
        <swiper
          :modules="modules"
          :space-between="30"
          :breakpoints="swpierOptions.breakpoints2"
          :navigation="true"
          :pagination="swpierOptions.pagination"
        >
          <swiper-slide
            v-for="food in multiData.foods"
            :key="food.RestaurantID"
          >
            <TravelCard :data="food" api-type="Restaurant">
              <template #image-layout>
                <div
                  :style="{
                    backgroundImage: `url('${
                      food.Picture.PictureUrl1 || imgNotFound
                    }')`,
                  }"
                  class="relative flex h-80 cursor-pointer items-end justify-between rounded-lg bg-cover bg-center bg-no-repeat p-2 duration-200"
                >
                  <div class="z-10 text-white">
                    <p class="text-lg font-semibold">
                      {{ food.RestaurantName }}
                    </p>
                    <p>{{ food.Class }}</p>
                  </div>
                  <span
                    class="z-10 whitespace-nowrap rounded-full bg-black p-2 text-white"
                  >
                    {{ food.City }}
                  </span>
                  <div
                    class="absolute top-0 bottom-0 right-0 left-0 z-0 rounded-lg bg-black opacity-20"
                  ></div>
                </div>
              </template>
              <template #info-layout>
                <div></div>
              </template>
            </TravelCard>
          </swiper-slide>
        </swiper>
      </div>
    </section>
    <section class="container mx-auto mt-20 px-10">
      <h3 class="mb-4 flex items-center text-2xl font-extrabold">
        <img
          class="mr-2"
          src="../assets/img/hotel-icon.png"
          alt="activity-icon"
        />
        優質旅宿
      </h3>
      <swiper
        :modules="modules"
        :space-between="30"
        :breakpoints="swpierOptions.breakpoints2"
        :navigation="true"
        :pagination="swpierOptions.pagination"
      >
        <swiper-slide v-for="hotel in multiData.hotels" :key="hotel.HotelID">
          <TravelCard :data="hotel" api-type="Hotel" />
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>

<style scoped>
.swiper {
  @apply py-14;
}
</style>
