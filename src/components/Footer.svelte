<script>
  import Timer from './Timer.svelte';
  import { currentQuestionIndex,questions} from "../store/store.js";
  import ConformationPopUp from './ConformationPopUp.svelte';

  const moveToNext = () => {
    currentQuestionIndex.update((idx) => idx + 1);
  };

  const moveToPrevious = () => {
    currentQuestionIndex.update((idx) => idx - 1);
  };

</script>

<div>
<div class="bg-light position-fixed start-0 end-0 bottom-0 border-top">
  <div class="containers  d-flex justify-content-between align-items-center p-3">
    <button class="btn btn-secondary me-2" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      List
     </button>

     <div>
      <button class="btn btn-secondary me-2" on:click={moveToPrevious} disabled={$currentQuestionIndex === 0}>Previous</button>
      <span>{$currentQuestionIndex+1} of {$questions.length}</span>
      <button class="btn btn-secondary ms-2" on:click={moveToNext} disabled={$currentQuestionIndex === $questions.length - 1}>Next</button>
     </div>
     <button class="btn btn-danger ms-2" data-bs-toggle="modal" href="#exampleModalToggle" role="button">End Test</button>
  </div>
</div>
<Timer />
<ConformationPopUp />
</div>
