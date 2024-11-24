import { writable } from "svelte/store";

export const currentPage = writable("started");
export const questions = writable([]);
export const userAnswers = writable({});
export const attemptedQuestions = writable([]);
export const unattemptedQuestions = writable([]);
export const currentQuestionIndex = writable(0);
export const totalAttemptedQuestions = writable(0);
export const totalCorrectQuestions = writable(0);
export const totalIncorrectQuestions = writable(0);
export const timeSpent = writable({});

// Initialize unattempted questions when questions are loaded
questions.subscribe(($questions) => {
  const totalQuestions = $questions.length;
  const allIndices = Array.from({ length: totalQuestions }, (_, i) => i);

  unattemptedQuestions.set(allIndices);
});

// Update attempted and unattempted questions based on user answers
userAnswers.subscribe(($userAnswers) => {
  const attempted = [];
  const unattempted = [];
  let totalAttempted = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  questions.subscribe(($questions) => {
    $questions.forEach((question, index) => {
      const userAnswer = $userAnswers[index];
      const correctOption = question.options.find((option) => option.isCorrect);

      if (userAnswer) {
        attempted.push(index);
        totalAttempted += 1;

        // Correctness check
        if (correctOption && userAnswer === correctOption.text) {
          correctCount += 1;
        } else {
          incorrectCount += 1;
        }
      } else {
        unattempted.push(index);
      }
    });
  });

  attemptedQuestions.set(attempted);
  unattemptedQuestions.set(unattempted);
  totalAttemptedQuestions.set(totalAttempted);
  totalCorrectQuestions.set(correctCount);
  totalIncorrectQuestions.set(incorrectCount);
});
