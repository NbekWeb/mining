<template>
  <div
    class="flex box-effect items-center gap-0 h-15.5 max-w-max rounded-xl max-sm:grid max-sm:grid-cols-1 max-sm:gap-4 max-sm:h-auto max-sm:mx-auto group"
    :class="{ 'active': isActive }"
  >
    <div
      class="h-full box-effect-sm relative flex items-center gap-2 pl-4 max-lg:bg-white max-sm:h-15 max-sm:rounded-md max-sm:border-fiolet border-l-2 border-y-2 max-sm:border-2 border-fiolet rounded-l-lg"
      :class="isActive && 'border-transparent'"
    >
      <span> visitb.io/ </span>
      <div class="formField" style="position: relative; display: inline-block">
        <input
          required
          type="text"
          v-model="inputValue"
          class="text-base pt-5 pb-2.5 px-4 focus:outline-none transition-all duration-300 bg-transparent"
          @focus="isActive = true"
          @blur="isActive = false"
        />
        <span
          class="custom-placeholder absolute left-0 top-0 px-4 max-sm:px-2.5 pt-[13px] text-[16px] font-semibold text-[#8f8f8f] pointer-events-none transition-all duration-300 bg-transparent"
          :class="{
            'transform -translate-y-[12px] -translate-x-[5px] scale-[0.95] text-[14px] opacity-90':
              isActive || inputValue,
          }"
          >yourname</span
        >
      </div>
    </div>

    <button
      class="text-white max-sm:rounded-md nav-btn text-xl font-bold h-full px-7 flex items-center bg-fiolet max-sm:h-15 rounded-r-lg"
    >
      <span> Start for free </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const inputValue = ref("");
const isActive = ref(false);
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
.box-effect {
  box-shadow: 0 0 0 5px transparent;
  transition: 0.3s ease-in-out;
}

@media (min-width: 640px) {
  /* .box-effect:hover, */
  .box-effect:focus,
  .box-effect.active {
    box-shadow: 0 0 0 2px #06ab4f;
  }
  /* .box-effect:hover button, */
  .box-effect:focus button,
  .box-effect.active button {
    border-right: 1px solid #06ab4f;
  }
}
@media (max-width: 640px) {
  /* .box-effect-sm:hover, */
  .box-effect-sm:focus,
  .box-effect-sm.active {
    box-shadow: 0 0 0 2px #06ab4f;
    border-color: transparent;
  }

}
</style>
