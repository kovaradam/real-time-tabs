<script lang="ts">
  import { isRecording, recorderStatusContent } from '../../stores/player';
  import { recordedAudioURL } from '../../stores/audio-files';
  import AudioTrack from './AudioTrack.svelte';
  import AudioStatus from './AudioStatus.svelte';

  $: isRecordedAudio = $recordedAudioURL !== '';
</script>

<style>
  p {
    margin: 40px auto;
    text-align: center;
    font-weight: 300;
    font-size: 1.5em;
    pointer-events: none;
    transition: all 200ms;
  }

  section {
    transition: all 100ms;
  }

  .is-recording {
    background-color: #ff000017;
  }
</style>

<section class="contents" class:is-recording={$isRecording}>
  <p>{$recorderStatusContent}</p>
  {#if isRecordedAudio}
    <AudioStatus />
    <AudioTrack />
  {/if}
</section>
