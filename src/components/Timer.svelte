<script>
  import { onMount, onDestroy } from "svelte";
  import { currentQuestionIndex, timeSpent } from "../store/store.js";

  let duration = 80;
  let timeLeft = duration; 
  let interval;
  let progress = 0;

  let previousQuestionIndex = null;

  $: {
    if (previousQuestionIndex !== null && $currentQuestionIndex !== previousQuestionIndex) {
      timeSpent.update((time) => {
        time[previousQuestionIndex] = duration - timeLeft;
        return time;
      });
      timeLeft = duration;
    }
    previousQuestionIndex = $currentQuestionIndex;
  }

  $: newtimeLeft = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;

  // Start the timer
  onMount(() => {
    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft -= 1;
        progress = ((duration - timeLeft) / duration) * 100;
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
    timeSpent.update((time) => {
      time[$currentQuestionIndex] = duration - timeLeft;
      return time;
    });
  });
</script>



<div class="start-timer">
  <svg class="progress-ring" width="70" height="70">
    <circle
      class="progress-ring__background"
      cx="35"
      cy="35"
      r="30"
    />
    <circle
      class="progress-ring__progress"
      cx="35"
      cy="35"
      r="30"
      stroke-dasharray="188.4" 
      stroke-dashoffset="{188.4 - (progress / 100) * 188.4}"
    />
  </svg>
  <span class="timer-text">{newtimeLeft}</span>
</div>

<style>
  .start-timer {
    position: fixed;
    bottom: 145px;
    right: 80px;
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .progress-ring {
    position: absolute;
    transform: rotate(-90deg); 
  }

  .progress-ring__background {
    fill: none;
    stroke: silver;
    stroke-width: 4;
  }

  .progress-ring__progress {
    fill: none;
    stroke: red;
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.3s ease; 
  }

  .timer-text {
    position: absolute;
    font-size: 14px;
    font-weight: bold;
    color: black;
  }
</style>
