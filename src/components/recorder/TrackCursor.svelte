<script lang="ts">
import { secondsToMinutes } from "../../audio/utils";

import { recordedAudioDuration } from "../../stores/audio-files";


  export let position = 0;
  let correctTimeStampPosition = 0;
  const timeStampWidthOffset = 4;
  
  $: if (position + timeStampWidthOffset > 100) {
    correctTimeStampPosition = 100 - timeStampWidthOffset;
  } else {
    correctTimeStampPosition = position;
  }

  $: trackPosition = secondsToMinutes(($recordedAudioDuration / 100) * position);
</script>

<style>
  * {
    top: 0;
    position: absolute;
    height: 100%;
  }

  #track-cursor {
    height: 100%;
    width: 2px;
    background-color: rgba(255, 255, 0, 0.377);
  }

  #time-stamp {
    top: 0;
    left: 5px;
    height: 10%;
    width: min-content;
    margin: 3px;
    margin-left: 5px;
    font-size: 10px;
    font-weight: 100;
    color: grey;
  }
</style>

{#if position !== 0}
  <span id="track-cursor" style={`left: ${position}%`} />
  <p id="time-stamp" style={`left: ${correctTimeStampPosition}%`}>{trackPosition}</p>
{/if}
