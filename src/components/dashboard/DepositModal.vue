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
      <!-- Amount Input (USD) -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Amount (USD)
        </label>
        <a-input
          v-model:value="amount"
          type="text"
          placeholder="Enter amount in USD"
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
        :disabled="!amountInput || parseFloat(amountInput) <= 0 || !exchangeRate"
        @click="handleAddDeposit"
      >
        Add Deposit
      </a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
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

const emit = defineEmits(['update:visible', 'addDeposit', 'showConfirmation']);

const amountInput = ref(null);
const exchangeRate = ref(null);
const lastUpdated = ref(null);

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
      
      // Limit decimal places to 2 (for USD)
      if (parts.length === 2 && parts[1].length > 2) {
        cleaned = parts[0] + '.' + parts[1].substring(0, 2);
      }
      
      amountInput.value = cleaned;
    } else {
      amountInput.value = value;
    }
  }
});

// Fetch exchange rate from Binance API (USD rates)
const fetchExchangeRate = async () => {
  if (!props.selectedWallet?.coin?.symbol) return;
  
  try {
    const baseSymbol = props.selectedWallet.coin.symbol.toUpperCase();
    
    // Map common symbols to Binance trading pairs
    const symbolMap = {
      'BTC': 'BTCUSDT',
      'ETH': 'ETHUSDT',
      'USDT': 'USDTUSDT',
      'USDC': 'USDCUSDT',
      'BNB': 'BNBUSDT',
      'ADA': 'ADAUSDT',
      'SOL': 'SOLUSDT',
      'DOT': 'DOTUSDT',
      'DOGE': 'DOGEUSDT',
      'AVAX': 'AVAXUSDT',
      'MATIC': 'MATICUSDT',
      'LINK': 'LINKUSDT',
      'UNI': 'UNIUSDT',
      'LTC': 'LTCUSDT',
      'BCH': 'BCHUSDT',
      'XRP': 'XRPUSDT',
      'TRX': 'TRXUSDT',
      'ETC': 'ETCUSDT',
      'FIL': 'FILUSDT',
      'ATOM': 'ATOMUSDT'
    };
    
    const tradingPair = symbolMap[baseSymbol] || `${baseSymbol}USDT`;
    
    // Use Binance API to get current price
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${tradingPair}`);
    const data = await response.json();
    
    if (data.price) {
      exchangeRate.value = parseFloat(data.price);
      lastUpdated.value = Date.now();
    } else {
      message.error('Could not fetch USD rate for this coin');
    }
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    message.error('Failed to fetch current exchange rate');
  }
};

// Reset form when modal opens
watch(() => props.visible, (newValue) => {
  if (newValue) {
    amountInput.value = null;
    fetchExchangeRate();
  }
});

// Watch for selectedWallet changes to fetch new exchange rate
watch(() => props.selectedWallet, (newWallet) => {
  if (newWallet && props.visible) {
    fetchExchangeRate();
  }
});

// Handle add deposit
const handleAddDeposit = () => {
  if (
    !props.selectedWallet ||
    !amountInput.value ||
    amountInput.value <= 0 
  )
    return;

  const baseAmount = parseFloat(amountInput.value);
  let adjustedAmount;
  
  if (baseAmount < 100) {
    // If amount is less than 100: reduce by 1-5%
    const randomPercentage = Math.random() * 4 + 1; // 1 to 5
    const reductionMultiplier = 1 - (randomPercentage / 100);
    adjustedAmount = baseAmount * reductionMultiplier;
  } else {
    // If amount is 100 or more: reduce by 1-15 (fixed values)
    const randomReduction = Math.random() * 4 + 1; // 1 to 15
    adjustedAmount = baseAmount - randomReduction;
  }

  const depositData = {
    coin: props.selectedWallet.coin.id,
    amount: parseFloat(amountInput.value),
    currency: exchangeRate.value ? adjustedAmount / exchangeRate.value : 0,
    wallet: props.selectedWallet,
    exchangeRate: exchangeRate.value
  };

  // Close current modal and show confirmation modal
  emit('update:visible', false);
  emit('showConfirmation', depositData);
};
</script> 