<template>
  <div
    class="w-full py-3 bg-white rounded-xl shadow-lg"
    data-aos="zoom-in"
    :data-aos-delay="delay"
  >
    <img class="w-full h-auto object-contain" :src="data?.image" />
    <div class="py-6 px-7">
      <h5 class="text-lg text-black font-semibold text-center">
        {{ data?.name }}
      </h5>
      <div class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-3">
          <strong class="text-blue-500">✔</strong>
          <span> Price - {{ Math.floor(data?.price) }} $</span>
        </div>
        <div class="flex items-center gap-3">
          <strong class="text-blue-500">✔</strong>
          <span> Return per day - {{ Math.floor(data?.per_day) }} $</span>
        </div>
        <div class="flex items-center gap-3">
          <strong class="text-blue-500">✔</strong>
          <span> Return per month - {{ Math.floor(data?.per_month) }} $ </span>
        </div>
      </div>
      <div class="pb-4 flex justify-center text-white mt-5">
        <button
          @click="handleJoinUs"
          class="bg-blue-500 hover:opacity-80 px-4 py-2 rounded-md"
        >
          Buy now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function handleJoinUs() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/account");
  } else {
    router.push("/login");
  }
}

defineProps({
  delay: {
    type: Number,
    default: 0,
  },
  data: {
    type: Object,
    required: true,
  },
});
</script>
