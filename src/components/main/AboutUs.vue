<template>
  <section
    id="about"
    ref="aboutSection"
    :class="{ animate: seen }"
    class="about-section bg-gray-500 py-17 max-sm:pb-10"
  >
    <div class="container mx-auto px-5">
      <h2
        class="text-4xl font-bold text-gray-800 text-center pb-12 max-xl:pb-8 max-sm:pb-0"
      >
        Why Dubai?
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div
          class="responsive-iframe-wrapper relative bg-black rounded-lg my-auto"
        >
          <iframe
            id="vimeo-iframe-976895216-1570615162963"
            width="100%"
            frameborder="0"
            allowfullscreen=""
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
            class="responsive-iframe rounded-lg shadow-lg"
            data-original="//player.vimeo.com/video/541248594?color=ffffff&amp;badge=0&amp;title=1&amp;byline=1&amp;portrait=1&amp;loop=1&amp;muted=1&amp;autoplay=1&amp;autopause=false&amp;api=1"
            src="//player.vimeo.com/video/541248594?color=ffffff&amp;badge=0&amp;title=1&amp;byline=1&amp;portrait=1&amp;loop=1&amp;muted=1&amp;autoplay=1&amp;autopause=false&amp;api=1"
          ></iframe>
        </div>

        <!-- How that works section -->
        <div class="my-auto max-sm:order-first">
          <div class="flex items-center gap-3 mb-6">
            <img
              src="/src/assets/img/lupa.svg"
              alt="How it works"
              class="w-10 h-10 max-sm:w-8 max-sm:h-8"
            />
            <h3 class="text-3xl font-bold text-black !mb-0">How that works?</h3>
          </div>

          <ol class="space-y-4 text-gray-600 pl-5">
            <li>
              Miners can be purchased directly through our website. All
              available models are displayed in the
              <span @click="buyingNow"
                class="!text-orange-500 hover:cursor-pointer font-semibold"
                >Buy</span
              >
              section.
            </li>
            <li>We install it on our farm within 24 hours.</li>
            <li>
              We share the profit in the ratio of 40% to us and 60% to our
              clients. We take upon ourselves all expenses for renting premises,
              maintaining staff, paying for electricity, and maintaining miners
            </li>
          </ol>

          <div class="space-y-4 mt-8">
            <p class="text-gray-600">
              The cost of electricity in the UAE is one of the lowest in the
              world: only $0.024 per 1 kWh. Thus, we minimize our expenditures,
              due to which we get more profit.
            </p>
            <p class="text-gray-600">
              We have exclusive contracts with major miner suppliers, such as
              Bitmain. Therefore, we purchase the equipment at wholesale prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function buyingNow() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/dashboard/buy-miners");
  } else {
    router.push("/login");
  }
}

const aboutSection = ref(null);
const seen = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !seen.value) {
        seen.value = true;
        observer.unobserve(aboutSection.value);
      }
    },
    { threshold: 0.3 }
  );
  if (aboutSection.value) {
    observer.observe(aboutSection.value);
  }
});
</script>

<style scoped>
ol {
  list-style-type: decimal;
  list-style-position: outside;
}

ol li {
  margin-bottom: 1rem;
}

.about-section {
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.about-section.animate {
  opacity: 1;
  transform: translateY(0);
}

.responsive-iframe-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
