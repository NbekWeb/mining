<template>
  <div
    data-aos="zoom-up"
    :data-aos-delay="delay"
    class="h-full w-full p-6 rounded-xl shadow-lg bg-white"
  >
    <h6 class="text-xl text-black !mb-6 !font-semibold">{{ statusName }}</h6>
    <div class="flex items-center gap-2 mb-4">
      <strong class="text-blue-500">✔</strong>
      <span class="text-black opacity-90 font-light">{{
        investmentAmount
      }}</span>
    </div>
    <span class="text-lg font-bold text-black mb-3 block"
      >This status gives you:</span
    >
    <div class="flex flex-col gap-5 pl-4">
      <div
        v-for="benefit in benefits"
        :key="benefit"
        class="flex items-center gap-1.5"
      >
        <strong class="text-blue-500">✔</strong>
        <span class="font-base text-black font-light opacity-90">{{
          benefit
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  statusName: {
    type: String,
    required: true,
  },
  investmentAmount: {
    type: Number,
    required: true,
  },
  benefits: {
    type: Array,
    required: true,
  },
  delay: {
    type: Number,
    default: 0,
  },
});
</script>
<style scoped>
.shadow-lg {
  border: 1px solid #e0e6ed;
  box-shadow: 0px 15px 30px -10px rgba(0, 11, 48, 0.2);
}
</style>
