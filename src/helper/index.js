import data from "../assets/database/question.json";

// get functions
const getCollection = (collection) => data[collection];
const getAllDataFromCollection = (collection) =>
  data[collection].map((col) => col);
// find functions
const findById = (collection, id) =>
  data[collection].find((col) => col.id === id);
// filter functions
const filterByCategory = (collection, id) =>
  data[collection].filter((col) => col.categoryId === id);

//custom function
const filterQuestionByCategory = (src, id) => {
  return src.filter((col) => col.categoryId === id);
};
const userQuestions = new Set();
const generateRandomQuestion = (collection, id) => {
  const question = {
    ...data[collection].filter((col) => col.categoryId === id),
  };
  const noOfQuestion = data[collection].filter(
    (col) => col.categoryId === id
  ).length;
  const randomQuestion = Math.floor(Math.random() * noOfQuestion);
  userQuestions.add(randomQuestion);
  const randomQuestionList = new Set();
  do {
    const randomQ = Math.floor(Math.random() * noOfQuestion);
    randomQuestionList.add(randomQ);
  } while (randomQuestionList.size !== 10);

  console.log(
    Array.from(randomQuestionList).map((r) => {
      return question[r].id;
    })
  );

  if (noOfQuestion.size === 0) {
    return null;
  }

  if (userQuestions.has(randomQuestion)) {
    const newRandomQuestion = Math.floor(Math.random() * noOfQuestion);
    return question[newRandomQuestion].id;
  }
  return question[randomQuestion].id;
};

const reset = () => {
  console.clear();
  userQuestions.clear();
  data.exam = [];
};
const pushItemInCollection = (
  collection,
  questionId,
  studAnswer,
  categoryId,
  correctAnswer
) => {
  data[collection].push({
    userId: "guest",
    questionId: questionId,
    studAnswer: studAnswer,
    categoryId: categoryId,
    correctAnswer: correctAnswer,
  });
};
export {
  getCollection,
  findById,
  filterByCategory,
  generateRandomQuestion,
  filterQuestionByCategory,
  getAllDataFromCollection,
  pushItemInCollection,
  reset,
};
