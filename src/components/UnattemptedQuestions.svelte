<script>
  import { unattemptedQuestions, questions } from "../store/store.js";
  export let className='';
  
  $: unattemptedQuestionsList = $unattemptedQuestions;
  $: allQuestions = $questions;
</script>


<ul class={`sidebar-question-wrapper nav flex-column mt-4 ${className}`}>
  {#if unattemptedQuestionsList.length > 0}
  {#each unattemptedQuestionsList as index}
    <li class="nav-item p-2 d-flex gap-2 text-nowrap" >
      <p class="mb-0">{index+1})</p>
      <p class="unattempted-question-title mb-0">{allQuestions[index].question}</p>
    </li>
  {/each}
{:else}
  <p>No unattempted questions.</p>
{/if}
</ul>

<style>
  .unattempted-sidebar-question .unattempted-question-title{
    width: 260px;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
