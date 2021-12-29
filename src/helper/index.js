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
const generateRandomQuestion = (collection, id) => {
  const userQuestions = [];
  const question = {
    ...data[collection].filter((col) => col.categoryId === id),
  };
  const noOfQuestion = data[collection].filter(
    (col) => col.categoryId === id
  ).length;
  // const randomQuestion = chance.integer({ min: 0, max: noOfQuestion });
  const randomQuestion = Math.floor(Math.random() * noOfQuestion);
  userQuestions.push(randomQuestion);
  if (noOfQuestion === 0) {
    return null;
  }

  if (userQuestions.includes(randomQuestion)) {
    const newRandomQuestion = Math.floor(Math.random() * noOfQuestion);
    return question[newRandomQuestion].id;
  }
  return question[randomQuestion].id;
};

const reset = () => (data.exam = []);
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
