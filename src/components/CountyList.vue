<script setup>
import { useStore } from "vuex";
import { positions } from "@/util/util.js";
import { useRoute } from "vue-router";
import { computed, onMounted, defineEmits } from "vue";

const emits = defineEmits(["handleChangeArea"]);

const store = useStore();
const route = useRoute();

const areaFilter = computed(() => store.getters.areaFilter);
const choosePosition = computed(() => store.state.choosePosition);
const chooseArea = computed(() => store.state.chooseArea);

const changePosition = (position) => store.dispatch("changePosition", position);

const handleChangeArea = (option) => {
  const query = {
    position: choosePosition.value,
    county: option.areaEN,
  };
  emits("handleChangeArea", { query, option });
};

onMounted(() => {
  store.commit("UPDATE_AREA", route.query.county);
  store.commit("UPDATE_POSITION", route.query.position);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-10">
    <slot name="choose-city-page"></slot>
    <div class="flex flex-col items-center gap-10 lg:flex-row">
      <slot name="home-page"></slot>
      <!-- Location card -->
      <ul
        v-aos="{ delay: 200 }"
        class="xs:p-0 z-10 flex flex-wrap items-center gap-4 px-10 md:gap-10"
      >
        <li
          v-for="(position, index) in positions"
          :key="index"
          v-aos="{ delay: (index + 1) * 80 }"
          :class="
            choosePosition === position.text
              ? 'shadow-custom-hover'
              : 'shadow-custom'
          "
          class="group flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-5 duration-200 hover:shadow-custom-hover"
          @click="changePosition(position.text)"
        >
          <img
            :src="position.img"
            :alt="position.text"
            class="mb-2 h-20 w-20 rounded-full bg-gradient-to-b from-primary to-secondary object-none"
          />
          <span
            :class="
              choosePosition === position.text ? 'after:block' : 'after:hidden'
            "
            class="relative font-bold after:absolute after:-bottom-3 after:left-3 after:rounded-full after:bg-[#C2C2C2] after:p-1 group-hover:after:block"
            >{{ position.text }}</span
          >
        </li>
      </ul>
    </div>
    <ul v-aos="{ delay: 150 }" class="z-10 flex flex-wrap gap-4 px-10">
      <li
        v-for="(areaTW, areaEN, index) in areaFilter"
        :key="index"
        :class="[
          chooseArea === areaEN
            ? 'pointer-events-none rounded-full bg-white shadow-sm'
            : 'cursor-pointer',
        ]"
        class="group flex flex-col items-center rounded-full px-4 py-1 duration-300 hover:bg-white hover:shadow-sm"
        @click="handleChangeArea({ areaTW, areaEN })"
      >
        <span>{{ areaTW }}</span>
        <div
          :class="[chooseArea === areaEN ? ' opacity-100' : 'opacity-0']"
          class="h-1.5 w-4 rounded-full bg-secondary group-hover:opacity-100"
        ></div>
      </li>
    </ul>
  </div>
</template>

<style></style>
