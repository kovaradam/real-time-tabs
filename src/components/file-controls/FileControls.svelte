<script lang="ts">
  import { setHelpContent } from '../../stores/help-content';
  import { uploadAudioFile } from '../../stores/audio-files';
  import { stopAudioPlayback } from '../../stores/player';
  import Icon from 'svelte-awesome';
  import { upload } from 'svelte-awesome/icons';

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

<label class="control-btn" on:mouseover={() => setHelpContent('Upload recording')}>
  <Icon data={upload} />
  <input type="file" accept="audio/*" on:change={uploadClickHandler} />
</label>
