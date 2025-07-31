<template>
  <div class="h-screen w-full grid grid-cols-2 max-lg:grid-cols-1">
    <div
      class="h-full px-4 w-full main-liner flex flex-col items-center gap-3 justify-center max-lg:max-h-max max-lg:py-5"
    >
      <span class="text-3xl max-sm:text-2xl text-white !font-bold text-center"
        >Welcome to Our <br class="max-sm:hidden" />
        Platform</span
      >
      <p class="text-white/80 text-center text-base leading-5 pt-3">
        Join thousands of satisfied users who are already

        <br class="max-sm:hidden" />
        benefiting from our services. Create your account today <br />
        and unlock exclusive features.
      </p>
    </div>

    <!-- Right side - Login -->
    <div
      class="h-full w-full bg-white flex flex-col items-center justify-center px-12"
    >
      <logo class="text-5xl mt-5" />

      <!-- Registration Form -->
      <div v-if="!showVerification">
        <h1 class="text-2xl !font-bold text-gray-800 !mb-8 !mt-10 max-sm:!my-5">
          Create Your Account
        </h1>

        <!-- Ant Design Form -->
        <a-form
          :model="formState"
          :rules="rules"
          ref="loginFormRef"
          @finish="handleLogin"
          layout="vertical"
          class="w-full max-w-sm  sm:min-w-sm max-sm:min-w-75"
        >
          <a-form-item label="First Name" name="first_name">
            <a-input
              v-model:value="formState.first_name"
              placeholder="Enter your first name"
            />
          </a-form-item>
          <a-form-item label="Last Name" name="last_name">
            <a-input
              v-model:value="formState.last_name"
              placeholder="Enter your last name"
            />
          </a-form-item>
          <a-form-item label="Email" name="email">
            <a-input
              v-model:value="formState.email"
              placeholder="Enter your email"
            />
          </a-form-item>
          <!-- Password -->
          <a-form-item label="Password" name="password">
            <a-input-password
              v-model:value="formState.password"
              placeholder="Enter your password"
            />
          </a-form-item>
          <a-form-item label="Confirm Password" name="confirm_password">
            <a-input-password
              v-model:value="formState.confirm_password"
              placeholder="Confirm your password"
            />
          </a-form-item>

          <!-- Button -->
          <a-form-item>
            <a-button type="primary" html-type="submit" block class="!h-10" :loading="loadingUrl.has('register')">
              Create account
            </a-button>
          </a-form-item>

          <!-- Links -->
          <div class="text-center text-sm text-gray-600 mt-2 pb-3">
            Already a member?
            <span class="text-orange-500">
              <router-link
                to="/login"
                class="duration-300 transition-all hover:text-orange-600 !font-semibold"
                >Log in</router-link
              >
            </span>
          </div>
        </a-form>
      </div>

      <!-- Verification Form -->
      <div v-else>
        <h1 class="text-2xl !font-bold text-gray-800 !mb-8 !mt-10 max-sm:!my-5 text-center">
          Verify Your Email
        </h1>
        
        <p class="text-gray-600 text-center mb-6">
          We've sent a 4-digit verification code to <br>
          <strong>{{ formState.email }}</strong>
        </p>

        <a-form
          :model="verificationForm"
          :rules="verificationRules"
          ref="verificationFormRef"
          @finish="handleVerification"
          layout="vertical"
          class="w-full max-w-sm "
        >
          <a-form-item label="Verification Code" name="code">
            <div class="flex gap-3 justify-center">
              <a-input
                v-for="(digit, index) in verificationForm.code"
                :key="index"
                v-model:value="verificationForm.code[index]"
                :placeholder="(index + 1).toString()"
                maxlength="1"
                inputmode="numeric"
                class="w-12 h-12 text-center text-xl font-bold"
                @input="handleCodeInput(index, $event)"
                @keydown="handleKeydown(index, $event)"
                ref="codeInputs"
              />
            </div>
          </a-form-item>

          <!-- Button -->
          <a-form-item>
            <a-button type="primary" html-type="submit" block class="!h-10">
              <span class="text-base !font-bold"> Verify Email </span>
            </a-button>
          </a-form-item>

          <!-- Resend Code -->
          <div class="text-center text-sm text-gray-600 mt-2">
            Didn't receive the code?
            <a @click="resendCode" class="text-orange-500 cursor-pointer hover:text-orange-600 !font-semibold">
              Resend
            </a>
          </div>

          <!-- Back to Registration -->
          <div class="text-center text-sm text-gray-600 mt-2 pb-3">
            <a @click="showVerification = false" class="text-gray-500 cursor-pointer hover:text-gray-700">
              ← Back to registration
            </a>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import { message } from "ant-design-vue";
