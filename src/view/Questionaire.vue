<template>
  <div>
    <question-list
      :questions="listOfQuestions"
      :categoryId="categoryId"
      :questionId="questionId"
      @getQuestionId="getId"
    />
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import QuestionList from "../components/QuestionList.vue";
import { findById } from "../helper";

export default {
  components: { QuestionList },
  props: {
    id: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const questionCollection = ref("questions");
    const questionId = ref(props.id);
    const listOfQuestions = computed(() =>
      findById(questionCollection.value, questionId.value)
    );
    const getId = (id) => {
      questionId.value = id;
    };
    return {
      questionId,
      listOfQuestions,
      getId,
    };
  },
};
</script>

<style></style>
