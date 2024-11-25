<script>
  import { questions,totalAttemptedQuestions,currentQuestionIndex, userAnswers,totalCorrectQuestions,totalIncorrectQuestions,timeSpent, currentPage } from "../store/store.js";
  import { timeFormater } from "./TimeFormater.js";


  $: questionList = $questions;
  $: spentTime = $timeSpent;
  $: answers = $userAnswers
  $: totalTimeSpent = Object.values(spentTime).reduce((total, time) => total + (time || 0), 0);
  let percentage = (($totalCorrectQuestions / $questions.length) * 100).toFixed(0) ;

  const handleCheckQuestionInfo = (index) =>{
    currentPage.set('review')
    currentQuestionIndex.set(index)
  }
</script>


<div class="container test-result mt-5">
  <p class="fs-1 text-center text-primary">Final Result</p>
  <div class="row mt-5 mb-5 pb-5">
    <div class="col-xs-12 col-sm-6	col-md-4	col-lg-2	col-xl-2	col-xxl-2 mt-3">
      <div class="alert alert-success mb-0  d-flex justify-content-center align-items-center flex-column" role="alert">
        <h5 class="alert-heading">Result</h5>
        <h5 class="mb-0">{percentage} %</h5>
      </div>
    </div>

    <div class="col-xs-12 col-sm-6	col-md-4	col-lg-2	col-xl-2	col-xxl-2 mt-3">
      <div class="alert alert-info mb-0 d-flex justify-content-center align-items-center flex-column" role="alert">
        <h5 class="alert-heading">Total Time</h5>
        <h5 class="mb-0">{timeFormater(totalTimeSpent)}</h5>
      </div>
    </div>
   
    <div class="col-xs-12 col-sm-6	col-md-4	col-lg-2	col-xl-2	col-xxl-2 mt-3">
      <div class="alert alert-primary mb-0  d-flex justify-content-center align-items-center flex-column" role="alert">
        <h5 class="alert-heading">Total Items</h5>
        <h5 class="mb-0">{$questions.length}</h5>
      </div>
    </div>

    <div class="col-xs-12 col-sm-6	col-md-4	col-lg-2	col-xl-2	col-xxl-2 mt-3">
      <div class="alert alert-success mb-0  d-flex justify-content-center align-items-center flex-column" role="alert">
        <h5 class="alert-heading">Correct</h5>
        <h5 class="mb-0">{$totalCorrectQuestions}</h5>
      </div>
    </div>

    <div class="col-xs-12 col-sm-6	col-md-4	col-lg-2	col-xl-2	col-xxl-2 mt-3">
      <div class="alert alert-danger mb-0  d-flex justify-content-center align-items-center flex-column" role="alert">
        <h5 class="alert-heading">Incorrect</h5>
        <h5 class="mb-0">{$totalIncorrectQuestions}</h5>
      </div>
    </div>

    <div class="col-xs-12 col-sm-6	col-md-4	col-lg-2	col-xl-2	col-xxl-2 mt-3">
      <div class="alert alert-warning mb-0  d-flex justify-content-center align-items-center flex-column" role="alert">
        <h5 class="alert-heading align-items-center flex-column">Unattempted</h5>
        <h5 class="mb-0">{$questions.length - $totalAttemptedQuestions}</h5>
      </div>
    </div>

  </div>


  <table class="table border-top table-striped table-hover mt-5 pt-5 mb-5">
    <thead class="bg-secondary text-white">
      <tr>
        <th scope="col" class="border-start border-end p-3">S.N</th>
        <th scope="col" class="border-end p-3">Questions</th>
        <th scope="col" class="border-end p-3">Options</th>
      </tr>
    </thead>
    <tbody>
      
      {#each questionList as question, index (index)}
    <tr>
      <td class="border-start border-end">{index + 1}</td>
      <td class="question-title border-end" on:click={()=>handleCheckQuestionInfo(index)}>{question.question}</td>
      <td class="border-end">
        <div class="d-flex gap-2">
          {#each question.options as option, optionIndex}

           {#if !option.isCorrect && answers[index] === option.text}
              <span class="incorrect-option text-danger border border-2 border-secondary rounded-circle question-option">{String.fromCharCode(65 + optionIndex)}</span>
            {:else if !option.isCorrect && answers[index] !== option.text}
                <span class="border border-2 border-secondary rounded-circle question-option text-secondary">{String.fromCharCode(65 + optionIndex)}</span>
            {:else}
               <span class="correct-option text-success border border-2 border-secondary rounded-circle question-option">{String.fromCharCode(65 + optionIndex)}</span>
            {/if} 

            {/each}
        </div>
       
      </td>
    </tr>
  {/each}
</tbody>
  </table>     
</div>


<style>
  .question-title{
    width: 1024px
  }
  .question-option{
    padding: 2px 9px;
  }
  .incorrect-option{
    border: 2px solid red !important;
  }
  .correct-option {
    border: 2px solid green !important;
  }

  .question-title:hover{
    cursor: pointer;
  }

</style>

