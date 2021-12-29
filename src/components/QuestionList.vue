<template>
  <div>
    <div v-if="questionaireLength >= 10">
      <result :categoryId="categoryId" :questinaire="questinaire" />
    </div>
    <div v-else>
      <div v-if="questions">
        <custom-header
          title="Question"
          :page="`${questionaireLength + 1} of 10`"
        />
        <div class="form-group">
          <div
            class="form-control"
            style="width: 100%; height: 150px; padding: 45px 16px"
            align="center"
          >
            <h5>{{ questions.title }}</h5>
          </div>
        </div>
        <div v-for="(choice, index) in questions.choices" :key="index">
          <custom-button
            :choices="choice"
            :questionId="questionId"
            :categoryId="categoryId"
            @studAnswer="getStudAnswer"
          ></custom-button>
        </div>

        <div class="form-group">
          <router-link
            class="btnContact"
            style="text-decoration: none"
            align="center"
            @click="getId"
            :to="{
              name: 'Questionaire',
              params: {
                categoryId: categoryId,
                id: questionId,
              },
            }"
            >Submit</router-link
          >
        </div>
      </div>
      <div v-else>
        <custom-header title="Coming  Soon.." />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import CustomHeader from "./CustomHeader.vue";
import CustomButton from "./CustomButton.vue";
import Result from "../view/Result.vue";
import data from "../assets/database/question.json";
import {
  filterQuestionByCategory,
  findById,
  generateRandomQuestion,
  getCollection,
  pushItemInCollection,
  getAllDataFromCollection,
} from "../helper";

export default {
  components: {
    CustomHeader,
    CustomButton,
    Result,
  },
  props: {
    questions: {
      type: Object,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const id = ref(props.questionId);
    const questinaire = ref([]);
    const questionaireLength = computed(
      () => filterQuestionByCategory(questinaire.value, props.categoryId).length
    );
    const questionCollection = ref("questions");
    const getCorrectAnswer = computed(
      () => findById(questionCollection.value, props.questionId).answer
    );
    const getId = () => {
      const randomQuestion = ref(
        generateRandomQuestion(questionCollection.value, props.categoryId)
      );
      const examCollection = ref("exam");
      if (getCollection(examCollection.value).length === 0) {
        pushItemInCollection(
          examCollection.value,
          id.value,
          studAns.value,
          props.categoryId,
          getCorrectAnswer.value
        );
      } else if (getCollection(examCollection.value).length > 0) {
        id.value = randomQuestion.value;
        pushItemInCollection(
          examCollection.value,
          id.value,
          studAns.value,
          props.categoryId,
          getCorrectAnswer.value
        );
      }
      emit("getQuestionId", randomQuestion.value);
      questinaire.value = [...getAllDataFromCollection(examCollection.value)];
    };
    const studAns = ref({});
    const getStudAnswer = (answer) => {
      studAns.value = answer;
    };

    return {
      id,
      studAns,
      questinaire,
      questionaireLength,
      getCorrectAnswer,
      getStudAnswer,
      getId,
    };
  },
};
</script>

<style scoped>
.btnContact {
  display: inline-block;
  float: right;
}
</style>
