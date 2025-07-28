<template>
  <a-modal
    v-model:open="visible"
    title="EDIT PROFILE"
    :footer="null"
    width="500px"
    centered
    @cancel="handleCancel"
  >
    <div class="p-6">
      <a-form
        :model="formData"
        :rules="rules"
        layout="vertical"
        @finish="handleSubmit"
        ref="formRef"
      >
        <!-- Avatar Upload -->
        <div class="flex justify-center mb-6">
          <div class="text-center">
            <a-upload
              v-model:file-list="fileList"
              :before-upload="beforeUpload"
              :show-upload-list="false"
              accept="image/*"
            >
              <div class="relative">
                <a-avatar
                  :size="80"
                  :src="avatarPreview || user.avatar"
                  :style="{ backgroundColor: '#1890ff' }"
                >
                  {{ userInitials }}
                </a-avatar>
                <div
                  class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full max-sm:opacity-60 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <CameraIcon class="w-6 h-6 text-white" />
                </div>
              </div>
            </a-upload>
            <p class="text-sm text-gray-500 mt-2">Click to change avatar</p>
          </div>
        </div>

        <!-- First Name -->
        <a-form-item label="First Name" name="first_name">
          <a-input
            v-model:value="formData.first_name"
            placeholder="Enter your first name"
            size="large"
          />
        </a-form-item>

        <!-- Last Name -->
        <a-form-item label="Last Name" name="last_name">
          <a-input
            v-model:value="formData.last_name"
            placeholder="Enter your last name"
            size="large"
          />
        </a-form-item>

        <!-- Email -->
        <a-form-item label="Email" name="email">
          <a-input
            v-model:value="formData.email"
            placeholder="Enter your email"
            size="large"
            type="email"
          />
        </a-form-item>

        <!-- Submit Button -->
        <div class="flex justify-end gap-3 mt-6">
          <a-button @click="handleCancel" size="large"> Cancel </a-button>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
          >
            Save Changes
          </a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { CameraIcon } from "lucide-vue-next";
import { message } from "ant-design-vue";
import useAuth from "../../stores/auth.pinia";
import { storeToRefs } from "pinia";

// Props
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["update:open"]);

// Store
const authStore = useAuth();
const { user } = storeToRefs(authStore);

// Modal state
const visible = ref(false);
const loading = ref(false);
const formRef = ref();
const fileList = ref([]);
const avatarPreview = ref(null);

// Form data
const formData = ref({
  first_name: "",
  last_name: "",
  email: "",
});

// Form validation rules
const rules = {
  first_name: [
    {
      required: true,
      message: "Please enter your first name",
      trigger: "blur",
    },
    {
      min: 2,
      message: "First name must be at least 2 characters",
      trigger: "blur",
    },
  ],
  last_name: [
    { required: true, message: "Please enter your last name", trigger: "blur" },
    {
      min: 2,
      message: "Last name must be at least 2 characters",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "Please enter your email", trigger: "blur" },
    { type: "email", message: "Please enter a valid email", trigger: "blur" },
  ],
};

// Computed properties
const userInitials = computed(() => {
  const firstName = formData.value.first_name || user.value?.first_name || "";
  const lastName = formData.value.last_name || user.value?.last_name || "";
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
});

// Watch for prop changes
watch(
  () => props.open,
  (newValue) => {
    visible.value = newValue;
    if (newValue) {
      // Initialize form data with current user data
      formData.value = {
        first_name: user.value?.first_name || "",
        last_name: user.value?.last_name || "",
        email: user.value?.email || "",
      };
      avatarPreview.value = null;
      fileList.value = [];
    }
  },
  { immediate: true }
);

// Watch for modal visibility changes
watch(visible, (newValue) => {
  emit("update:open", newValue);
});

// Handle file upload before upload
const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("You can only upload image files!");
    return false;
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
    return false;
  }

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);

  return false; // Prevent automatic upload
};

// Handle form submission
const handleSubmit = async (values) => {
  try {
    loading.value = true;

    // Prepare data for API call
    const updateData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    };

    if (fileList.value.length > 0) {
      updateData.avatar = fileList.value[0].originFileObj;
    }

    await authStore.updateProfile(updateData, () => {
      message.success("Profile updated successfully!");
      visible.value = false;
      authStore.getUser();
    });
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

// Handle modal cancel
const handleCancel = () => {
  visible.value = false;
};
</script>
