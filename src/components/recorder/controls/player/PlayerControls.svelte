<script lang="ts">
  import { recorderState, helpContent } from '../../../../stores';
  import { setIsPlayback, setIsRecording } from '../../../../stores/recorder';

  const playButtonHandler = () => {
    setIsPlayback(true);
  };

  const recordButtonHandler = () => {
    setIsRecording(true);
  };

  const stopButtonHandler = () => {
    setIsRecording(false);
    setIsPlayback(false);
  };
</script>

<style>

</style>

<button
  class={'fa fa-play control-btn'}
  style={$recorderState.isPlayback && 'color: #4bff4bb8'}
  disabled={$recorderState.isRecording}
  on:mouseover={() => helpContent.set('Play')}
  on:click={playButtonHandler} />
<button class="fa fa-stop control-btn" on:click={stopButtonHandler} on:mouseover={() => helpContent.set('Stop')} />
<button
  class="fa fa-circle control-btn"
  style={$recorderState.isRecording && 'color: #ff7373'}
  disabled={$recorderState.isPlayback}
  on:click={recordButtonHandler}
  on:mouseover={() => helpContent.set('Record')} />
