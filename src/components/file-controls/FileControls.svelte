<script lang="ts">
  import { setHelpContent } from '../../stores/help-content';
  import textContent from '../../data/text-content';
  import { recordedAudioURL } from '../../stores/audio-files';

  function downloadButtonHandler(event: MouseEvent) {
    if ($recordedAudioURL === '') {
      event.preventDefault();
      setHelpContent(textContent.error.noFileToDownload, true);
      return;
    }
  }
</script>

<style>
  .active {
    animation: alert 400ms;
  }

  @keyframes alert {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.5);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<a href={$recordedAudioURL} download="recording.wav">
  <button
    class="control-btn fa fa-download"
    class:active={$recordedAudioURL !== ''}
    on:mouseover={() => setHelpContent('Download recording')}
    on:click={downloadButtonHandler} />
</a>
