<template>
  <div>
    <custom-header
      title="You answered "
      :page="`${getResult} of ${getExamLength} questions correctly.`"
    />
    <div class="form-group">
      <router-link
        :to="{
          name: 'Result',
          params: {
            categoryId: categoryId,
            userId: 'guest',
          },
        }"
        class="btnContactSubmit"
        >View Result</router-link
      >

      <router-link
        @click="retake"
        :to="{
          name: 'Home',
        }"
        class="btnContact"
        >Retake</router-link
      >
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import CustomHeader from "../components/CustomHeader.vue";
import { findById, reset } from "../helper";

export default {
  components: { CustomHeader },
  props: {
    categoryId: String,
    questinaire: Array,
  },
  setup(props) {
    const listOfQuestionTakenByStudent = ref([...props.questinaire]);
    const studentCollection = ref("student");
    const getStudent = ref(findById(studentCollection.value, "guest"));
    const filterByCategoryAndStudent = ref(
      listOfQuestionTakenByStudent.value.filter(
        (q) => q.categoryId === props.categoryId && q.userId === "guest"
      )
    );
    const getResult = computed(() => {
      const result = ref(
        filterByCategoryAndStudent.value
          .map((x) => (x.studAnswer.ans === x.correctAnswer.ans ? 1 : 0))
          .reduce((x, y) => x + y)
      );
      getStudent.value.score = result.value;
      return result.value;
    });
    const getExamLength = computed(
      () => filterByCategoryAndStudent.value.length
    );

    const retake = () => reset();
    return {
      listOfQuestionTakenByStudent,
      getResult,
      getExamLength,
      retake,
    };
  },
};
</script>

<style></style>
