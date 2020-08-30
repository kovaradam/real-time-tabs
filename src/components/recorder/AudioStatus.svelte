<script lang="ts">
  import { secondsToMinutesString } from '../../audio/utils';

  import { recordedAudioDuration, recordedAudioName } from '../../stores/audio-files';
  import { currentTime } from '../../stores/player';

  $: recordedAudioNameLength = $recordedAudioName.length * 7.2 + 5;

  function enterPressHandler(event: KeyboardEvent) {
    if(event.key === 'Enter' || event.key === 'Escape') {
      (event.target as HTMLTextAreaElement).blur();
    }
  }
</script>

<style>
  div {
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  #audio-status-panel {
    box-shadow: inset 0px 1px 4px -1px rgba(0, 0, 0, 0.37);
    background-color: rgb(226, 223, 223);
    border-bottom-right-radius: 15px;
    width: min-content;
    height: min-content;
    display: flex;
    animation: slide-down 200ms ease-in;
    transition: width 200ms;
  }

  @keyframes slide-down {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }

  p {
    text-align: center;
    font-weight: 200;
    transition: all 200ms;
    font-size: 0.9em;
    margin: 5px 0px 4px 10px;
    padding-right: 10px;
    white-space: nowrap;
    border-right: 1px solid rgba(0, 0, 0, 0.218);
    min-width: 70px;
  }

  input {
    margin: 6px 5px 4px 10px;
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

<div>
  <span id="audio-status-panel">
    <p>{`${secondsToMinutesString($currentTime)} / ${secondsToMinutesString($recordedAudioDuration)}`}</p>
    <input bind:value={$recordedAudioName} style={`width: ${recordedAudioNameLength}px`} on:keydown={enterPressHandler}/>
  </span>
</div>
