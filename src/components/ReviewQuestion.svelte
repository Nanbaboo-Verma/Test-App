
<script>
  import { questions, userAnswers,attemptedQuestions ,currentQuestionIndex,timeSpent,currentPage} from "../store/store.js";
  import NextPreviousBtn from "./NextPreviousBtn.svelte";
  import { timeFormater } from "./TimeFormater.js";

  $: questionList = $questions;
  $: answers = $userAnswers;   
  $: currentIndex = $currentQuestionIndex

  const moveToResultPage=()=>{
     currentPage.set('result')
  } 
  const startNewTest = () =>{
    window.location.reload()
  }

</script>


<div class="container mt-5 pb-5">
  <p class="fs-1 text-center text-primary mb-5">Review Question With Explanation</p>
    {#each [questionList[currentIndex]] as question}
      <div class="card text-centers mb-5">
      <div class="card-header pl-3 lr-3 pt-4 pb-4">
        <b>{currentIndex + 1}) {question.question} </b>
      </div>

      <div class="p-3">
        {#each question.options as option, optionIndex}
        <div class="p-1">
          <span>{String.fromCharCode(65 + optionIndex)}) {option.text}</span>

          {#if answers[currentIndex] === option.text}
            <span class={`user-answer fw-bold ${option.isCorrect?'user-answer-correct text-success':'user-answer-incorrect text-danger'}`}>
              ({option.isCorrect ? "Correct" : "Incorrect"} Answer)
            </span>
          {/if}

          {#if option.isCorrect && answers[currentIndex] !== option.text}
            <span class="correct-answer fw-bold text-primary">(Correct Answer)</span>
          {/if}
        </div>
        {/each}
      </div>

      <div class="border-top p-3 pt-0">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mt-3">
            <div><b>Status:</b> {#if $attemptedQuestions.includes(currentIndex)}<span class="text-success">Attempted</span>{:else}<span class="text-danger">Unattempted</span>{/if}</div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mt-3">
            <p class="mb-0"><b>Time Spent:</b> {timeFormater($timeSpent[currentIndex] || 0)} </p>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mt-3">
            <button class="btn btn-outline-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Show Explanation
            </button>
          </div>
        </div>
      </div>
      
      <div class="border-top">
        {#if question.explanation}
        <div class="collapse" id="collapseExample">
          <div class="card card-body border-0">
            <h5 class="card-title">Explanation:-</h5>
            <p class="card-text">{question.explanation}</p>
          </div>
        </div>
        {/if}
      </div>
      </div>
    {/each}

    <div class="d-flex justify-content-between">
      <NextPreviousBtn />
      <div>
        <button class="btn btn-outline-primary" on:click={moveToResultPage}>Show Result</button>
        <button class="btn btn-outline-primary" on:click={startNewTest}>Start Test</button>
      </div>

    </div>
</div> 
