<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const minerSection = ref(null);
const titleElement = ref(null);
const subtitleElement = ref(null);
const paragraph1Element = ref(null);
const paragraph2Element = ref(null);
const paragraph3Element = ref(null);
const paragraph4Element = ref(null);
const paragraph5Element = ref(null);
const paragraph6Element = ref(null);
const buttonElement = ref(null);
const seen = ref(false);

function handleJoinUs() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !seen.value) {
        seen.value = true;
        observer.unobserve(minerSection.value);
      }
    },
    { threshold: 0.3 }
  );
  if (minerSection.value) {
    observer.observe(minerSection.value);
  }
});
</script>

<template>
  <section
    ref="minerSection"
    class="miner-section bg-white pt-17 pb-10"
    id="equipment"
  >
    <div class="container mx-auto px-5">
      <h2
        ref="titleElement"
        :class="{ animate: seen }"
        class="text-6xl font-bold text-center !mb-20 text-gray-800 animate-element max-sm:text-4xl max-sm:!mb-15"
      >
        How do we make money?
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Left side content -->
        <div class="">
          <h3
            ref="subtitleElement"
            :class="{ animate: seen }"
            class="text-xl font-semibold text-gray-700 animate-element"
          >
            The operating principal is very simple!
          </h3>

          <div class="space-y-4">
            <p
              ref="paragraph1Element"
              :class="{ animate: seen }"
              class="text-gray-600 leading-relaxed animate-element border-l-3 border-gray-600 pl-4"
            >
              The operating principal is very simple. Investors invest their
              funds. Then we purchase miners and install them on our farm.
              Miners process transactions on the bitcoin network and receive
              rewards. We share the profit between our company and investors.
            </p>

            <p
              ref="paragraph2Element"
              :class="{ animate: seen }"
              class="text-gray-600 leading-relaxed animate-element border-l-3 border-gray-600 pl-4"
            >
              The principle of 3-level diversification – resources, investments,
              and risks.
            </p>

            <p
              ref="paragraph3Element"
              :class="{ animate: seen }"
              class="text-gray-600 leading-relaxed animate-element border-l-3 border-gray-600 pl-4"
            >
              We diversify by using algorithms for various cryptocurrencies and
              miners, diversifying risks, mining through various pools, and
              having a team for setting up and launching miners to ensure smooth
              operation.
            </p>

            <p
              ref="paragraph4Element"
              :class="{ animate: seen }"
              class="text-gray-600 leading-relaxed animate-element border-l-3 border-gray-600 pl-4"
            >
              We scale profits and dividends from existing miners and expand
              production areas to improve financial balance and profitability.
            </p>

            <p
              ref="paragraph5Element"
              :class="{ animate: seen }"
              class="text-gray-600 leading-relaxed animate-element border-l-3 border-gray-600 pl-4"
            >
              Our business model allows us to operate steadily in volatile
              markets, adapt quickly, make effective decisions, and be mobile
              and sustainable.
            </p>

            <p
              ref="paragraph6Element"
              :class="{ animate: seen }"
              class="text-gray-600 leading-relaxed animate-element border-l-3 border-gray-600 pl-4"
            >
              Learn more about our miners in a special section.
            </p>
          </div>
        </div>

        <!-- Right side button -->
        <div class="flex justify-center text-white">
          <button
            @click="handleJoinUs"
            ref="buttonElement"
            :class="{ animate: seen }"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-20 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-element"
          >
            JOIN US 
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.miner-section {
  opacity: 1;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.miner-section.animate {
  opacity: 1;
  transform: translateY(0);
}

.animate-element {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.animate-element.animate {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation delays */
.animate-element:nth-child(1) {
  transition-delay: 0.1s;
}
.animate-element:nth-child(2) {
  transition-delay: 0.2s;
}
.animate-element:nth-child(3) {
  transition-delay: 0.3s;
}
.animate-element:nth-child(4) {
  transition-delay: 0.4s;
}
.animate-element:nth-child(5) {
  transition-delay: 0.5s;
}
.animate-element:nth-child(6) {
  transition-delay: 0.6s;
}
.animate-element:nth-child(7) {
  transition-delay: 0.7s;
}
.animate-element:nth-child(8) {
  transition-delay: 0.8s;
}
.animate-element:nth-child(9) {
  transition-delay: 0.9s;
}
.animate-element:nth-child(10) {
  transition-delay: 1s;
}
</style>
