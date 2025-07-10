<script setup>
import { defineProps } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const goLink = (link) => {
  window.open(link, "_blank");
};
</script>
<template>
  <div
    class="text-primary hover:cursor-pointer trend-card package"
    @click="goLink(data.link)"
  >
    <div class="package2">
      <img :src="data.img" class="h-48.5 rounded-lg object-cover w-full" />
      <div class="p-0.5 bg-white rounded-b-lg">
        <div class="p-2">
          <h4
            class="font-bold text-[26px] mt-7.5 mb-5 max-md:text-xl max-md:mt-5 max-md:mb-2.5"
          >
            {{ data.title }}
          </h4>
          <p class="text-lg max-md:text-base">
            {{ data.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.package {
  background-image: linear-gradient(163deg, #ff00ff 0%, #3700ff 100%);
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0, 0, 0, 1);
}

.trend-card:hover .package {
  box-shadow: 0px 0px 30px 1px rgba(204, 0, 255, 0.3);
}

.package2 {
  background-color: transparent;
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0, 0, 0, 1);

  cursor: pointer;
}

.trend-card:hover .package2 {
  transform: scale(0.98);
  border-radius: 18px;
}
</style>
