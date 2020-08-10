<script lang="ts">
  import { helpContent } from '../../stores';
  import { audioPlayer } from '../../audio/player';
  import { OscillatorSource } from '../../audio/source';
  import { setIsAudioPlayback, isAudioPlayback, setIsRecording, isRecording } from '../../stores/player';

  const playButtonHandler = () => {
    //  test
    if (audioPlayer.getSource() === undefined) {
      audioPlayer.setAudioSource(OscillatorSource.createSource);
    }
    //
    setIsAudioPlayback(true);
  };

  const recordButtonHandler = () => {
    setIsRecording(true);
  };

  const stopButtonHandler = () => {
    setIsRecording(false);
    setIsAudioPlayback(false);
    audioPlayer.stop();
  };
</script>

<button
  class={'fa fa-play control-btn'}
  style={$isAudioPlayback && 'color: #4bff4bb8'}
  disabled={$isRecording}
  on:mouseover={() => helpContent.set('Play')}
  on:click={playButtonHandler} />
<button class="fa fa-stop control-btn" on:click={stopButtonHandler} on:mouseover={() => helpContent.set('Stop')} />
<button
  class="fa fa-circle control-btn"
  style={$isRecording && 'color: #ff7373'}
  disabled={$isAudioPlayback}
  on:click={recordButtonHandler}
  on:mouseover={() => helpContent.set('Record')} />
