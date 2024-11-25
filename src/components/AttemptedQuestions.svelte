
<script>
  import { attemptedQuestions, questions, userAnswers } from "../store/store.js";
  export let isUserAnswer;
  export let isCorrectAnswer;
  export let className='';
  // Reactive assignments
  $: attemptedQuestionsList = $attemptedQuestions;
  $: allQuestions = $questions;
  $: allUserAnswers = $userAnswers;
</script>



<ul class={`attempted-question-list nav mt-4 ${className}`}>
  {#if attemptedQuestionsList.length > 0}
  {#each attemptedQuestionsList as index}
    <li class="nav-item p-2 text-nowrap">
      <div class="d-flex gap-2">
        <p class="mb-0">{index+1})</p>
        <p class="attempted-question-title mb-0">{allQuestions[index].question}</p>
      </div>
      {#if isUserAnswer && isCorrectAnswer}
      <p class="user-answer mb-0">Your Answer: {allQuestions[index].options.find(option => option.text === allUserAnswers[index])?.text}</p>
      <p class="correct-answer mb-0">{allQuestions[index].options.find(option => option.isCorrect)?.text} is the correct answer.</p>
      {/if}
    </li>
  {/each}
{:else}
  <p>No questions attempted yet.</p>
{/if}
</ul>

<style>
  .attempted-sidebar-question .attempted-question-title{
    width: 260px;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
