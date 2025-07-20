<template>
  <div class="h-screen w-full grid grid-cols-2 max-lg:grid-cols-1">
    <div
      class="h-full px-4 w-full main-liner flex flex-col items-center gap-3 justify-center max-lg:max-h-max max-lg:py-5"
    >
      <span class="text-3xl max-sm:text-2xl text-white !font-bold"
        >Password Assistance</span
      >
      <p class="text-white/80 text-center text-base leading-5 pt-3">
        Forgot your password? No worries. Enter the email
        <br class="max-lg:hidden" />
        address you used during registration and we’ll send you a
        <br class="max-lg:hidden" />
        link to reset it.
      </p>
    </div>

    <!-- Right side - Login -->
    <div
      class="h-full w-full bg-white flex flex-col items-center justify-center px-12"
    >
      <img
        src="https://static.tildacdn.pro/tild3436-3538-4461-a530-303938666331/image.png"
        class="object-contain h-20 mb-2"
      />

      <h1 class="text-2xl !font-bold text-gray-800 !mb-8 !mt-10 max-sm:!my-5">
        Password Reset
      </h1>
      <p class="text-black/70 leading-5 font-medium text-base text-center">
        To reset your password, enter the email address that
        <br class="max-sm:hidden" />
        you’ve used to sign up
      </p>

      <!-- Ant Design Form -->
      <a-form
        :model="formState"
        :rules="rules"
        ref="loginFormRef"
        @finish="handleLogin"
        layout="vertical"
        class="w-full max-w-sm"
      >
        <!-- Email -->
        <a-form-item label="Email" name="email">
          <a-input
            v-model:value="formState.email"
            placeholder="Enter your email"
          />
        </a-form-item>

        <!-- Button -->
        <a-form-item>
          <a-button type="primary" html-type="submit" block class="!h-10">
            <span class="text-base !font-bold"> Log in </span>
          </a-button>
          <div class="flex items-center justify-between text-orange-500 mt-2">
            <router-link
              to="/login"
              class="duration-300 transition-all hover:text-orange-600 !font-semibold"
              >Log in</router-link
            >
            <router-link
              to="/register"
              class="duration-300 transition-all hover:text-orange-600 !font-semibold"
              >Create  account</router-link
            >
          </div>
        </a-form-item>

      
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import useAuth from "../../stores/auth.pinia";
const authStore = useAuth();

const loginFormRef = ref();

const formState = reactive({
  email: "",
});

const rules = {
  email: [
    { required: true, message: "Please enter your email", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email",
      trigger: ["blur", "change"],
    },
  ],
};

const handleLogin = () => {
  authStore.forgotPassword(formState, () => {
    message.success("Password reset link sent to your email!");
  });
};
</script>

<style>
.main-liner {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}
</style>
