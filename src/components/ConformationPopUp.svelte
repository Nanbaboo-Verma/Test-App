<script>
  import { questions, currentPage,totalAttemptedQuestions } from "../store/store.js";

  const goToResultPage = () => {
    currentPage.set("result");
  };
  
</script>

<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">Confirmation</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to end the test?</p>
        <div class="row">
          <div class="colxs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mt-3">
            <div class="alert alert-primary mb-0 d-flex flex-column justify-content-center align-items-center" role="alert">
              <h5 class="alert-heading">Total Items</h5>
              <h5>{$questions.length}</h5>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mt-3">
            <div class="alert alert-success mb-0 d-flex flex-column justify-content-center align-items-center" role="alert">
              <h5 class="alert-heading">Attempted</h5>
              <h5>{$totalAttemptedQuestions}</h5>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mt-3">
            <div class="alert alert-warning mb-0 d-flex flex-column justify-content-center align-items-center" role="alert">
              <h5 class="alert-heading">Unattempted</h5>
              <h5>{$questions.length - $totalAttemptedQuestions}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" 
           data-bs-dismiss="modal">Cancel
        </button>
        <button class="btn btn-danger btn-sm" 
        data-bs-dismiss="modal" 
        on:click={goToResultPage}>End Test</button>
      </div>
    </div>
  </div>
</div>
