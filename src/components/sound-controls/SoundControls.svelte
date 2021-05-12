<script lang="ts">
  import { recorderStore, setIsMicrophoneOn } from '../../stores/recorder';
  import { playerSettings } from '../../stores/player';
  import { setHelpContent } from '../../stores/help-content';
  import Icon from 'svelte-awesome';
  import { microphone, microphoneSlash, volumeUp, volumeOff } from 'svelte-awesome/icons';

  let volumeSliderValue = 50;

  const soundButtonHandler = () => {
    $playerSettings.isSoundOn = !$playerSettings.isSoundOn;
    const volume = $playerSettings.isSoundOn ? volumeSliderValue : 0;
    $playerSettings.volume = volume;
    setSoundButtonHelpContent();
  };

  const microphoneButtonHandler = async () => {
    const prevState = $recorderStore.isMicrophoneOn;
    await setIsMicrophoneOn(!$recorderStore.isMicrophoneOn);
    if (!prevState && !$recorderStore.isMicrophoneOn) {
      setHelpContent('Could not access microphone on your device', true);
    } else {
      setMicrophoneButtonHelpContent();
    }
  };

  const volumeSliderInputHandler = () => {
    $playerSettings.isSoundOn = true;
    $playerSettings.volume = volumeSliderValue;
    setVolumeSliderHelpContent();
  };

  const setMicrophoneButtonHelpContent = () => {
    setHelpContent(`Toggle microphone: ${$recorderStore.isMicrophoneOn ? 'on' : 'off'}`);
  };

  const setSoundButtonHelpContent = () => {
    setHelpContent(`Toggle sound: ${$playerSettings.isSoundOn ? 'on' : 'off'}`);
  };

  const setVolumeSliderHelpContent = () => {
    setHelpContent(`Adjust volume: ${volumeSliderValue}%`);
  };
</script>

<style>
  div {
    overflow: hidden;
    width: 35px;
    height: 38px;
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

<button class="control-btn" on:click={microphoneButtonHandler} on:mouseover={setMicrophoneButtonHelpContent}>
  <Icon data={$recorderStore.isMicrophoneOn ? microphone : microphoneSlash} />
</button>
<div>
  <button class="control-btn" on:mouseover={setSoundButtonHelpContent} on:click={soundButtonHandler}>
    <Icon data={$playerSettings.isSoundOn ? volumeUp : volumeOff} />
  </button>
  <input
    type="range"
    min="1"
    max="100"
    class="volume-slider"
    bind:value={volumeSliderValue}
    on:mouseover={setVolumeSliderHelpContent}
    on:input={volumeSliderInputHandler} />
</div>
