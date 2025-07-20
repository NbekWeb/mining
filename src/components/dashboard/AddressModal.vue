<template>
  <a-modal
    :open="visible"
    @update:open="$emit('update:visible', $event)"
    title="Wallet Address"
    :footer="null"
    width="400px"
    centered
  >
    <div v-if="selectedDeposit" class="text-center">
      <!-- Wallet Address -->
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2">Wallet Address:</p>
        <div
          class="flex items-center justify-center bg-gray-50 p-3 rounded-lg"
        >
          <span class="text-sm font-mono text-gray-800 truncate mr-2 flex-1">
            {{ selectedDeposit.wallet_address }}
          </span>
          <a-button
            type="text"
            size="small"
            @click="copyAddress(selectedDeposit.wallet_address)"
            class="flex-shrink-0"
          >
            <template #icon>
              <Copy class="w-4 h-4" />
            </template>
          </a-button>
        </div>
      </div>

      <!-- Instructions -->
      <div class="text-xs text-gray-500">
        <p>Scan the QR code or copy the address to send your deposit</p>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { Copy } from "lucide-vue-next";
import { message } from "ant-design-vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  selectedDeposit: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['update:visible']);

// Copy wallet address to clipboard
const copyAddress = async (address) => {
  try {
    await navigator.clipboard.writeText(address);
    message.success("Address copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy address:", error);
    message.error("Failed to copy address");
  }
};
</script> 