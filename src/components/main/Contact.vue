<script setup>
import { MapPinIcon, EnvelopeIcon, ClockIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="bg-blue-600 mt-17" id="contact">
    <div
      class="w-full h-25 object-cover min-h-25 flex"
      data-original="https://static.tildacdn.pro/tild3438-3062-4034-b662-346666333837/sect-wave_bottom.svg"
      aria-label=""
      role="img"
      style="
        background-image: url('https://static.tildacdn.pro/tild3438-3062-4034-b662-346666333837/sect-wave_bottom.svg');
      "
    ></div>
    <div class="container mx-auto px-5 py-16">
      <!-- Contact Title -->
      <h2 class="text-4xl !font-bold text-white text-center !mb-12">
        Contact Us
      </h2>

      <!-- Contact Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <!-- Office of Sales -->
        <div class="rounded-lg p-6 text-white border border-white/80">
          <div class="flex flex-col items-center space-x-4">
            <div class="flex-shrink rounded-full bg-blue-700 p-5">
              <MapPinIcon class="w-8 h-8" />
            </div>
            <div class="flex flex-col items-center">
              <h3 class="text-lg !font-bold mb-2 pt-3">Office of sales:</h3>
              <p class="text-sm leading-relaxed text-center">
                Bur Dubai Trade Centre2The Offices 5, One Central, Level 3,
                Dubai
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-lg p-6 text-white border border-white/80">
          <div class="flex flex-col items-center space-x-4">
            <div class="flex-shrink rounded-full bg-blue-700 p-5">
              <MapPinIcon class="w-8 h-8" />
            </div>
            <div class="flex flex-col items-center">
              <h3 class="text-lg !font-bold mb-2 pt-3">
                Address of mining farm:
              </h3>
              <p class="text-sm leading-relaxed text-center">
                Wadi Al-Ain 1, Al-Kharir Ain Al-Kharir, Wadi Al-Ain 1, 27
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-lg p-6 text-white border border-white/80">
          <div class="flex flex-col items-center space-x-4">
            <div class="flex-shrink rounded-full bg-blue-700 p-5">
              <EnvelopeIcon class="w-8 h-8" />
            </div>
            <div class="flex flex-col items-center">
              <h3 class="text-lg !font-bold mb-2 pt-3">E-mail address:</h3>
              <p class="text-sm leading-relaxed text-center">
                admin@miningbase.net
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-lg p-6 text-white border border-white/80">
          <div class="flex flex-col items-center space-x-4">
            <div class="flex-shrink rounded-full bg-blue-700 p-5">
              <ClockIcon class="w-8 h-8" />
            </div>
            <div class="flex flex-col items-center">
              <h3 class="text-lg !font-bold mb-2 pt-3">Working hours:</h3>
              <p class="text-sm leading-relaxed text-center">
                MO-FR: 10:00 - 20:00 | ST-SU: 100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
