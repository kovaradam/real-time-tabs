<script lang="ts">
  import Navbar from '../navbar/Navbar.svelte';
  import Help from '../help/Help.svelte';
  import PlayerControls from '../sound-controls/PlayerControls.svelte';
  import SoundControls from '../sound-controls/SoundControls.svelte';
  import MetronomeControls from '../sound-controls/MetronomeControls.svelte';
  import TimeSignatureControls from '../sound-controls/TimeSignatureControls.svelte';
  import Main from './Contents.svelte';
  import { setHelpContent } from '../../stores/help-content';
  import FileControls from '../file-controls/FileControls.svelte';

  setHelpContent('Recording tool');
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

  .right-bordered {
    border: solid rgba(255, 255, 255, 0.288);
    border-width: 0 1px 0 0;
  }
</style>

<main>
  <Navbar>
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
      <FileControls />
    </div>
  </Navbar>
  <Main />
  <Help />
</main>
