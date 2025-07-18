<script setup>
import { ref, onMounted } from "vue";

const staticSubSection = ref(null);
const titleElement = ref(null);
const authorElement = ref(null);
const contentElement = ref(null);
const seen = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !seen.value) {
        seen.value = true;
        observer.unobserve(staticSubSection.value);
      }
    },
    { threshold: 0.3 }
  );
  if (staticSubSection.value) {
    observer.observe(staticSubSection.value);
  }
});
</script>
<template>
  <div class="w-full bg-blue-600 relative pb-27">
    <div
      ref="staticSubSection"
      :class="{ animate: seen }"
      class="container mx-auto px-5 grid grid-cols-2 gap-3 pb-5 pt-20 max-lg:grid-cols-1 max-lsm:pt-10"
    >
      <div class="my-auto">
        <img
          src="../../assets/img/static-sub.webp"
          class="w-full h-auto object-contain"
        />
      </div>
      <div class="text-white">
        <h3
          ref="titleElement"
          :class="{ animate: seen }"
          class="text-3xl font-bold !mb-0 max-sm:text-2xl max-sm:leading-6 animate-element"
        >
          How many millionaires do you know who have become wealthy by investing
          in bank deposit? I rest my case
        </h3>
        <br />
        <br />
        <span
          ref="authorElement"
          :class="{ animate: seen }"
          class="text-lg max-sm:text-base animate-element"
        >
          «Robert G. Allen»
        </span>
        <br />
        <br />
        <p
          ref="contentElement"
          :class="{ animate: seen }"
          class="text-lg max-sm:text-base leading-5 animate-element"
        >
          Bitcoin miners receive Bitcoin as a reward for completing "blocks" of
          verified transactions. Nowadays reward for 1 block of transactions
          3.125 bitcoins. That's around $300.000. Thus, 450 bitcoins are mined
          daily. This is about $45 million every day or $1.35 billion a month.
          This is the volume of the cryptocurrency mining market and it's only
          bitcoin. In addition to bitcoin, there are hundreds of other
          cryptocurrencies that can be mined. Therefore, the mining market is
          huge and everyone can enter it.
          <br />
          <br />
          or example, analysts at Royal Bank of Canada predict in the near
          future that the cryptocurrency market will reach $ 10 trillion in
          capitalization. One way or another, the cryptocurrency market is
          developing and has already become self-sufficient. The moment was
          critical when in 2017, 2 of the 4 major global audit companies - Ernst
          & Young (EY) and PricewaterhouseCoopers (PwC) - began not only to
          accept Bitcoin, but also to build up crypto companies in their
          portfolios.
        </p>
      </div>
    </div>
    <div
      class="w-full h-28 object-cover absolute -bottom-0.5 left-0"
      data-original="https://static.tildacdn.pro/tild6631-6438-4633-b831-313933343435/sect-wave_top-gray.svg"
      aria-label=""
      role="img"
      style="
        background-image: url('https://static.tildacdn.pro/tild6631-6438-4633-b831-313933343435/sect-wave_top-gray.svg');
      "
    ></div>
  </div>
</template>

<style scoped>
.animate-element {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.animate-element.animate {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation delays */
h3.animate-element.animate {
  transition-delay: 0.2s;
}

span.animate-element.animate {
  transition-delay: 0.4s;
}

p.animate-element.animate {
  transition-delay: 0.6s;
}
</style>
