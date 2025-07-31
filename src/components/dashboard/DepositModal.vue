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

      <!-- Exchange Rate Display -->
      <div class="mb-4 p-3 bg-blue-50 rounded-lg">
        <p class="text-sm text-gray-600">
          Current Rate: 1 USD = {{ exchangeRate ? (1 / exchangeRate).toFixed(8) : '...' }} {{ selectedWallet?.coin?.symbol }}
        </p>
        <p class="text-xs text-gray-500 mt-1">
          Rate updated: {{ lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '...' }}
        </p>
      </div>

      <!-- Amount Input (USD) -->
      <div class="mb-4">
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

      <!-- Coin Amount Display -->
      <div v-if="exchangeRate" class="mb-6 p-3 bg-green-50 rounded-lg">
        <p class="text-sm text-gray-600 mb-2">You need to send:</p>
        <div class="flex items-center justify-center bg-white p-3 rounded-lg border">
          <span class="text-lg font-semibold text-green-700 mr-2">
            {{ coinAmount.toFixed(8) }} {{ selectedWallet?.coin?.symbol }}
          </span>
          <a-button
            type="text"
            size="small"
            @click="copyCoinAmount"
            class="flex-shrink-0"
            :disabled="!coinAmount || coinAmount === 0"
          >
            <template #icon>
              <Copy class="w-4 h-4" />
            </template>
          </a-button>
        </div>
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

const emit = defineEmits(['update:visible', 'addDeposit']);

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

// Computed property for coin amount
const coinAmount = computed(() => {
  if (!amountInput.value || !exchangeRate.value) return 0;
  return parseFloat(amountInput.value) / exchangeRate.value;
});

// Fetch exchange rate from CoinGecko API (USD rates)
const fetchExchangeRate = async () => {
  if (!props.selectedWallet?.coin?.symbol) return;
  
  try {
    const baseSymbol = props.selectedWallet.coin.symbol.toLowerCase();
    
    // Map common symbols to CoinGecko IDs
    const symbolMap = {
      'btc': 'bitcoin',
      'eth': 'ethereum',
      'usdt': 'tether',
      'usdc': 'usd-coin',
      'bnb': 'binancecoin',
      'ada': 'cardano',
      'sol': 'solana',
      'dot': 'polkadot',
      'doge': 'dogecoin',
      'avax': 'avalanche-2',
      'matic': 'matic-network',
      'link': 'chainlink',
      'uni': 'uniswap',
      'ltc': 'litecoin',
      'bch': 'bitcoin-cash',
      'xrp': 'ripple',
      'trx': 'tron',
      'etc': 'ethereum-classic',
      'fil': 'filecoin',
      'atom': 'cosmos'
    };
    
    const coinId = symbolMap[baseSymbol] || baseSymbol;
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
    const data = await response.json();
    
    if (data[coinId] && data[coinId].usd) {
      exchangeRate.value = parseFloat(data[coinId].usd);
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
  if (!coinAmount.value) return;
  
  try {
    const amountText = `${coinAmount.value.toFixed(8)} ${props.selectedWallet?.coin?.symbol}`;
    await navigator.clipboard.writeText(amountText);
    message.success("Coin amount copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy coin amount:", error);
    message.error("Failed to copy coin amount");
  }
};

// Handle add deposit
const handleAddDeposit = () => {
  if (
    !props.selectedWallet ||
    !amountInput.value ||
    amountInput.value <= 0 ||
    !exchangeRate.value
  )
    return;

  const depositData = {
    coin: props.selectedWallet.coin.id,
    amount: parseFloat(amountInput.value),
    currency: coinAmount.value,
  };

  emit('addDeposit', depositData);
};
</script> 