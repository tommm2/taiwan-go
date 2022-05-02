<script setup>
import TravelCard from "@/components/TravelCard.vue";
import Pagination from "@/components/Pagination.vue";
import SelectCity from "@/components/SelectCity.vue";

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { filters } from "@/util/util.js";

const imageNotFound = new URL(
  "../assets/img/image-not-found.png",
  import.meta.url
);

const store = useStore();

const foodData = computed(() => store.state.data);
const totalLength = computed(() => store.state.totalLength);

const totalPage = computed(() => store.state.totalPage);
const currentPage = computed(() => store.state.currentPage);

const chooseArea = computed(() => store.state.chooseArea);
const title = computed(() => store.state.title);

const selectTitle = ref("台北市");
const classType = ref("");

// 更新目前方位
const changePosition = (position) => {
  store.dispatch("changePosition", position);
  selectTitle.value = "-- 篩選縣市 --";
};

// 更新縣市
const changeArea = (area) => {
  selectTitle.value = area.areaTW;
  store.dispatch("changeArea", area);
  getData({ classType: classType.value });
};

const changeClassType = (options) => {
  store.commit("UPDATE_CURRENT_PAGE", 1);
  getData(options);
};

// 頁面更新
const onPageChanged = (pageIndex) => {
  store.commit("UPDATE_CURRENT_PAGE", pageIndex);
  getData();
};

// 取得遠端資料
const getData = (options = null) => {
  foodData.value.splice(0);
  store.dispatch("getResultWithPage", {
    type: "Restaurant",
    city: chooseArea.value,
    perData: 5,
    filter: classType.value ? options : null,
  });
};

onMounted(() => {
  store.commit("UPDATE_CURRENT_PAGE", 1);
  store.commit("UPDATE_POSITION", "北部");
  store.commit("UPDATE_AREA", "Taipei");
  store.commit("UPDATE_TITLE", "台北市");
  getData();
});
</script>

<template>
  <div class="container mx-auto space-y-10 px-10 pt-40">
    <section>
      <h3 v-aos class="main-title" v-text="'美食饗宴'"></h3>
      <SelectCity
        :select-title="selectTitle"
        @handle-position="changePosition"
        @handle-area="changeArea"
      />
    </section>
    <section>
      <div class="flex items-center space-x-4">
        <h3 v-aos="{ delay: 150 }" class="main-title" v-text="title"></h3>
        <span class="font-bold">
          共有
          <strong
            class="mx-2 text-lg text-primary"
            v-text="totalLength"
          ></strong>
          家美食
        </span>
      </div>
      <div class="my-10 grid grid-cols-12 gap-4 md:gap-10">
        <div v-aos="{ delay: 200 }" class="col-span-12 lg:col-span-9">
          <div v-if="!totalLength" class="flex justify-center text-2xl">
            <img src="../assets/img/no-data-img.jpg" alt="No Data Found" />
          </div>
          <TravelCard
            v-for="(food, index) in foodData"
            :key="food.RestaurantID"
            v-aos="{ delay: (index + 1) * 50 }"
            :data="food"
            api-type="Restaurant"
            class="mb-10 flex cursor-pointer rounded-lg bg-white shadow-custom duration-200 ease-out hover:shadow-custom-hover"
          >
            <template #image-layout>
              <div
                :style="{
                  backgroundImage: `url('${
                    food.Picture.PictureUrl1
                      ? food.Picture.PictureUrl1
                      : imageNotFound
                  }')`,
                }"
                class="h-60 w-1/2 rounded-tl-lg rounded-bl-lg bg-[#e7e7e7] bg-cover bg-center bg-no-repeat duration-500 ease-out md:w-1/3"
              ></div>
            </template>
            <template #info-layout>
              <div class="flex w-1/2 flex-col justify-around p-5 md:w-2/3">
                <div>
                  <span
                    class="text-xl font-bold"
                    v-text="food.RestaurantName"
                  ></span>
                  <p
                    class="font-bold text-city-color"
                    v-text="food.Class || '其他'"
                  ></p>
                </div>
                <p
                  class="hidden text-[#a8a8a8] md:line-clamp-3"
                  v-text="food.Description"
                ></p>
                <p class="font-bold text-[#787878]" v-text="food.Address"></p>
              </div>
            </template>
          </TravelCard>
          <div class="flex justify-center">
            <Pagination
              v-if="totalLength > 5"
              :total-pages="totalPage"
              :current-page="currentPage"
              @page-changed="onPageChanged"
            />
          </div>
        </div>
        <div
          v-aos
          class="sticky top-24 col-span-3 hidden h-96 space-y-2 rounded-lg bg-[#f6f6f6] p-10 lg:block"
        >
          <h3 class="text-xl font-bold" v-text="'分類篩選'"></h3>
          <div
            v-for="(filter, index) in filters"
            :key="index"
            class="mt-4 flex items-center space-x-2"
          >
            <input
              :id="filter.id"
              v-model="classType"
              type="checkbox"
              class="rounded-md border-2 bg-white"
              :true-value="filter.label"
              :false-value="''"
              @change="changeClassType({ classType })"
            />
            <label :for="filter.id" v-text="filter.label"></label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
