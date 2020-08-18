<script lang="ts">
  import { isAudioPlayback, isRecording } from '../../stores/player';
</script>

<style>
  p {
    margin: 40px auto;
    text-align: center;
    font-weight: 300;
    font-size: 1.5em;
    transition: all 200ms;
  }

  section {
    transition: all 100ms
  }

  .is-recording {
    background-color: #ff000017;
  }
</style>

<section class="contents" class:is-recording={$isRecording}>
  <p>{$isAudioPlayback ? 'Sound test...' : $isRecording ? 'Recording...' : 'Recorder'}</p>
</section>
