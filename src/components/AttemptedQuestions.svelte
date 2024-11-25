
<script>
  import { createEventDispatcher } from "svelte";
  import { attemptedQuestions, questions, userAnswers,currentQuestionIndex } from "../store/store.js";
  const dispatch = createEventDispatcher();
  export let isUserAnswer;
  export let isCorrectAnswer;
  export let className='';
  // Reactive assignments
  $: attemptedQuestionsList = $attemptedQuestions;
  $: allQuestions = $questions;
  $: allUserAnswers = $userAnswers;
</script>



  {#if attemptedQuestionsList.length > 0}
  <ul class={`sidebar-question-wrapper nav mt-4 ${className}`}>
    {#each attemptedQuestionsList as index}
      <li class={`nav-item mt-1 mb-1 d-flex rounded gap-2 text-nowrap ${$currentQuestionIndex===index?'active-question':''}`}
        data-bs-toggle="offcanvas" 
        data-bs-target="#offcanvasExample"
        on:click={()=>dispatch('click',index)}
      >
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
  </ul>
  {:else}
    <div class="alert alert-warning" role="alert">No questions attempted yet.</div>
{/if}


<style>
  .attempted-sidebar-question .attempted-question-title{
    width: 260px;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
