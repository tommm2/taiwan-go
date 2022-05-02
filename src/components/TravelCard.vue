<script setup>
import { defineProps, toRefs, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const imgNotFound = new URL(
  "../assets/img/image-not-found.png",
  import.meta.url
);

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  apiType: {
    type: String,
    default: () => "",
  },
});

const { data, apiType } = toRefs(props);

const allClass = computed(() => {
  let arr = [];
  for (let key in data.value) {
    key.includes("Class") ? arr.push(data.value[key]) : [];
  }

  return arr;
});

const title = computed(() => {
  let title = "";
  for (let key in data.value) {
    key.includes("Name") ? (title = data.value[key]) : "";
  }
  return title;
});

const id = computed(() => {
  let id = "";
  for (let key in data.value) {
    key.includes("ID") ? (id = data.value[key]) : "";
  }

  return id;
});

const getResultById = (type, city, id) => {
  store.dispatch("getResultById", { type, city, id });
};
</script>

<template>
  <div
    class="group z-10 col-span-12 cursor-pointer rounded-lg bg-white shadow-custom duration-200 hover:shadow-lg"
    @click="getResultById(apiType, '', id)"
  >
    <!-- Image slot -->
    <slot name="image-layout">
      <div
        :style="{
          backgroundImage: `url('${
            data.Picture.PictureUrl1 ? data.Picture.PictureUrl1 : imgNotFound
          }')`,
        }"
        :class="[
          data.Picture.PictureUrl1
            ? 'bg-[length:110%_100%] bg-center hover:bg-[length:120%_110%]'
            : 'bg-cover',
        ]"
        class="h-52 w-full rounded-tr-lg rounded-tl-lg bg-center bg-no-repeat duration-500 ease-out"
      ></div>
    </slot>
    <!-- Info slot -->
    <slot name="info-layout">
      <div class="flex flex-col justify-between space-y-10 p-2.5">
        <div class="truncate">
          <span :title="title" class="font-lg font-bold" v-text="title"></span>
          <p
            class="truncate text-[#A8A8A8]"
            v-text="data.Address || data.Location"
          ></p>
        </div>
        <div class="flex items-center justify-between">
          <div v-if="allClass.length !== 0" class="space-x-2">
            <span
              v-for="(item, index) in allClass"
              :key="index"
              class="rounded-full bg-[#ededed] px-2 py-1 font-bold"
              v-text="item"
            ></span>
          </div>
          <div v-else class="rounded-full bg-[#ededed] px-2 py-1 font-bold">
            未歸類
          </div>
          <span class="font-bold text-city-color" v-text="data.City"></span>
        </div>
      </div>
    </slot>
  </div>
</template>

<style></style>
