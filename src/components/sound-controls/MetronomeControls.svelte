<script lang="ts">
  import { toggleMetronome, setBPMState, recorderSettings, toggleCountIn } from '../../stores/recorder';
  import MetronomeIcon from '../icons/MetronomeIcon.svelte';
  import CountInIcon from '../icons/CountInIcon.svelte';
  import { setHelpContent } from '../../stores/help-content';

  const metronomeButtonHandler = () => {
    toggleMetronome();
    setMetronomeButtonHelpContent();
  };

  const countINButtonHandler = () => {
    toggleCountIn();
    setCountInButtonHelpContent();
  };

  const setMetronomeButtonHelpContent = () => {
    setHelpContent(`Toggle metronome: ${$recorderSettings.isMetronomeOn ? 'on' : 'off'}`);
  };

  const setCountInButtonHelpContent = () => {
    setHelpContent(`Toggle count in: ${$recorderSettings.isCountInOn ? 'on' : 'off'}`);
  };
</script>

<style>
  #count-in-btn {
    padding: 5px 10px;
  }
</style>

<button class="control-btn" id="bpm-btn" on:click={metronomeButtonHandler} on:mouseover={setMetronomeButtonHelpContent}>
  <MetronomeIcon />

</button>
<input
  class="navbar-input"
  on:keydown={e => setBPMState(e)}
  bind:value={$recorderSettings.bpm}
  on:mouseover={() => setHelpContent('Set tempo')} />
<button
  on:click={countINButtonHandler}
  class="control-btn"
  id="count-in-btn"
  on:mouseover={setCountInButtonHelpContent}>
  <CountInIcon />
</button>
