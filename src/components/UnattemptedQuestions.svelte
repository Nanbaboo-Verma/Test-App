<script>
  import { createEventDispatcher } from "svelte";
  import { unattemptedQuestions, questions ,currentQuestionIndex} from "../store/store.js";
  const dispatch = createEventDispatcher();
  export let className='';
  
  $: unattemptedQuestionsList = $unattemptedQuestions;
  $: allQuestions = $questions;
</script>


{#if unattemptedQuestionsList.length > 0}
 <ul class={`sidebar-question-wrapper nav flex-column mt-4 ${className}`}>
  {#each unattemptedQuestionsList as index}
     <li class={`nav-item mt-1 mb-1 d-flex rounded gap-2 text-nowrap ${$currentQuestionIndex===index?'active-question':''}`}
     data-bs-toggle="offcanvas" 
     data-bs-target="#offcanvasExample"
     on:click={()=>dispatch('click',index)}
     >
       <p class="mb-0">{index+1})</p>
       <p class="unattempted-question-title mb-0">{allQuestions[index].question}</p>
    </li>
  {/each}
 </ul>

{:else}
  <div class="alert alert-warning" role="alert">No unattempted questions.</div>
{/if}

<style>
  .unattempted-sidebar-question .unattempted-question-title{
    width: 260px;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
