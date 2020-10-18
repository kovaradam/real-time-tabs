<script lang="ts">
  import { secondsToMinutesString } from '../../audio/utils';

  import { recordedAudioDuration, recordedAudioName } from '../../stores/audio-files';
  import { currentTime } from '../../stores/player';

  $: recordedAudioNameLength = ($recordedAudioName.length + 1) * 7;

  function enterPressHandler(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      (event.target as HTMLTextAreaElement).blur();
    }
  }
</script>

<style>
  div {
    top: 0;
    left: 0;
  }

  #audio-status-panel {
    border-bottom-right-radius: 15px;
  }

  input {
    margin: 6px 10px 4px 10px;
    padding: 0 0 2px 4px;
    background-color: transparent;
    border-width: 0;
    height: 18px;
    caret-color: white;
    outline: none;
    border-radius: 2px;
    font-weight: 200;
    transition: all 200ms;
    font-size: 0.9em;
    width: min-content;
  }

  input:focus {
    background-color: rgba(128, 128, 128, 0.151);
  }
</style>

<div class="audio-panel-container">
  <span id="audio-status-panel" class="audio-panel">
    <p class="audio-panel-content">
      {`${secondsToMinutesString($currentTime)} / ${secondsToMinutesString($recordedAudioDuration)}`}
    </p>
    <input
      bind:value={$recordedAudioName}
      style={`width: ${recordedAudioNameLength}px`}
      on:keydown={enterPressHandler} />
  </span>
</div>
