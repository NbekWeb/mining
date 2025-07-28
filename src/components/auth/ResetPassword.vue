<template>
  <div class="h-screen w-full grid grid-cols-2 max-lg:grid-cols-1">
    <div
      class="h-full px-4 w-full main-liner flex flex-col items-center gap-3 justify-center max-lg:max-h-max max-lg:py-5"
    >
      <span class="text-3xl max-sm:text-2xl text-white !font-bold"
        >Reset Your Password</span
      >
      <p class="text-white/80 text-center text-base leading-5 pt-3">
        Enter your new password below to complete
        <br class="max-lg:hidden" />
        the password reset process.
      </p>
    </div>

    <!-- Right side - Reset Password -->
    <div
      class="h-full w-full bg-white flex flex-col items-center justify-center px-12"
    >
      <img
        src="https://static.tildacdn.pro/tild3436-3538-4461-a530-303938666331/image.png"
        class="object-contain h-20 mb-2"
      />

      <h1 class="text-2xl !font-bold text-gray-800 !mb-8 !mt-10 max-sm:!my-5">
        Set New Password
      </h1>
      <p class="text-black/70 leading-5 font-medium text-base text-center">
        Please enter your new password below
      </p>

      <!-- Ant Design Form -->
      <a-form
        :model="formState"
        :rules="rules"
        ref="resetFormRef"
        @finish="handleReset"
        layout="vertical"
        class="w-full max-w-sm"
      >
        <!-- New Password -->
        <a-form-item label="New Password" name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="Enter your new password"
          />
        </a-form-item>

        <!-- Confirm Password -->
        <a-form-item label="Confirm Password" name="confirm_password">
          <a-input-password
            v-model:value="formState.confirm_password"
            placeholder="Confirm your new password"
          />
        </a-form-item>

        <!-- Button -->
        <a-form-item>
          <a-button type="primary" html-type="submit" block class="!h-10">
            <span class="text-base !font-bold">Reset Password</span>
          </a-button>
          <div class="flex items-center justify-center text-orange-500 mt-2">
            <router-link
              to="/login"
              class="duration-300 transition-all hover:text-orange-600 !font-semibold"
              >Back to Login</router-link
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import useAuth from "../../stores/auth.pinia";

const authStore = useAuth();
const route = useRoute();
const router = useRouter();
const resetFormRef = ref();

const formState = reactive({
  password: "",
  confirm_password: "",
  uidb64: "",
  token: "",
});

const validateConfirmPassword = (rule, value) => {
  if (value !== formState.password) {
    return Promise.reject("Passwords do not match!");
  }
  return Promise.resolve();
};

const rules = {
  password: [
    { required: true, message: "Please enter your new password", trigger: "blur" },
    { min: 8, message: "Password must be at least 8 characters", trigger: "blur" },
  ],
  confirm_password: [
    { required: true, message: "Please confirm your password", trigger: "blur" },
    { validator: validateConfirmPassword, trigger: "blur" },
  ],
};

const handleReset = () => {
  const resetData = {
    uidb64: formState.uidb64,
    token: formState.token,
    password: formState.password,
    confirm_password: formState.confirm_password,
  };

  authStore.resetPassword(resetData, () => {
    message.success("Password reset successfully! Please login with your new password.");
    router.push("/login");
  },()=>{
    router.push("/login");
  });
};

onMounted(() => {
  // Extract uidb64 and token from route parameters
  formState.uidb64 = route.params.uidb64;
  formState.token = route.params.token;
  console.log(formState.uidb64, formState.token);
});
</script>

<style>
.main-liner {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}
</style> 