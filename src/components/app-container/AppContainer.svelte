<script lang="ts">
  import WelcomeCard from '../welcome-card/WelcomeCard.svelte';
  import Recorder from '../recorder/Recorder.svelte';
  import { viewState } from '../../stores/view';
  import { ViewState } from '../../utils/enums';
  import textContent from '../../data/text-content';

  $: onMainPage = $viewState === ViewState.HOME || $viewState === ViewState.LANDING;
  $: onRecorderPage = $viewState === ViewState.RECORDER;
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
    animation: fade-in 1600ms forwards;
  }

  .recorder {
    animation: recorder-roll-down 600ms forwards;
  }
  .home {
    animation: card-roll-down 600ms forwards;
  }

  @keyframes recorder-roll-down {
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

<main class={`main-container ${$viewState}`} id="main-container">
  {#if onMainPage}
    <WelcomeCard />
  {:else if onRecorderPage}
    <Recorder />
  {:else}
    <div />
  {/if}
</main>
{#if onMainPage}
  <p>{textContent.welcomeMessage}</p>
{/if}
