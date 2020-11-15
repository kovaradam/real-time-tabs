<script lang="ts">
  import textContent from '../../data/text-content';
  import { killAllAudio } from '../../stores';
  import { recordedAudioName, recordedAudioURL } from '../../stores/audio-files';
  import { setHelpContent } from '../../stores/help-content';
  import Icon from 'svelte-awesome';
  import { download, trashO } from 'svelte-awesome/icons';

  function handleDownloadButton(event: MouseEvent) {
    if ($recordedAudioURL === '') {
      event.preventDefault();
      setHelpContent(textContent.error.noFileToDownload, true);
      return;
    }
  }

  function handleDeleteButton() {
    killAllAudio();
  }
</script>

<style>
  div {
    right: 0;
  }

  span {
    border-bottom-left-radius: 15px;
    flex-direction: column;
    animation: slide-left 200ms ease-in forwards;
    padding-bottom: 6px;
  }

  @keyframes slide-left {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }

  button {
    background-color: transparent;
    border: none;
    border-radius: 3px;
    min-width: 0;
    min-height: 0;
    margin: 5px 2px 0 3px;
    padding: 2px;
    color: #6d6d6d;
    transition: all 0ms;
  }

  button:hover {
    background-color: rgba(128, 128, 128, 0.151);
  }

  button:active {
    background-color: rgba(128, 128, 128, 0.451);
  }
</style>

<div class="audio-panel-container">
  <span id="audio-status-panel" class="audio-panel">
    <a href={$recordedAudioURL} download={$recordedAudioName}>
      <button
        class="audio-panel-content"
        on:click={handleDownloadButton}
        on:mouseover={() => setHelpContent('Download recording')}>
        <Icon data={download} />
      </button>
    </a>
    <button
      class="audio-panel-content"
      on:click={handleDeleteButton}
      on:mouseover={() => setHelpContent('Delete recording')}>
      <Icon data={trashO} />
    </button>
  </span>
</div>
