<script lang="ts">
  import { closeRecorder, viewState } from '../../stores/view';
  import { ViewState } from '../../utils/enums';

  const closeButtonHandler = () => {
    if ($viewState === ViewState.RECORDER) {
      closeRecorder();
    }
  };
</script>

<style>
  section {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    background-color: var(--main-pink);
  }

  .controls-container {
    display: flex;
    justify-content: start;
  }

  section i {
    padding: 8px;
    font-size: 1.2em;
    height: min-content;
    border-radius: 0 0 0 15px;
    background-color: var(--main-pink);
    color: rgba(255, 255, 255, 0.747);
  }

  section i:hover {
    color: var(--main-pink);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.747);
  }
  section i:active {
    background-color: rgba(255, 255, 255, 0.4);
  }
</style>

<section>
  <div class="controls-container">
    <slot />
  </div>
  <i class="fa fa-close" on:click={closeButtonHandler} />
</section>
