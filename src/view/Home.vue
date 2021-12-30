<template>
  <question-category :categories="categories" />
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import QuestionCategory from "../components/QuestionCategory.vue";
import { getCollection } from "../helper";

export default {
  components: {
    QuestionCategory,
  },
  setup() {
    const categoryCollection = ref("categories");
    const categories = computed(() => getCollection(categoryCollection.value));
    return {
      categories,
    };
  },
};
</script>

<style>
body {
  background: -webkit-linear-gradient(left, #735cc4, #5caab9);
}
.contact-form {
  background: rgb(255, 255, 255);
  margin-top: 10%;
  margin-bottom: 5%;
  width: 50%;
}
.contact-form .form-control {
  border-radius: 1rem;
}
.contact-image {
  text-align: center;
}
.contact-image img {
  border-radius: 6rem;
  width: 11%;
  margin-top: -3%;
  transform: rotate(29deg);
}
.contact-form form {
  padding: 14%;
}
.contact-form form .row {
  margin-bottom: -7%;
}
.contact-form h3 {
  margin-bottom: 8%;
  margin-top: -10%;
  text-align: center;
  color: #0b0e11;
}
.contact-form .btnContact {
  width: 50%;
  border: none;
  border-radius: 1rem;
  padding: 1.5%;
  background: #dc3545;
  font-weight: 600;
  color: rgb(211, 202, 202);
  cursor: pointer;
}
.btnContactSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  color: #fff;
  background-color: #0062cc;
  border: none;
  cursor: pointer;
}
</style>
