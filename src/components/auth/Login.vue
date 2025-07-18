<template>
  <div class="h-screen w-full grid grid-cols-2 max-lg:grid-cols-1">
    <div
      class="h-full px-4 w-full main-liner flex flex-col items-center gap-3 justify-center max-lg:max-h-max max-lg:py-5"
    >
      <span class="text-3xl max-sm:text-2xl text-white !font-bold"
        >Welcome Back</span
      >
      <p class="text-white/80 text-center text-base leading-5 pt-3">
        Access your account and continue your journey with us.
        <br class="max-lg:hidden" />
        We’re glad to see you again!
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
        Log In To Your Account
      </h1>

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

        <!-- Password -->
        <a-form-item label="Password" name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="Enter your password"
          />
        </a-form-item>

        <!-- Button -->
        <a-form-item>
          <a-button type="primary" html-type="submit" block class="!h-10">
            <span class="text-base !font-bold"> Log in </span>
          </a-button>
        </a-form-item>

        <!-- Links -->
        <div class="text-center text-orange-500">
          <router-link
            to="/pass"
            class="font-medium hover:!text-orange-600 transition-all duration-300"
            >Forgot password?</router-link
          >
        </div>
        <div class="text-center text-sm text-gray-600 mt-2">
          Don't have an account?
          <span class="text-orange-500">
            <router-link
              to="/register"
              class="duration-300 transition-all hover:text-orange-600 !font-semibold"
              >Create an account</router-link
            >
          </span>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import useAuth from "../../stores/auth.pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuth();
const loginFormRef = ref();

const formState = reactive({
  email: "",
  password: "",
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
  password: [
    { required: true, message: "Please enter your password", trigger: "blur" },
    {
      min: 6,
      message: "Password must be at least 6 characters",
      trigger: "blur",
    },
  ],
};

const handleLogin = () => {
  authStore.postLogin({...formState}, () => {
    message.success("Logged in successfully!");
    router.push("/dashboard");
  });
};
</script>

<style>
.main-liner {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}
</style>
