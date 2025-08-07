<template>
  <div class="w-full bg-white rounded-lg shadow p-6">
    <div class="flex items-center gap-3 mb-6">
      <CpuIcon class="w-6 h-6 text-blue-500" />
      <h3 class="text-lg font-semibold text-gray-900 !mb-0">MINERS</h3>
    </div>

    <!-- Empty State -->
    <div
      v-if="!user_minings || user_minings.length === 0"
      class="text-center py-8"
    >
      <div
        class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CpuIcon class="w-8 h-8 text-gray-400" />
      </div>
      <h4 class="text-lg font-medium text-gray-900 mb-2">No miners found</h4>
      <p class="text-gray-600 mb-6">
        You haven't purchased any miners yet. Start mining to earn profits!
      </p>
      <router-link
        to="/dashboard/buy-miners"
        class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <CpuIcon class="w-4 h-4 mr-2" />
        Buy Miners
      </router-link>
    </div>

    <!-- Miner Items -->
    <div
      v-else
      class="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5"
    >
      <template
        v-for="group in groupedMiners"
        :key="`${group.productId}-${group.isActive}-${
          group.deliveryType || 'no-type'
        }-${group.deliveryD || 'no-delivery'}`"
      >
        <a-popover
          v-if="!group.isActive"
          placement="bottom"
          :trigger="isMobile ? 'click' : 'hover'"
          :overlay-style="{ maxWidth: '300px' }"
        >
          <template #content>
            <div class="p-2">
              <div class="flex items-start gap-2">
                <div
                  class="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"
                ></div>
                <div>
                  <p class="font-medium mb-1 text-gray-800">
                    Delivery Period
                  </p>
                  <p class="text-gray-600 text-xs">Your miner will be delivered and installed within 
                    {{ group.deliveryD === "24h" ? "24 hours" : `${group.deliveryD} day${group.deliveryD === 1 ? '' : 's'}` }}
                  </p>
                </div>
              </div>
            </div>
          </template>
          <div
            :class="[
              'flex items-center justify-between p-4 border border-gray-200 rounded-lg relative transition-all duration-200 hover:shadow-md cursor-pointer',
            ]"
          >
            <div class="flex items-center gap-4">
              <img
                :src="group.product?.image"
                alt="miner"
                class="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 class="font-semibold text-gray-900">
                  {{ group.product?.name }} {{ group.id }}
                </h4>
                <div class="text-sm text-gray-600">
                  <span>Price: $ {{ Math.round(group.product?.price) }}</span>
                  <span class="mx-2">•</span>
                  <span
                    >Profit: ${{
                      Number(group.product?.per_day).toFixed(1)
                    }}/day (${{
                      Number(group.product?.per_month).toFixed(1)
                    }}/month)</span
                  >
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  Status: {{ group.isActive ? "Active" : "Inactive" }}
                </div>
              </div>
            </div>
            <div
              class="bg-yellow-500 text-white absolute top-2 right-2 max-sm:w-6 max-sm:h-6 max-sm:text-xs rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold transition-colors hover:bg-yellow-600"
            >
              x{{ group.count }}
            </div>
          </div>
        </a-popover>

        <!-- Active miners (no popover) -->
        <div
          v-else
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg relative transition-all duration-200"
        >
          <div class="flex items-center gap-4">
            <img
              :src="group.product?.image"
              alt="miner"
              class="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 class="font-semibold text-gray-900">
                {{ group.product?.name }}
              </h4>
              <div class="text-sm text-gray-600">
                <span>Price: $ {{ Math.round(group.product?.price) }}</span>
                <span class="mx-2">•</span>
                <span
                  >Profit: ${{ Number(group.product?.per_day).toFixed(1) }}/day
                  (${{
                    Number(group.product?.per_month).toFixed(1)
                  }}/month)</span
                >
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Status: {{ group.isActive ? "Active" : "Inactive" }}
              </div>
            </div>
          </div>
          <div
            class="bg-blue-500 text-white absolute top-2 right-2 max-sm:w-6 max-sm:h-6 max-sm:text-xs rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold transition-colors hover:bg-blue-600"
          >
            x{{ group.count }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { CpuIcon } from "lucide-vue-next";
import useMiners from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";
import { computed, ref, onMounted, onUnmounted } from "vue";

const minersStore = useMiners();
const { user_minings } = storeToRefs(minersStore);

// Mobile detection
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// Group miners by product.id, is_active, and delivery_d (for inactive miners)
const groupedMiners = computed(() => {
  if (!user_minings.value) return [];

  const groups = {};

  user_minings.value.forEach((miner) => {
    // For active miners, group by product.id only
    if (miner.is_active) {
      const key = `${miner.product?.id}-${miner.is_active}`;

      if (!groups[key]) {
        groups[key] = {
          productId: miner.product?.id,
          isActive: miner.is_active,
          product: miner.product,
          deliveryD: null, // Active miners don't need delivery_d
          count: 0,
        };
      }
      groups[key].count++;
    } else {
      // For inactive miners, group by product.id, delivery_type, and delivery_d
      const deliveryType = miner.delivery_type;
      const deliveryD = deliveryType === "in_stock" ? "24h" : (miner.delivery_d || 0);
      const key = `${miner.product?.id}-${miner.is_active}-${deliveryType}-${deliveryD}`;

      if (!groups[key]) {
        groups[key] = {
          productId: miner.product?.id,
          isActive: miner.is_active,
          product: miner.product,
          deliveryD: deliveryD,
          deliveryType: deliveryType,
          count: 0,

        };
      }
      groups[key].count++;
    }
  });

  return Object.values(groups);
});

// You can add props here if you want to make the miners data dynamic
// const props = defineProps({
//   miners: {
//     type: Array,
//     default: () => []
//   }
// });
</script>
