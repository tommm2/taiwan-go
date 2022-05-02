<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const modalData = computed(() => store.state.modalData);
const modalIsShow = computed(() => store.state.modalIsShow);

const imgNotFound = new URL(
  "../assets/img/image-not-found.png",
  import.meta.url
);

const title = computed(() => {
  const data = modalData.value[0];

  for (let key in data) {
    if (key.includes("Name")) return data[key];
  }

  return "";
});

// 獲取所有 Class 欄位
const allClass = computed(() => {
  const data = modalData.value[0];
  const arr = [];

  for (let key in data) {
    if (key.includes("Class")) arr.push(data[key]);
  }

  return arr;
});

// 歸納 url 和 description 為一組
const picture = computed(() => {
  const picture = modalData.value[0].Picture;

  const urls = Object.keys(picture).filter((name) => name.includes("Url"));

  const arr = urls.map((item) => {
    const descriptionKey = "PictureDescription" + item[item.length - 1];
    return {
      url: picture[item],
      description: picture[descriptionKey],
    };
  });
  return arr;
});

const pageIndex = ref(0);

const closeModal = () => {
  modalData.value.splice(0);
  pageIndex.value = 0;
  store.commit("UPDATE_MODAL_STATE", false);
};

const prev = () => {
  pageIndex.value--;

  if (pageIndex.value < 0) {
    pageIndex.value = 0;
  }
};
const next = () => {
  pageIndex.value++;
  if (pageIndex.value > picture.value.length - 1) {
    pageIndex.value = picture.value.length - 1;
  }
};

const prevBtn = computed(() => {
  if (pageIndex.value <= 0) {
    return false;
  }
  return true;
});

const nextBtn = computed(() => {
  if (
    pageIndex.value === picture.value.length - 1 ||
    picture.value.length === 0
  ) {
    return false;
  }
  return true;
});
</script>
<template>
  <div
    v-if="modalIsShow && modalData[0]"
    class="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-10 backdrop-blur-md"
    @click.self="closeModal"
  >
    <div class="relative rounded-md bg-white shadow-lg">
      <div class="px-4 py-4 shadow-md">
        <button
          class="rounded-md bg-gradient-to-b from-primary to-secondary px-3 py-1 text-xl text-white shadow-lg"
          @click="closeModal"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div
        class="h-[400px] w-[350px] overflow-scroll p-4 shadow-lg scrollbar-thin scrollbar-thumb-primary md:h-[600px] md:w-[500px]"
      >
        <!-- img -->
        <img
          :src="[picture.length !== 0 ? picture[pageIndex].url : imgNotFound]"
          :alt="
            picture.length !== 0
              ? picture[pageIndex].description
              : 'Image not found'
          "
          class="mt-2 h-72 w-full rounded-md object-cover"
        />
        <!-- next、prev button -->
        <div class="my-4 flex justify-end space-x-4">
          <button
            v-if="prevBtn"
            class="rounded-md bg-white px-3 py-1.5 shadow-md"
            @click="prev"
          >
            <i class="fas fa-angle-left"></i>
          </button>
          <button
            v-if="nextBtn"
            class="rounded-md bg-white px-3 py-1.5 shadow-md"
            @click="next"
          >
            <i class="fas fa-angle-right"></i>
          </button>
          <div v-else class="px-3 py-1.5"></div>
        </div>

        <!-- info -->
        <div>
          <h3 class="mb-4 text-lg font-bold" v-text="title"></h3>
          <p
            class="break-words text-sm leading-relaxed tracking-widest"
            v-text="modalData[0].Description || modalData[0].DescriptionDetail"
          ></p>
          <!-- location、OpenTime、class、parking -->
          <div class="mt-6 space-y-2">
            <div class="space-x-2 truncate">
              <i class="fas fa-map-marker-alt w-6 text-xl text-primary"></i>
              <span
                :title="modalData[0].Address || modalData[0].Location"
                v-text="
                  modalData[0].Address ||
                  modalData[0].City ||
                  modalData[0].Location
                "
              ></span>
            </div>
            <div class="space-x-2 truncate">
              <i class="fas fa-clock w-6 text-xl text-primary"></i>
              <span
                :title="modalData[0].OpenTime"
                v-text="
                  modalData[0].OpenTime ? modalData[0].OpenTime : '不限時間'
                "
              ></span>
            </div>
            <div v-if="modalData[0].ParkingInfo" class="space-x-2 truncate">
              <i class="fas fa-parking w-6 text-xl text-primary"></i>
              <span
                :title="modalData[0].ParkingInfo"
                v-text="modalData[0].ParkingInfo"
              ></span>
            </div>
            <div class="space-x-2">
              <i class="fas fa-phone-square w-6 text-xl text-primary"></i>

              <span
                :title="modalData[0].Phone"
                v-text="modalData[0].Phone"
              ></span>
            </div>
            <div class="space-x-4 pt-4">
              <span
                v-for="(item, index) in allClass"
                :key="index"
                class="rounded-lg btn-gradient p-2 text-white"
                v-text="item"
              >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
