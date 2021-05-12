<script lang="ts">
  import { recordedAudioURL } from '../../stores/audio-files';
  import AudioTrack from './AudioTrack.svelte';
  import AudioStatusPanel from './AudioStatusPanel.svelte';
  import AudioFilePanel from './AudioFilePanel.svelte';
  import Icon from 'svelte-awesome';
  import { microphone } from 'svelte-awesome/icons';
  import { recorderStatusContent } from '../../stores/recorder-content';
  import { recorderStore } from '../../stores/recorder';

  $: isRecordedAudio = $recordedAudioURL !== '';
</script>

<style>
  section {
    transition: all 100ms;
    display: flex;
    justify-content: center;
  }

  .is-recording {
    background-color: #ff000017;
  }

  p,
  span {
    align-self: center;
    width: min-content;
    text-align: center;
    font-weight: 300;
    font-size: 1.5em;
    pointer-events: none;
    transition: all 200ms;
    color: grey;
    white-space: nowrap;
  }

  span {
    position: absolute;
    width: 100%;
  }

  #anim-icon {
    transform: scale(2);
    animation: icon-animation 1500ms ease-in-out 150ms infinite;
  }

  .anim-circle {
    border: 1px solid grey;
    width: 0;
    border-radius: 100%;
    animation: circle-animation 1500ms ease-in-out infinite;
  }

  .delayed {
    animation-delay: 200ms;
  }

  @keyframes icon-animation {
    0% {
      transform: scale(2);
    }
    15% {
      transform: scale(1.8);
    }
    100% {
      transform: scale(1.8);
    }
  }

  @keyframes circle-animation {
    from {
      width: 0px;
      height: 0px;
      opacity: 1;
    }
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }
</style>

<section class="contents" class:is-recording={$recorderStore.isRecording}>
  {#if isRecordedAudio}
    <AudioStatusPanel />
    <AudioFilePanel />
    <AudioTrack />
  {:else if $recorderStore.isRecording}
    <span class="anim-circle" />
    <span class="anim-circle delayed" />
    <span id="anim-icon" class="delayed">
      <Icon data={microphone} />
    </span>
  {:else}
    <p>{$recorderStatusContent}</p>
  {/if}
</section>
