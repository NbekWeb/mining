<template>
  <div
    class="flex items-center gap-0 h-15.5 max-w-max rounded-xl max-sm:grid max-sm:grid-cols-1 max-sm:gap-4 max-sm:h-auto max-sm:mx-auto"
    :class="{
      'sm:border-2': true,
      'sm:border-green-500': isActive || isHovered,
      'sm:border-fiolet': !(isActive || isHovered),
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="h-full flex items-center gap-2 pl-4 max-lg:bg-white max-sm:h-15 max-sm:rounded-md max-sm:border-fiolet max-sm:border-2"
      :class="{
        'max-sm:border-green-500': isActive || isHovered,
      }"
      style="position: relative"
    >
      <span> visitb.io/ </span>
      <div class="formField" style="position: relative; display: inline-block">
        <input
          required
          type="text"
          v-model="inputValue"
          class="text-base pt-5 pb-2.5 px-4  focus:outline-none transition-all duration-300 bg-transparent"
          @focus="isActive = true"
          @blur="isActive = false"
        />
        <span
          class="custom-placeholder absolute left-0 top-0 px-4  max-sm:px-2.5 pt-[13px] text-[16px] font-semibold text-[#8f8f8f] pointer-events-none transition-all duration-300 bg-transparent"
          :class="{
            'transform -translate-y-[12px] -translate-x-[5px] scale-[0.95] text-[14px] opacity-90': isActive || inputValue
          }"
        >yourname</span>
      </div>
    </div>

    <button
      class="text-white max-sm:rounded-md nav-btn text-xl font-bold h-full px-7 flex items-center bg-fiolet max-sm:h-15 rounded-r-lg border border-fiolet"
    >
      <span> Start for free </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isActive = ref(false);
const isHovered = ref(false);
const inputValue = ref("");
</script>

<style scoped>
.custom-placeholder {
  color: #8f8f8f;
}
.custom-placeholder.active {
  transform: translateY(-12px) translateX(-5px) scale(0.95);
  font-size: 14px;
  opacity: 0.9;
}
</style>
