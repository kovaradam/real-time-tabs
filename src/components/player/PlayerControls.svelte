<script lang="ts">
  import { playerState, helpContent } from '../../stores';
  import audioPlayer from '../../audio/player';
  import { OscillatorSource } from '../../audio/source';

  const playButtonHandler = () => {
    //  test
    if (audioPlayer.getSource() === null) {
      audioPlayer.setAudioSource(OscillatorSource.createSource);
    }
    if (audioPlayer.start()) {
      $playerState.isPlayback = true;
    }
  };

  const recordButtonHandler = () => {
    $playerState.isRecording = true;
  };

  const stopButtonHandler = () => {
    $playerState.isRecording = false;
    $playerState.isPlayback = false;
    audioPlayer.stop();
  };
</script>

<button
  class={'fa fa-play control-btn'}
  style={$playerState.isPlayback && 'color: #4bff4bb8'}
  disabled={$playerState.isRecording}
  on:mouseover={() => helpContent.set('Play')}
  on:click={playButtonHandler} />
<button class="fa fa-stop control-btn" on:click={stopButtonHandler} on:mouseover={() => helpContent.set('Stop')} />
<button
  class="fa fa-circle control-btn"
  style={$playerState.isRecording && 'color: #ff7373'}
  disabled={$playerState.isPlayback}
  on:click={recordButtonHandler}
  on:mouseover={() => helpContent.set('Record')} />
