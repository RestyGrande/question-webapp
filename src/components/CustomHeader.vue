<template>
  <h3>
    {{ title }} <span v-if="page">{{ page }}</span>
  </h3>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
