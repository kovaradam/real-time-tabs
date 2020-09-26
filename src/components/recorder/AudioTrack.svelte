<script lang="ts">
  import { currentTime, setAudioCurrentTime } from '../../stores/player';
  import { recordedAudioDuration, recordedAudioURL } from '../../stores/audio-files';
  import TrackCursor from './TrackCursor.svelte';
  import visualizeAudio, { config } from '../../audio/visualizer';

  const viewBox = `0 0 ${config.samples + 1} ${config.maxAmplitude}`;

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

  svg {
    position: absolute;
    width: 100%;
    height: 50%;
    top: 50%;
    z-index: 0;
  }

  polyline {
    fill: white;
    fill-opacity: 0.5;
    stroke: rgba(128, 128, 128, 0.384);
  }

  .upper {
    top: 0;
    transform: scaleY(-1);
  }
</style>

<div id="audio-track" on:mousemove={trackMouseOverHandler} on:mouseout={hideTrackCursor} on:click={trackClickHandler}>
  <span id="status-bar" style={`width: ${($currentTime / $recordedAudioDuration) * 100}%`} />
  <TrackCursor position={trackCursorPosition} />
  <svg class="upper" {viewBox} preserveAspectRatio="none">
    <polyline points={trackSVGpoints} />
  </svg>
  <svg {viewBox} preserveAspectRatio="none">
    <polyline points={trackSVGpoints} />
  </svg>

</div>
