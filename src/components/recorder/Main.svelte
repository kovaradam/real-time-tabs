<script lang="ts">
  import { isAudioPlayback, isRecording } from '../../stores/player';
  import { recordedAudioURL } from '../../stores/audio-files';
</script>

<style>
  p {
    margin: 40px auto;
    text-align: center;
    font-weight: 300;
    font-size: 1.5em;
    transition: all 200ms;
  }

  div {
    margin: auto;
    width: 50%;
  }

  section {
    transition: all 100ms;
  }

  .is-recording {
    background-color: #ff000017;
  }
</style>

<section class="contents" class:is-recording={$isRecording}>
  {#if $recordedAudioURL}
    <div>
      <audio >
        <source src={$recordedAudioURL} type="audio/wav" />
      </audio>
    </div>
  {:else}
    <p>{$isAudioPlayback ? 'Sound test...' : $isRecording ? 'Recording...' : 'Recorder'}</p>
  {/if}
</section>
