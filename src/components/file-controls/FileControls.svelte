<script lang="ts">
  import { setHelpContent } from '../../stores/help-content';
  import textContent from '../../data/text-content';
  function downloadButtonHandler() {
    setHelpContent(textContent.error.noFileToDownload, true);
  }
</script>

<style>

</style>

<button
  class="control-btn fa fa-download"
  on:mouseover={() => setHelpContent('Download recording')}
  on:click={downloadButtonHandler} />
