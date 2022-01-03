<template>
  <div>
    <custom-header title="Categories" />
    <div v-for="(category, index) in categories" :key="index">
      <custom-button :categories="category"></custom-button>
    </div>
  </div>
</template>

<script>
import CustomButton from "./CustomButton.vue";
import CustomHeader from "./CustomHeader.vue";

export default {
  components: {
    CustomButton,
    CustomHeader,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
