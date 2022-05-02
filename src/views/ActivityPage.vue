<script setup>
import TravelCard from "@/components/TravelCard.vue";
import Pagination from "@/components/Pagination.vue";
import SelectCity from "@/components/SelectCity.vue";

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const totalLength = computed(() => store.state.totalLength);
const activityData = computed(() => store.state.data);

const chooseArea = computed(() => store.state.chooseArea);
const title = computed(() => store.state.title);

const totalPage = computed(() => store.state.totalPage);
const currentPage = computed(() => store.state.currentPage);

const selectTitle = ref("台北市");

// 更新目前方位
const changePosition = (position) => {
  store.dispatch("changePosition", position);
  selectTitle.value = "-- 篩選縣市 --";
};

// 更新縣市
const changeArea = (area) => {
  store.dispatch("changeArea", area);
  selectTitle.value = area.areaTW;
  getData();
};

// 取得遠端資料
const getData = () => {
  activityData.value.splice(0);
  store.dispatch("getResultWithPage", {
    type: "ScenicSpot",
    city: chooseArea.value,
    perData: 12,
  });
};

// 頁面更新
const onPageChanged = (pageIndex) => {
  store.commit("UPDATE_CURRENT_PAGE", pageIndex);
  getData();
};

onMounted(() => {
  store.commit("UPDATE_POSITION", "北部");
  store.commit("UPDATE_AREA", "Taipei");
  store.commit("UPDATE_TITLE", "台北市");
  getData();
});
</script>

<template>
  <div class="container mx-auto space-y-10 px-10 pt-40">
    <section>
      <h3 v-aos class="main-title" v-text="'特色活動'"></h3>
      <SelectCity
        :select-title="selectTitle"
        @handle-position="changePosition"
        @handle-area="changeArea"
      />
    </section>
    <section>
      <div v-aos="{ delay: 200 }" class="flex items-center space-x-4">
        <h3 class="main-title" v-text="title"></h3>
        <span class="font-bold">
          共有
          <strong
            v-if="totalLength"
            class="mx-2 text-lg text-primary"
            v-text="totalLength"
          ></strong>
          個特色活動
        </span>
      </div>
      <div class="mt-10 grid grid-cols-12 gap-4">
        <TravelCard
          v-for="(activity, index) in activityData"
          :key="activity.activityID"
          v-aos="{ delay: (index + 1) * 50, type: 'zoom-in' }"
          :data="activity"
          api-type="ScenicSpot"
          class="col-span-12 cursor-pointer rounded-lg bg-white shadow-custom duration-200 ease-out hover:shadow-custom-hover md:col-span-6 lg:col-span-3"
        />
      </div>
    </section>
    <div class="flex justify-center pb-10">
      <Pagination
        v-if="totalLength > 20"
        :total-pages="totalPage"
        :current-page="currentPage"
        @page-changed="onPageChanged"
      />
    </div>
  </div>
</template>

<style></style>
