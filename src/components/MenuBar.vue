<script setup>
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const toggleMenu = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div
    class="hamburger"
    :class="{ active: props.modelValue }"
    @click="toggleMenu"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped>
.hamburger {
  width: 30px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.hamburger span {
  height: 3px;
  background: #8b8b8b;
  border-radius: 2px;
  transition: 0.3s;
}
.hamburger.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
</style>
