<script setup>
import { computed, defineEmits, defineProps, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { positions } from "@/util/util.js";

const store = useStore();
const emits = defineEmits(["handlePosition", "handleArea"]);
const props = defineProps({
  selectTitle: {
    type: String,
    default: "-- 篩選縣市 --",
  },
});

const select = reactive({
  position: false,
  area: false,
});

const choosePosition = computed(() => store.state.choosePosition);
const chooseArea = computed(() => store.state.chooseArea);
const areaFilter = computed(() => store.getters.areaFilter);

const handlePosition = (position) => {
  emits("handlePosition", position);
  select.position = false;
};

const handleArea = (area) => {
  emits("handleArea", area);
  select.area = false;
};

const { selectTitle } = toRefs(props);
</script>
<template>
  <div v-aos="{delay:100}" class="mt-10">
    <!-- 兩欄式篩選欄 -->
    <div class="hidden rounded-lg bg-[#f2f2f2] md:flex">
      <!-- 區域篩選欄 -->
      <ul
        class="relative flex max-w-xs flex-wrap items-start gap-2 border-r-4 border-[#dedede] p-5"
      >
        <!-- 三角形圖案 -->
        <div
          class="absolute -right-3 top-1/2 -translate-y-1/2 border-b-8 border-t-8 border-l-8 border-b-transparent border-t-transparent border-l-primary"
        ></div>
        <li
          v-for="(position, index) in positions"
          :key="index"
          :class="[
            choosePosition === position.text
              ? 'pointer-events-none rounded-full bg-gradient-to-b from-primary  to-secondary text-white'
              : '',
          ]"
          class="cursor-pointer px-4 py-1 text-lg font-bold"
          @click="emits('handlePosition', position.text)"
          v-text="position.text"
        ></li>
      </ul>
      <!-- 縣市篩選欄 -->
      <ul class="flex w-2/3 flex-wrap items-center gap-1 p-5">
        <li
          v-for="(areaTW, areaEN, index) in areaFilter"
          :key="index"
          class="cursor-pointer px-3 py-1 text-lg font-bold"
          :class="[
            areaEN === chooseArea
              ? 'pointer-events-none rounded-full bg-white'
              : '',
          ]"
          @click="emits('handleArea', { areaEN, areaTW })"
          v-text="areaTW"
        ></li>
      </ul>
    </div>

    <!-- 下拉式篩選欄 -->
    <div class="flex justify-between gap-2 md:hidden">
      <div class="relative w-1/3">
        <div
          class="flex cursor-pointer items-center justify-between rounded-lg bg-[#f2f2f2] px-4 py-3"
          @click="select.position = !select.position"
        >
          <span v-text="choosePosition"></span>
          <span><i class="fas fa-chevron-down"></i></span>
        </div>
        <ul
          v-if="select.position"
          class="absolute w-full rounded-bl-lg rounded-br-lg bg-[#f2f2f2] shadow-custom"
        >
          <li
            v-for="(position, index) in positions"
            :key="index"
            class="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-[#313131] hover:text-white"
            :class="[
              choosePosition === position.text ? 'pointer-events-none ' : '',
            ]"
            @click="handlePosition(position.text)"
          >
            {{ position.text }}
            <i v-if="choosePosition === position.text" class="fas fa-check"></i>
          </li>
        </ul>
      </div>
      <div class="relative w-2/3">
        <div
          class="flex cursor-pointer items-center justify-between rounded-lg bg-[#f2f2f2] px-4 py-3"
          @click="select.area = !select.area"
        >
          <span v-text="selectTitle"></span>
          <span><i class="fas fa-chevron-down"></i></span>
        </div>
        <ul
          v-if="select.area"
          class="absolute w-full rounded-bl-lg rounded-br-lg bg-[#f2f2f2] shadow-custom"
        >
          <li
            v-for="(areaTW, areaEN, index) in areaFilter"
            :key="index"
            :class="[chooseArea === areaEN ? 'pointer-events-none ' : '']"
            class="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-[#313131] hover:text-white"
            @click="handleArea({ areaTW, areaEN })"
          >
            {{ areaTW }}
            <i v-if="chooseArea === areaEN" class="fas fa-check"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
