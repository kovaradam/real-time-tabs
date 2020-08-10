<script lang="ts">
  import { helpContent, recorderSettings } from '../../stores';
  import { playerSettings } from '../../stores/player';
  import {audioPlayer} from '../../audio/player';
  import {microphone} from '../../audio/microphone';

  let volumeSliderValue = 50;

  const soundButtonHandler = () => {
    $playerSettings.isSoundOn = !$playerSettings.isSoundOn;
    const volume = $playerSettings.isSoundOn ? volumeSliderValue : 0;
    $playerSettings.volume = volume;
    audioPlayer.setVolume(volume);
    setSoundButtonHelpContent();
  };

  const microphoneButtonHandler = () => {
    $recorderSettings.isMicrophoneOn = !$recorderSettings.isMicrophoneOn;
    if ($recorderSettings.isMicrophoneOn) {
      microphone.connect();
    } else {
      microphone.disconnect();
    }
    setMicrophoneButtonHelpContent();
  };

  const volumeSliderInputHandler = () => {
    $playerSettings.isSoundOn = true;
    audioPlayer.setVolume(volumeSliderValue);
    setVolumeSliderHelpContent();
  };

  const setMicrophoneButtonHelpContent = () => {
    helpContent.set(`Toggle microphone: ${$recorderSettings.isMicrophoneOn ? 'on' : 'off'}`);
  };

  const setSoundButtonHelpContent = () => {
    helpContent.set(`Toggle sound: ${$playerSettings.isSoundOn ? 'on' : 'off'}`);
  };

  const setVolumeSliderHelpContent = () => {
    helpContent.set(`Adjust volume: ${$playerSettings.volume}%`);
  };
</script>

<style>
  div {
    overflow: hidden;
    width: 35px;
    height: 35px;
    transition: width 200ms ease-in;
    padding-right: 0;
  }

  div:hover {
    width: 100px;
  }

  .volume-slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 60px;
    height: 10px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    cursor: pointer;
    padding: 0;
  }

  .volume-slider:disabled {
    pointer-events: none;
  }

  .volume-slider:hover {
    opacity: 1;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 10px;
    height: 10px;
    background: white;
    margin: 0;
  }

  .volume-slider::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background: white;
  }
</style>

<button
  class={`fa fa-microphone${$recorderSettings.isMicrophoneOn ? '' : '-slash'} control-btn`}
  on:click={microphoneButtonHandler}
  on:mouseover={setMicrophoneButtonHelpContent} />
<div>
  <button
    class={`fa fa-volume-${$playerSettings.isSoundOn ? 'up' : 'off'} control-btn`}
    on:mouseover={setSoundButtonHelpContent}
    on:click={soundButtonHandler} />
  <input
    type="range"
    min="1"
    max="100"
    class="volume-slider"
    bind:value={volumeSliderValue}
    on:mouseover={setVolumeSliderHelpContent}
    on:input={volumeSliderInputHandler} />
</div>
