<template>
  <div class="w-full bg-white rounded-lg shadow p-6">
    <div class="flex items-center gap-3 mb-6">
      <CpuIcon class="w-6 h-6 text-blue-500" />
      <h3 class="text-lg font-semibold text-gray-900 !mb-0">MINERS</h3>
    </div>

    <!-- Empty State -->
    <div v-if="!user_minings || user_minings.length === 0" class="text-center py-8">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CpuIcon class="w-8 h-8 text-gray-400" />
      </div>
      <h4 class="text-lg font-medium text-gray-900 mb-2">No miners found</h4>
      <p class="text-gray-600 mb-6">You haven't purchased any miners yet. Start mining to earn profits!</p>
      <router-link 
        to="/dashboard/buy-miners" 
        class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <CpuIcon class="w-4 h-4 mr-2" />
        Buy Miners
      </router-link>
    </div>

    <!-- Miner Items -->
    <div v-else class="space-y-4">
      <template v-for="miner in user_minings" :key="miner">
        <div
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg relative"
        >
          <div class="flex items-center gap-4">
            <!-- <div
              class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
            >
              <CpuIcon class="w-8 h-8 text-gray-600" />
            </div> -->
            <img :src="miner.image" alt="miner" class="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h4 class="font-semibold text-gray-900">{{ miner.name }}</h4>
              <div class="text-sm text-gray-600">
                <span>Price: $ {{ Math.round(miner.price) }}</span>
                <span class="mx-2">•</span>
                <span
                  >Profit: ${{ Number(miner.per_day).toFixed(1) }}/day (${{ Number(miner.per_month).toFixed(1) }}/month)</span
                >
              </div>
            </div>
          </div>
          <div
            class="bg-blue-500 text-white absolute top-2 right-2 max-sm:w-6 max-sm:h-6 max-sm:text-xs rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold"
          >
            x1
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

const minersStore = useMiners();
const { user_minings } = storeToRefs(minersStore);

// You can add props here if you want to make the miners data dynamic
// const props = defineProps({
//   miners: {
//     type: Array,
//     default: () => []
//   }
// });
</script>
