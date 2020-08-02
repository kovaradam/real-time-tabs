<script lang="ts">
  import { toggleMetronome, setBPMState, recorderSettings, toggleCountIn } from '../../../stores/recorder';
  import { helpContent } from '../../../stores';
  import MetronomeIcon from '../../icons/MetronomeIcon.svelte';
  import CountInIcon from '../../icons/CountInIcon.svelte';

  const metronomeButtonHandler = () => {
    toggleMetronome();
    setMetronomeButtonHelpContent();
  };

  const countINButtonHandler = () => {
    toggleCountIn();
    setCountInButtonHelpContent();
  };

  const setMetronomeButtonHelpContent = () => {
    helpContent.set(`Toggle metronome: ${$recorderSettings.isMetronomeOn ? 'on' : 'off'}`);
  };

  const setCountInButtonHelpContent = () => {
    helpContent.set(`Toggle count in: ${$recorderSettings.isCountInOn ? 'on' : 'off'}`);
  };
</script>

<style>
  #count-in-btn {
    padding: 5px 10px;
  }
</style>

<button
  class="control-btn"
  id="bpm-btn"
  on:click={metronomeButtonHandler}
  on:mouseover={setMetronomeButtonHelpContent}>
  <MetronomeIcon/>

</button>
<input
  class="navbar-input"
  on:keydown={e => setBPMState(e)}
  bind:value={$recorderSettings.bpm}
  on:mouseover={() => helpContent.set('Set BPM')} />
<button
  on:click={countINButtonHandler}
  class="control-btn"
  id="count-in-btn"
  on:mouseover={setCountInButtonHelpContent}>
  <CountInIcon/>
</button>