import useAuth from "../../stores/auth.pinia";
import useCore from "../../stores/core.pinia";
import { useRouter, useRoute } from "vue-router";
import logo from "../logo.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const authStore = useAuth();
const coreStore = useCore();
const {loadingUrl} = storeToRefs(coreStore);
const loginFormRef = ref();
const verificationFormRef = ref();
const codeInputs = ref([]);
const showVerification = ref(false);

const formState = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  referral_code: "",
});

const verificationForm = reactive({
  code: ["", "", "", ""],
});

onMounted(() => {
  // Set referral_code from ?ref= query param if present
  formState.referral_code = route.query.ref ? String(route.query.ref) : "";
});

const rules = {
  first_name: [
    {
      required: true,
      message: "Please enter your first name",
      trigger: "blur",
    },
  ],
  last_name: [
    { required: true, message: "Please enter your last name", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please enter your email", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "Please enter your password", trigger: "blur" },
    {
      min: 6,
      message: "Password must be at least 6 characters",
      trigger: "blur",
    },
  ],
  confirm_password: [
    {
      required: true,
      message: "Please confirm your password",
      trigger: "blur",
    },
    {
      validator: (rule, value) => {
        if (value !== formState.password) {
          return Promise.reject("Passwords do not match");
        }
        return Promise.resolve();
      },
      trigger: "blur",
    },
  ],
};

const verificationRules = {
  code: [
    { 
      required: true, 
      message: "Please enter verification code", 
      trigger: "submit",
      validator: (rule, value) => {
        if (!verificationForm.code.every(digit => digit !== "")) {
          return Promise.reject("Please enter all 4 digits");
        }
        return Promise.resolve();
      }
    },
  ],
};

const handleLogin = () => {
  authStore.postRegis({ ...formState }, () => {
    message.success("Registration successful! Please check your email for verification code.");
    showVerification.value = true;
  });
};

const handleCodeInput = (index, event) => {
  const value = event.target.value;
  
  // Only allow digits
  if (!/^\d*$/.test(value)) {
    verificationForm.code[index] = "";
    return;
  }
  
  // Move to next input if current is filled
  if (value && index < 3) {
    nextTick(() => {
      codeInputs.value[index + 1]?.focus();
    });
  }
  
  // Auto submit if all 4 digits are entered
  if (verificationForm.code.every(digit => digit !== "")) {
    nextTick(() => {
      handleVerification();
    });
  }
};

const handleKeydown = (index, event) => {
  // Handle backspace to go to previous input
  if (event.key === "Backspace" && !verificationForm.code[index] && index > 0) {
    nextTick(() => {
      codeInputs.value[index - 1]?.focus();
    });
  }
};

const handleVerification = () => {
  const code = verificationForm.code.join("");
  authStore.verifyEmail({ 
    email: formState.email, 
    code: code 
  }, () => {
    message.success("Email verified successfully!");
    router.push("/dashboard");
  });
};

const resendCode = () => {
  authStore.resendVerificationCode({ 
    email: formState.email 
  }, () => {
    message.success("Verification code resent to your email!");
  });
};
</script>

<style>
.main-liner {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}
</style>
