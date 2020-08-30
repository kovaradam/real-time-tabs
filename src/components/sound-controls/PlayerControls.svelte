<script lang="ts">
  import {
    setIsAudioPlayback,
    isAudioPlayback,
    setIsRecording,
    isRecording,
    stopAudioPlayback,
  } from '../../stores/player';
  import { setHelpContent } from '../../stores/help-content';
import { recordedAudioURL } from '../../stores/audio-files';

  const playButtonHandler = () => {
    setIsAudioPlayback(!$isAudioPlayback);
  };

  const recordButtonHandler = () => {
    setIsRecording(!$isRecording);
  };

  const stopButtonHandler = () => {
    if ($recordedAudioURL !== '' || $isRecording) {
      setIsRecording(false);
      stopAudioPlayback();
    }
  };
</script>

<button
  class={`fa fa-${$isAudioPlayback ? 'pause' : 'play'} control-btn`}
  disabled={$isRecording}
  on:mouseover={() => setHelpContent($isAudioPlayback ? 'Pause' : 'Play')}
  on:click={playButtonHandler} />
<button class="fa fa-stop control-btn" on:click={stopButtonHandler} on:mouseover={() => setHelpContent('Stop')} />
<button
  class="fa fa-circle control-btn"
  style={$isRecording && 'color: #ff7373'}
  disabled={$isAudioPlayback}
  on:click={recordButtonHandler}
  on:mouseover={() => setHelpContent('Record')} />
