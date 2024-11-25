<script>
  import Timer from './Timer.svelte';
  import ConformationPopUp from './ConformationPopUp.svelte';
  import NextPreviousBtn from './NextPreviousBtn.svelte';
</script>

<div>
<div class="bg-light position-fixed start-0 end-0 bottom-0 border-top">
  <div class="containers  d-flex justify-content-between align-items-center p-3">
    <button class="btn btn-secondary me-2" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      List
     </button>
     <NextPreviousBtn />
     <button class="btn btn-danger ms-2" data-bs-toggle="modal" href="#exampleModalToggle" role="button">End Test</button>
  </div>
</div>
  <Timer />
  <ConformationPopUp />
</div>
