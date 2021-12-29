<template>
  <div class="form-group">
    <div v-if="choices">
      <button @click="getAnswer(choices)" class="form-control">
        <p>
          <span>{{ choices.id }} </span>{{ choices.ans }}
        </p>
      </button>
    </div>
    <div v-else>
      <router-link
        :to="{
          name: 'Questionaire',
          params: {
            categoryId: categories.id,
            id: `${randomQuestionId}`,
          },
        }"
        class="form-control"
        >{{ categories.name }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import { generateRandomQuestion } from "../helper";
export default {
  props: {
    choices: Object,
    categories: Array,
    categoryId: String,
    questionId: String,
  },
  setup(props, { emit }) {
    const questionCollection = reactive("questions");

    const randomQuestionId = computed(() =>
      generateRandomQuestion(
        questionCollection,
        props.categoryId ? props.categoryId : props.categories.id
      )
    );

    const getAnswer = (answer) => emit("studAnswer", answer);

    return {
      randomQuestionId,
      getAnswer,
    };
  },
};
</script>

<style scoped>
.form-control:hover {
  background-color: aqua;
}
.form-control:focus {
  background-color: aqua;
}
span {
  float: left;
  padding: 5px;
}
p {
  font-weight: bolder;
  margin-top: 8px;
}
</style>
