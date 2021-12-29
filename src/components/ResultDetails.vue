<template>
  <div class="form-group">
    <custom-header
      :title="`${getCatergoryName} Exam Result :`"
      :page="`${getScore} of 10`"
    />
    <div class="form-group">
      <router-link @click="retake" :to="{ name: 'Home' }" class="btnContact"
        >Retake</router-link
      >
    </div>
    <table class="table table-bordered">
      <tr>
        <th scope="col" rowspan="2">#</th>
        <th scope="col" rowspan="2">Question</th>
        <th scope="col" colspan="2">Your Anwer</th>
        <th scope="col" colspan="2">Correct Answer</th>
        <th scope="col" rowspan="2">Checked</th>
      </tr>
      <tr>
        <td>Letter</td>
        <td>Answer</td>
        <td>Letter</td>
        <td>Answer</td>
      </tr>
      <tr v-for="(result, index) in getExamResult" :key="index" class="result">
        <td scope="row">{{ index + 1 }}</td>
        <td>{{ getQuestion(result.questionId) }}</td>
        <td>{{ result.studAnswer.id }}</td>
        <td>{{ result.studAnswer.ans }}</td>
        <td>{{ result.correctAnswer.id }}</td>
        <td>{{ result.correctAnswer.ans }}</td>
        <td>
          <toggle-icon :show="check(result.correctAnswer, result.studAnswer)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CustomHeader from "./CustomHeader.vue";
import ToggleIcon from "./ToggleIcon.vue";
import { computed, ref } from "@vue/reactivity";
import { filterByCategory, findById, reset } from "../helper";
export default {
  components: { CustomHeader, ToggleIcon },
  props: {
    categoryId: String,
    userId: String,
  },
  setup(props) {
    //get result
    const examCollection = ref("exam");
    const getExamResult = computed(() =>
      filterByCategory(examCollection.value, props.categoryId)
    );
    //get score
    const studentCollection = ref("student");
    const getScore = computed(
      () => findById(studentCollection.value, props.userId).score
    );
    //get catergoryName
    const categoryCollection = ref("categories");
    const getCatergoryName = computed(
      () => findById(categoryCollection.value, props.categoryId).name
    );
    //get questions
    const questionCollection = ref("questions");
    const getQuestion = (id) => findById(questionCollection.value, id).title;

    const check = (correct, studAns) => correct.ans === studAns.ans;
    const retake = () => reset();
    return {
      getExamResult,
      getScore,
      getCatergoryName,
      getQuestion,
      check,
      retake,
    };
  },
};
</script>

<style scoped>
.wrong {
  background-color: indianred;
  color: #fff;
}
.correct {
  background-color: lightseagreen;
  color: #fff;
}
th {
  text-align: center;
}
table {
  color: #fff;
}
</style>
