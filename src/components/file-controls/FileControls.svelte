<script lang="ts">
  import { setHelpContent } from '../../stores/help-content';
  import { uploadAudioFile } from '../../stores/audio-files';
import { stopAudioPlayback } from '../../stores/player';

  const uploadClickHandler = (event: any) => {
    stopAudioPlayback();
    uploadAudioFile(event);
  };
</script>

<style>
  label:hover {
    cursor: pointer;
  }

  input {
    display: none;
  }
</style>

<label class="control-btn fa fa-upload" on:mouseover={() => setHelpContent('Upload recording')}>
  <input type="file" accept="audio/*" on:change={uploadClickHandler} />
</label>
