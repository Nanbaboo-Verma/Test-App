<script>
    import { onMount } from 'svelte';
    import { currentQuestionIndex,questions} from "../store/store.js";

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