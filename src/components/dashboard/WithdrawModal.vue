<template>
  <a-modal
    :open="visible"
    @update:open="$emit('update:visible', $event)"
    title="Select cryptocurrency for withdrawal"
    :footer="null"
    width="600px"
    :mask-closable="false"
  >
    <a-form
      :model="withdrawForm"
      :rules="rules"
      ref="withdrawFormRef"
      layout="vertical"
      @finish="handleWithdraw"
    >
      <!-- Cryptocurrency Selection -->
      <a-form-item label="Select Cryptocurrency" name="coin">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div
            v-for="crypto in coins"
            :key="crypto.id"
            class="border rounded-lg p-3 cursor-pointer transition-all"
            :class="
              selectedCoin === crypto.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            "
            @click="selectCoin(crypto.id)"
          >
            <a-radio
              :checked="selectedCoin === crypto.id"
              @change="() => selectCoin(crypto.id)"
            >
              <div class="flex items-center gap-2">
                <img
                  :src="crypto.image"
                  :alt="crypto.name"
                  class="w-6 h-6 object-contain"
                />
                <span>{{ crypto.name }}</span>
              </div>
            </a-radio>
          </div>
        </div>
      </a-form-item>

      <!-- Wallet Address -->
      <a-form-item label="Wallet Address" name="walletAddress">
        <a-input
          v-model:value="withdrawForm.walletAddress"
          placeholder="Enter your wallet address"
          size="large"
        />
      </a-form-item>

      <!-- Amount -->
      <a-form-item label="Amount" name="amount">
        <a-input
          v-model:value="amount"
          type="text"
          placeholder="Enter amount"
          size="large"
          class="w-full"
          :maxlength="20"
          addon-before="$"
        />
      </a-form-item>

      <!-- Submit Button -->
      <div class="flex justify-end gap-3 mt-6">
        <a-button @click="$emit('update:visible', false)"> Cancel </a-button>
        <a-button
          type="primary"
          html-type="submit"
          :loading="submitting"
          class="bg-blue-500 hover:bg-blue-600"
        >
          Withdraw
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { message } from "ant-design-vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  coins: {
    type: Array,
    required: true,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible', 'withdraw']);

const withdrawFormRef = ref();

// Form data
const withdrawForm = reactive({
  coin: "",
  walletAddress: "",
  amount: computed(() => amountInput.value),
});

// Coin selection
const selectedCoin = ref("");
const amountInput = ref(null);

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

// Form validation rules
const rules = {
  coin: [{ required: true, message: "Please select a cryptocurrency" }],
  walletAddress: [
    { required: true, message: "Please enter wallet address" },
    { min: 10, message: "Wallet address is too short" },
  ],
  amount: [
    { required: true, message: "Please enter amount" },
    {
      validator: (rule, value) => {
        if (!value || value < 5) {
          return Promise.reject('Amount must be at least $5');
        }
        return Promise.resolve();
      }
    },
  ],
};

// Reset form when modal opens
watch(() => props.visible, (newValue) => {
  if (newValue) {
    withdrawForm.coin = "";
    withdrawForm.walletAddress = "";
    selectedCoin.value = "";
    amountInput.value = null;
  }
});

// Methods
const selectCoin = (coin) => {
  selectedCoin.value = coin;
  withdrawForm.coin = coin;
};

const handleWithdraw = async (values) => {
  // Use the validated amount from the computed property
  const withdrawData = {
    ...values,
    amount: parseFloat(amountInput.value)
  };
  emit('withdraw', withdrawData);
};
</script>

<style scoped>
:deep(.ant-form-item-label > label) {
  font-weight: 600 !important;
  color: #374151 !important;
}
</style> 