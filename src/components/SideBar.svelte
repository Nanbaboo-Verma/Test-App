<script>
  import { currentQuestionIndex } from "../store/store.js";
  export let question;
  export let currentIndex;
  
  import AttemptedQuestions from "./AttemptedQuestions.svelte";
  import UnattemptedQuestions from "./UnattemptedQuestions.svelte";

  let changeTab='all';
  let isUserAnswer = false
  let isCorrectAnswer = false;

  const handleNavigateQuestion= (index) => {
    currentQuestionIndex.update(()=>index);
  };

</script>

<div class="offcanvas sibdeBar offcanvas-start border-end " tabindex="-1" id="offcanvasExample" aria-labelledby="testAppSideBar">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="testAppSideBar">Questions List</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>

 <div class="offcanvas-body p-3 border-top">
  <div class="btn-group w-100 mb-4 mt-3" role="group" aria-label="First group">
    <button type="button" class={`btn btn-outline-secondary pt-2 pb-2 ${changeTab==='all'? 'active':''}`} on:click={()=>changeTab='all'}>All</button>
    <button type="button" class={`btn btn-outline-secondary pt-2 pb-2 ${changeTab==='attempted'? 'active':''}`} on:click={()=>changeTab='attempted'}>Attempted</button>
    <button type="button" class={`btn btn-outline-secondary pt-2 pb-2 ${changeTab==='unattempted'? 'active':''}`} on:click={()=>changeTab='unattempted'}>Unattempted</button>
  </div>

  {#if changeTab==='all'}
  <ul class="sidebar-question-wrapper nav flex-column mt-4">
    {#each question as question,index}
      <li class={`nav-item mt-1 mb-1 d-flex rounded gap-2 text-nowrap ${currentIndex===index?'active-question':''}`}   on:click={()=>handleNavigateQuestion(index)} data-bs-toggle="offcanvas">
        <p class="mb-0">{index+1})</p>
        <p class="sidebar-question-title mb-0"> {question.question}</p>
      </li>
    {/each}
  </ul>
  {:else if changeTab==="attempted"}
  <AttemptedQuestions {isUserAnswer} {isCorrectAnswer} className="attempted-sidebar-question"/>
  {:else if changeTab==="unattempted"}
  <UnattemptedQuestions className="unattempted-sidebar-question"/>
  {/if}
    
  </div>
</div>  
  
<style>
    .offcanvas-start{
        width: 350px;
    }
  
    .sidebar-question-wrapper .nav-item{
    padding: 9px 12px !important;
    font-size: 16px !important;
   }
    
    .sidebar-question-title{
    width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    }
    .active-question {
    background-color: #d0ccff !important;
    color: #431ffd !important;
   }
    .nav-item:hover{
      cursor: pointer;
      color: #7991ff;
      background-color: #ebecf1;
    }
</style> 