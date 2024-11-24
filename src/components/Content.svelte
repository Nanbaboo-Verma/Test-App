<script>
  import { currentQuestionIndex, questions, userAnswers, attemptedQuestions, unattemptedQuestions } from "../store/store.js";
  export let onAnswer;
  $: currentQuestion = $questions[$currentQuestionIndex];
  let currentAnswer;
  $: {
    currentAnswer = $userAnswers[$currentQuestionIndex]; 
  }

  const handleAnswerSelection = (selectedOption) => {
    onAnswer($currentQuestionIndex, selectedOption);
  };

  
  $: {
    if (currentAnswer !== undefined) {
      // Add to attemptedQuestions if answered
      attemptedQuestions.update((attempted) => {
        if (!attempted.includes($currentQuestionIndex)) {
          return [...attempted, $currentQuestionIndex];
        }
        return attempted;
      });

      // Remove from unattemptedQuestions
      unattemptedQuestions.update((unattempted) => {
        return unattempted.filter((index) => index !== $currentQuestionIndex);
      });
    }
  }
 
</script>



<div class="container bg-content mt-5 mb-5 pb-5">
  <div class="d-flex gap-2">
    <span class="fs-5"> {$currentQuestionIndex+1}) </span>
    <p class="text-justify fs-5 mb-5">{currentQuestion.question}</p>
  </div>
  <div class="mt-3">
  {#each currentQuestion.options as option, index}
    <div class="d-flex gap-3 fs-5 mb-2">
      <span>{String.fromCharCode(65 + index)})</span>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id={`option${index}`}
          name="answer"
          value={option.text}
          bind:group={$userAnswers[$currentQuestionIndex]}  
          on:change={() => handleAnswerSelection(option.text)}
        />
        <label class="form-check-label" for={`option${index}`}>{option.text}</label>
      </div>
    </div>
  {/each}
  </div>
</div>

