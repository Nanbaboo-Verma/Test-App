<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import Content from "./Content.svelte";
  import SideBar from "./SideBar.svelte";
  import Result from "./Result.svelte";
  import StartTest from "./StartTest.svelte";
  import ReviewQuestion from "./ReviewQuestion.svelte";
  import { currentPage, questions, currentQuestionIndex, userAnswers } from "../store/store.js";
  
  let isLoading = true; 
  let showSidebar = false;
  let isTestStarted = false;


  onMount(async () => {
    try {
      const response = await fetch("/questions.json");
      const result = await response.json();
      const parsedQuestions = result.map((item) => {
        const contentText = JSON.parse(item.content_text);
        return {
          question: contentText.question,
          options: contentText.answers.map((ans) => ({
            id: ans.id,
            text: ans.answer,
            isCorrect: ans.is_correct === "1",
          })),
          explanation: contentText.explanation,
        };
      });

      questions.set(parsedQuestions);
      isLoading = false; 
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      isLoading = false; 
    }
  });

  // Function to handle answer selection
  const handleAnswer = (questionIndex, selectedOption) => {
    userAnswers.update((answers) => {
      answers[questionIndex] = selectedOption;
      return answers;
    });
  };

  const moveToNext = () => {
    currentQuestionIndex.update((index) => Math.min(index + 1, $questions.length - 1));
  };

  const moveToPrevious = () => {
    currentQuestionIndex.update((index) => Math.max(index - 1, 0));
  };

  const toggleSidebar = () => {
    showSidebar = !showSidebar;
  };


  const handleStartTest = () => {
    isTestStarted = !isTestStarted
  }

</script>


<main>
  <Header />
  {#if !isTestStarted}
     <StartTest testStart={handleStartTest} />
  {:else}
  <SideBar
      {showSidebar} 
      on:toggleSidebar={toggleSidebar} 
      question={$questions}
      currentIndex={$currentQuestionIndex}
    />

  {#if isLoading}
    <p>Loading questions...</p>
  {:else if $currentPage === "started"}
    {#if $questions.length > 0}
      <Content onAnswer={handleAnswer} />
      <Footer onNext={moveToNext} onPrevious={moveToPrevious}  />
    {:else}
      <p>No questions available.</p>
    {/if}
    {:else if $currentPage === "result"}
    <Result />
    {:else if $currentPage === "review"}
      <ReviewQuestion />
  {/if}
{/if}
</main>