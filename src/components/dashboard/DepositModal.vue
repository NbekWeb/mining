<template>
  <a-modal
    :open="visible"
    @update:open="$emit('update:visible', $event)"
    :title="`Deposit ${selectedWallet?.coin?.name || ''}`"
    :footer="null"
    width="400px"
    centered
  >
    <div v-if="selectedWallet" class="text-center">
      <!-- QR Code -->
      <div class="mb-6">
        <img
          :src="selectedWallet.qr_code"
          alt="QR Code"
          class="mx-auto w-48 h-48 object-contain border border-gray-200 rounded-lg"
        />
      </div>

      <!-- Wallet Address -->
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2">Wallet Address:</p>
        <div
          class="flex items-center justify-center bg-gray-50 p-3 rounded-lg"
        >
          <span class="text-sm font-mono text-gray-800 truncate mr-2 flex-1">
            {{ selectedWallet.address }} 
          </span>
          <a-button
            type="text"
            size="small"
            @click="copyAddress(selectedWallet.address)"
            class="flex-shrink-0"
          >
            <template #icon>
              <Copy class="w-4 h-4" />
            </template>
          </a-button>
        </div>
      </div>

      <!-- Instructions -->
      <div class="text-xs text-gray-500 mb-6">
        <p>Scan the QR code or copy the address to send your deposit</p>
      </div>

      <!-- Wallet Address Input -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
         Your Wallet Address
        </label>
        <a-input
          v-model:value="walletAddress"
          placeholder="Enter your wallet address"
          size="large"
          class="w-full"
        />
      </div>

      <!-- Amount Input -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Amount 
        </label>
        <a-input
          v-model:value="amount"
          type="text"
          placeholder="Enter amount"
          size="large"
          class="w-full"
        />
      </div>

      <!-- Add Deposit Button -->
      <a-button
        type="primary"
        size="large"
        class="w-full"
        :loading="loading"
        :disabled="!amountInput || parseFloat(amountInput) <= 0 || !walletAddress"
        @click="handleAddDeposit"
      >
        Add Deposit
      </a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { Copy } from "lucide-vue-next";
import { message } from "ant-design-vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  selectedWallet: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible', 'addDeposit']);

const amountInput = ref(null);
const walletAddress = ref(null);

// Computed property for amount with validation
const amount = computed({
  get() {
    return amountInput.value;
  },
  set(value) {
    if (value) {
      // Remove all non-numeric characters except decimal point
      let cleaned = value.replace(/[^0-9.]/g, '');
      
      // Ensure only one decimal point
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        cleaned = parts[0] + '.' + parts.slice(1).join('');
      }
      
      // Limit decimal places to 8 (common for crypto)
      if (parts.length === 2 && parts[1].length > 8) {
        cleaned = parts[0] + '.' + parts[1].substring(0, 8);
      }
      
      amountInput.value = cleaned;
    } else {
      amountInput.value = value;
    }
  }
});

// Reset form when modal opens
watch(() => props.visible, (newValue) => {
  if (newValue) {
    amountInput.value = null;
    walletAddress.value = null;
  }
});

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



// Handle add deposit
const handleAddDeposit = () => {
  if (
    !props.selectedWallet ||
    !amountInput.value ||
    amountInput.value <= 0 ||
    !walletAddress.value
  )
    return;

  const depositData = {
    coin: props.selectedWallet.coin.id,
    wallet_address: walletAddress.value,
    amount: parseFloat(amountInput.value),
  };

  emit('addDeposit', depositData);
};
</script> 