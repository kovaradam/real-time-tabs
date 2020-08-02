<script lang="ts">
  import Navbar from '../navbar/Navbar.svelte';
  import Help from '../help/Help.svelte';
  import MetronomeIcon from '../icons/MetronomeIcon.svelte';
  import VolumeSlider from '../volume-slider/VolumeSlider.svelte';
  import CountInIcon from '../icons/CountInIcon.svelte';

  export let toggleVisibility: () => void;

  let content = 'Recording tool';
  const settings = {
    isMetronomeOn: false,
    isSoundOn: true,
    isMicrophoneOn: false,
    isCountInOn: false,
    bpm: 110,
    timeSignature: { upper: 4, lower: 4 },
  };

  const playerState = {
    isRecording: false,
    isPlayback: false,
  };

  const changeTimeSignature = (event: KeyboardEvent, type: 'upper' | 'lower') => {
    if (event.key === 'ArrowUp') {
      settings.timeSignature[type] += 1;
    }
    if (event.key === 'ArrowDown') {
      settings.timeSignature[type] -= settings.timeSignature[type] > 0 ? 1 : 0;
    }
  };

  const changeBPM = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      settings.bpm += 1;
    }
    if (event.key === 'ArrowDown') {
      settings.bpm -= settings.bpm > 0 ? 1 : 0;
    }
  };

  const setIsPlayback = (isPlayback: boolean) => {
    playerState.isPlayback = isPlayback;
  };

  const setIsRecording = (isRecording: boolean) => {
    playerState.isRecording = isRecording;
  };

  const toggleMetronome = () => {
    settings.isMetronomeOn = !settings.isMetronomeOn;
  };

  const toggleSound = () => {
    settings.isSoundOn = !settings.isSoundOn;
  };

  const toggleMicrophone = () => {
    settings.isMicrophoneOn = !settings.isMicrophoneOn;
  };

  const toggleCountIn = () => {
    settings.isCountInOn = !settings.isCountInOn;
  };

  const playButtonHandler = () => {
    setIsPlayback(true);
  };

  const recordButtonHandler = () => {
    setIsRecording(true);
  };

  const stopButtonHandler = () => {
    setIsRecording(false);
    setIsPlayback(false);
  };

  const metronomeButtonHandler = () => {
    toggleMetronome();
  };

  const soundButtonHandler = () => {
    toggleSound();
  };

  const microphoneButtonHandler = () => {
    toggleMicrophone();
  };

  const countINButtonHandler = () => {
    toggleCountIn();
  };
</script>

<style>
  main {
    position: relative;
    margin-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  div {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-grow: 1;
    margin: 15px 0;
    padding: 0 10px;
    overflow: hidden;
  }

  input {
    margin: 0 10px 0 5px;
    border: none;
    background-color: var(--main-pink);
    caret-color: white;
    width: 50px;
    padding: 4px;
    color: rgba(255, 255, 255, 0.664);
    text-align: center;
  }

  input:focus {
    outline-color: transparent;
  }

  p {
    margin: 40px auto;
    text-align: center;
    font-weight: 300;
    font-size: 1.5em;
    transition: all 20ms;
  }

  .ts-controls input {
    width: 30px;
  }

  .ts-controls span {
    font-size: 1.6em;
    color: rgba(255, 255, 255, 0.534);
    margin: 0 5px 5px 0;
    pointer-events: none;
  }

  #count-in-btn {
    padding: 5px 10px;
  }
</style>

<main>
  <Navbar {toggleVisibility}>
    <div class="audio-controls right-bordered">
      <button
        class={'fa fa-play control-btn'}
        style={playerState.isPlayback && 'color: #4bff4bb8'}
        disabled={playerState.isRecording}
        on:mouseover={() => (content = 'Play')}
        on:click={playButtonHandler} />
      <button class="fa fa-stop control-btn" on:click={stopButtonHandler} on:mouseover={() => (content = 'Stop')} />
      <button
        class="fa fa-circle control-btn"
        style={playerState.isRecording && 'color: #ff7373'}
        disabled={playerState.isPlayback}
        on:click={recordButtonHandler}
        on:mouseover={() => (content = 'Record')} />
    </div>
    <div class="bpm-controls right-bordered">
      <button
        class="control-btn"
        id="bpm-btn"
        on:click={metronomeButtonHandler}
        on:mouseover={() => (content = 'Toggle metronome')}>
        <MetronomeIcon isMetronomeOn={settings.isMetronomeOn} />

      </button>
      <input on:keydown={e => changeBPM(e)} bind:value={settings.bpm} on:mouseover={() => (content = 'Set BPM')} />
      <button on:click={countINButtonHandler} class="control-btn" id="count-in-btn" on:mouseover={() => (content = 'Toggle count in')}>
        <CountInIcon isCountInOn={settings.isCountInOn} />
      </button>
    </div>
    <div class="ts-controls right-bordered">
      <input
        bind:value={settings.timeSignature.upper}
        on:keydown={e => changeTimeSignature(e, 'upper')}
        on:mouseover={() => (content = 'Set number of beats per bar')} />
      <span>/</span>
      <input
        bind:value={settings.timeSignature.lower}
        on:keydown={e => changeTimeSignature(e, 'lower')}
        on:mouseover={() => (content = 'Set length of a beat')} />
    </div>
    <div class="right-bordered">
      <button
        class={`fa fa-microphone${settings.isMicrophoneOn ? '' : '-slash'} control-btn`}
        on:click={microphoneButtonHandler}
        on:mouseover={() => (content = 'Toggle microphone')} />
      <!-- <button
        class={`fa fa-volume-${settings.isSoundOn ? 'up' : 'off'} control-btn`}
        on:click={soundButtonHandler}
        on:mouseover={() => (content = 'Toggle volume')} /> -->
        <VolumeSlider isSoundOn={settings.isSoundOn}/>
    </div>
    <div>
      <button class="control-btn fa fa-download" on:mouseover={() => (content = 'Download recording')} />
    </div>
  </Navbar>
  <section class="contents">
    <p>Recorder</p>
  </section>
  <Help {content} />
</main>
