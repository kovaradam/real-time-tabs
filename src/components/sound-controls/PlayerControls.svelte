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
  import Icon from 'svelte-awesome';
  import { pause, play, stop, circle } from 'svelte-awesome/icons';

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
  class="control-btn"
  disabled={$isRecording}
  on:mouseover={() => setHelpContent($isAudioPlayback ? 'Pause' : 'Play')}
  on:click={playButtonHandler}>
  <Icon data={$isAudioPlayback ? pause : play} />
</button>
<button class="control-btn" on:click={stopButtonHandler} on:mouseover={() => setHelpContent('Stop')}>
  <Icon data={stop} />
</button>
<button
  class="control-btn"
  style={$isRecording && 'color: #ff7373'}
  disabled={$isAudioPlayback}
  on:click={recordButtonHandler}
  on:mouseover={() => setHelpContent('Record')}>
  <Icon data={circle} />
</button>
