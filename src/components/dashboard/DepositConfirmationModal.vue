<template>
  <a-modal
    :open="visible"
    @update:open="$emit('update:visible', $event)"
    :title="`Confirm Deposit - ${depositData?.wallet?.coin?.name || ''}`"
    :footer="null"
    width="450px"
    centered
  >
    <div v-if="depositData" class="text-center">
      <!-- QR Code -->
      <div class="mb-6">
        <img
          :src="depositData.wallet.qr_code"
          alt="QR Code"
          class="mx-auto w-48 h-48 object-contain border border-gray-200 rounded-lg"
        />
      </div>

      <!-- Wallet Address -->
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2">Wallet Address:</p>
        <div class="flex items-center justify-center bg-gray-50 p-3 rounded-lg">
          <span class="text-sm font-mono text-gray-800 truncate mr-2 flex-1">
            {{ depositData.wallet.address }}
          </span>
          <a-button
            type="text"
            size="small"
            @click="copyAddress(depositData.wallet.address)"
            class="flex-shrink-0"
          >
            <template #icon>
              <Copy class="w-4 h-4" />
            </template>
          </a-button>
        </div>
      </div>

      <!-- Amount Display -->
      <div class="mb-6 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-gray-600 mb-2">Amount to send:</p>
        <div class="space-y-2">
          <div
            class="flex items-center justify-center bg-white p-3 rounded-lg border"
          >
            <span class="text-lg font-semibold text-green-700 mr-2">
              {{ depositData.currency.toFixed(8) }}
              {{ depositData.wallet.coin.symbol }}
            </span>
            <a-button
              type="text"
              size="small"
              @click="copyCoinAmount"
              class="flex-shrink-0"
            >
              <template #icon>
                <Copy class="w-4 h-4" />
              </template>
            </a-button>
          </div>
          <div class="text-sm text-gray-600">
            ≈ ${{ depositData.amount.toFixed(2) }} USD
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <!-- <div class="text-xs text-gray-500 mb-6">
        <p>Scan the QR code or copy the address to send your deposit</p>
      </div> -->

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <a-button
          type="default"
          size="large"
          class="flex-1"
          @click="showCancelConfirmation"
        >
          Cancel
        </a-button>
        <a-button
          type="primary"
          size="large"
          class="flex-1"
          :loading="loading"
          @click="handleConfirmPayment"
        >
          I Paid
        </a-button>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <a-modal
      :open="cancelModalVisible"
      @update:open="cancelModalVisible = $event"
      title="Cancel Deposit"
      :footer="null"
      width="400px"
      centered
    >
      <div class="text-center">
        <div class="mb-6">
          <div
            class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <AlertTriangle class="w-8 h-8 text-red-500" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Are you sure?</h3>
          <p class="text-sm text-gray-600">
            Are you sure you want to cancel the payment? If you have already
            sent the funds, they may be lost.
          </p>
        </div>

        <div class="flex gap-3">
          <a-button
            type="default"
            size="large"
            class="flex-1"
            @click="cancelModalVisible = false"
          >
            No
          </a-button>
          <a-button
            type="primary"
            danger
            size="large"
            class="flex-1"
            @click="handleCancelDeposit"
          >
            Yes, Cancel
          </a-button>
        </div>
      </div>
    </a-modal>
  </a-modal>
</template>

<script setup>
import { ref } from "vue";
import { Copy, AlertTriangle } from "lucide-vue-next";
import { message } from "ant-design-vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  depositData: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible", "confirmPayment", "cancelDeposit"]);

const cancelModalVisible = ref(false);

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

// Copy coin amount to clipboard
const copyCoinAmount = async () => {
  if (!props.depositData?.currency) return;

  try {
    const amountText = `${props.depositData.currency.toFixed(8)} ${
      props.depositData.wallet.coin.symbol
    }`;
    await navigator.clipboard.writeText(amountText);
    message.success("Coin amount copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy coin amount:", error);
    message.error("Failed to copy coin amount");
  }
};

// Show cancel confirmation modal
const showCancelConfirmation = () => {
  cancelModalVisible.value = true;
};

// Handle confirm payment
const handleConfirmPayment = () => {
  emit("confirmPayment", props.depositData);
};

// Handle cancel deposit
const handleCancelDeposit = () => {
  cancelModalVisible.value = false;
  emit("cancelDeposit");
  emit("update:visible", false);
};
</script>
