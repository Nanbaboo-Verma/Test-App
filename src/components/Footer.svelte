<script>
  import { onMount } from 'svelte';
  import Timer from './Timer.svelte';
  import { currentQuestionIndex,questions} from "../store/store.js";
  import ConformationPopUp from './ConformationPopUp.svelte';

  let windowWidth = window.innerWidth; 

  function handleResize() {
    windowWidth = window.innerWidth;
  }

  const moveToNext = () => {
    currentQuestionIndex.update((idx) => idx + 1);
  };

  const moveToPrevious = () => {
    currentQuestionIndex.update((idx) => idx - 1);
  };

  onMount(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });


</script>

<div>
<div class="bg-light position-fixed start-0 end-0 bottom-0 border-top">
  <div class="containers  d-flex justify-content-between align-items-center p-3">
    <button class="btn btn-secondary me-2" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      List
     </button>

     <div>
      <button class="btn btn-secondary me-2" on:click={moveToPrevious} disabled={$currentQuestionIndex === 0}>
        {#if windowWidth>480}
           Previous
         {:else}
         <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>        
        {/if}
        </button>
      <span>{$currentQuestionIndex+1} of {$questions.length}</span>
      <button class="btn btn-secondary ms-2" on:click={moveToNext} disabled={$currentQuestionIndex === $questions.length - 1}>
        {#if windowWidth > 480}
           Next
        {:else}
           <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="9 18 15 12 9 6" />
           </svg>
        {/if}
      </button>
     </div>
     <button class="btn btn-danger ms-2" data-bs-toggle="modal" href="#exampleModalToggle" role="button">End Test</button>
  </div>
</div>
<Timer />
<ConformationPopUp />
</div>
