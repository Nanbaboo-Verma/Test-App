<script>
  export let testStart;
</script>

  <div class="start-test-section position-absolute start-0 end-0 bottom-0 d-flex justify-content-center align-items-center bg-white">
    <button 
      class="btn btn-secondary" 
      type="button" 
      on:click={testStart}
    >
      Start Test
    </button>
  </div>

 <style>
  .start-test-section{
    position: absolute;
    top: 82px;
    z-index: 9;
   }
 </style>
