const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const trueAnswer = item.correct_answer;
    const randomNumber = Math.floor(Math.random() * 4);
    answers.splice(randomNumber, 0, trueAnswer);
    questionObject.answers = answers;
    questionObject.correctAnswer = randomNumber;
    return questionObject;
  });
  // console.log(result);
  return result;
};

export default formatData;
