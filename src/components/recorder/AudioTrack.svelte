<script lang="ts">
  import { currentTime, setAudioCurrentTime } from '../../stores/player';
  import { recordedAudioDuration, recordedAudioURL } from '../../stores/audio-files';
  import TrackCursor from './TrackCursor.svelte';
  import visualizeAudio, { config } from '../../audio/visualizer';
  import { setHelpContent } from '../../stores/help-content';
  import textContent from '../../data/text-content';

  const viewBox = `0 0 ${config.samples} ${config.maxAmplitude}`;

  let trackCursorPosition = 0;
  let trackSVGpoints = '';

  $: visualizeAudio($recordedAudioURL).then(SVGpoints => (trackSVGpoints = SVGpoints || ''));

  function getRelativeMousePositionOnTrack(event: MouseEvent) {
    const recorderWidth = document.getElementById('audio-track').offsetWidth;
    const containerOffset = document.getElementById('main-container').offsetLeft;
    const x = event.pageX - containerOffset;
    return (x / recorderWidth) * 100;
  }

  function trackMouseOverHandler(event: MouseEvent) {
    setHelpContent(textContent.help.audioTrack);
    trackCursorPosition = getRelativeMousePositionOnTrack(event);
  }

  function trackClickHandler(event: MouseEvent) {
    setAudioCurrentTime(($recordedAudioDuration / 100) * getRelativeMousePositionOnTrack(event));
  }

  function hideTrackCursor() {
    trackCursorPosition = 0;
  }
</script>

<style>
  div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  span {
    position: absolute;
    top: 0;
  }

  #status-bar {
    height: 100%;
    transition: width 300ms;
    background-color: rgba(128, 128, 128, 0.384);
  }

  @keyframes slideRight {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  #track-blocker {
    background-color: white;
    z-index: 1;
    right: 0;
    animation: slideRight 200ms ease-in forwards;
  }

  svg {
    position: absolute;
    width: 100%;
    height: 50%;
    top: 50%;
    z-index: 0;
  }

  polyline {
    fill: white;
    opacity: 0.7;
    stroke: rgba(128, 128, 128, 0.384);
  }

  .upper {
    top: 0;
    transform: scaleY(-1);
  }

  p {
    margin: 40px auto;
    text-align: center;
    width: 100%;
    font-size: 2em;
    pointer-events: none;
    color: #9696968a;
  }
</style>

<div id="audio-track" on:mousemove={trackMouseOverHandler} on:mouseout={hideTrackCursor} on:click={trackClickHandler}>
  <TrackCursor position={trackCursorPosition} />
  <span id="status-bar" style={`width: ${($currentTime / $recordedAudioDuration) * 100}%`} />
  {#if trackSVGpoints !== ''}
    <div id="track-blocker" />
    <svg class="upper" {viewBox} preserveAspectRatio="none">
      <polyline points={trackSVGpoints} />
    </svg>
    <svg {viewBox} preserveAspectRatio="none">
      <polyline points={trackSVGpoints} />
    </svg>
  {:else}
    <p class="fa fa-spinner fa-spin" />
  {/if}
</div>
