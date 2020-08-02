<script lang="ts">
  import { recorderSettings, helpContent } from '../../../stores';
  import { setTimeSignatureState } from '../../../stores/recorder';
</script>

<style>
  input {
    width: 30px;
  }

  span {
    font-size: 1.6em;
    color: rgba(255, 255, 255, 0.534);
    margin: 0 5px 5px 0;
    pointer-events: none;
  }
</style>

<input
  class="navbar-input"
  bind:value={$recorderSettings.timeSignature.upper}
  on:keydown={e => setTimeSignatureState(e, 'upper')}
  on:mouseover={() => helpContent.set('Set number of beats per bar')} />
<span>/</span>
<input
  class="navbar-input"
  bind:value={$recorderSettings.timeSignature.lower}
  on:keydown={e => setTimeSignatureState(e, 'lower')}
  on:mouseover={() => helpContent.set('Set length of a beat')} />
