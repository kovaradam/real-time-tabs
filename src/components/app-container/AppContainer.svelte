<script lang="ts">
  import WelcomeCard from '../welcome-card/WelcomeCard.svelte';
  import MainContainer from '../recorder/Recorder.svelte';

  let isWelcomeCardHidden = true;
  const welcomeMessage = 'The easiest way to create guitar tabs!';

  const toggleWelcomeCardVisibility = () => {
    isWelcomeCardHidden = !isWelcomeCardHidden;
  };
</script>

<style>
  main {
    width: 240px;
    height: 380px;
  }

  p {
    margin: 50px auto;
    text-align: center;
    font-weight: 300;
    font-size: 1.5em;
    transition: all 20ms;
  }

  .mainContainerRollDown {
    animation: container-roll-down 600ms forwards;
  }
  .welcomeCardRollDown {
    animation: card-roll-down 600ms forwards;
  }

  @keyframes container-roll-down {
    0% {
      height: var(--welcome-card-height);
    }
    30% {
      height: 0px;
      width: var(--welcome-card-width);
    }
    60% {
      height: 0px;
      width: var(--recorder-container-width);
    }
    100% {
      height: var(--recorder-container-height);
      width: var(--recorder-container-width);
    }
  }
  @keyframes card-roll-down {
    0% {
      height: var(--recorder-container-height);
      width: var(--recorder-container-width);
    }
    30% {
      height: 0px;
      width: var(--recorder-container-width);
    }
    60% {
      height: 0px;
      width: var(--welcome-card-width);
    }
    100% {
      height: var(--welcome-card-height);
      width: var(--welcome-card-width);
    }
  }
</style>


<main class={'main-container ' + (isWelcomeCardHidden ? 'mainContainerRollDown' : 'welcomeCardRollDown')}>
  {#if !isWelcomeCardHidden}
    <WelcomeCard toggleVisibility={toggleWelcomeCardVisibility} />
  {:else}
    <MainContainer toggleVisibility={toggleWelcomeCardVisibility} />
  {/if}
</main>
{#if !isWelcomeCardHidden}
  <p>{welcomeMessage}</p>
{/if}
