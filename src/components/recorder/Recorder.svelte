<script lang="ts">
  import Navbar from '../navbar/Navbar.svelte';
  import Help from '../help/Help.svelte';
  import PlayerControls from '../player/PlayerControls.svelte';
  import SoundControls from '../player/SoundControls.svelte';
  import { helpContent, playerState } from '../../stores';
  import MetronomeControls from './controls/MetronomeControls.svelte';
  import TimeSignatureControls from './controls/TimeSignatureControls.svelte';

  helpContent.set('Recording tool');
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

  p {
    margin: 40px auto;
    text-align: center;
    font-weight: 300;
    font-size: 1.5em;
    transition: all 20ms;
  }
</style>

<main>
  <Navbar >
    <div class="right-bordered">
      <PlayerControls />
    </div>
    <div class="right-bordered">
      <MetronomeControls />
    </div>
    <div class="right-bordered">
      <TimeSignatureControls />
    </div>
    <div class="right-bordered">
      <SoundControls />
    </div>
    <div>
      <button class="control-btn fa fa-download" on:mouseover={() => helpContent.set('Download recording')} />
    </div>
  </Navbar>
  <section class="contents">
    <p>{$playerState.isPlayback ? 'Sound test...' : 'Recorder'}</p>
  </section>
  <Help />
</main>
