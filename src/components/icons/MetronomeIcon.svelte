<script lang="ts">
  import { recorderSettings } from '../../stores/recorder-settings';
  import Icon from 'svelte-awesome';
  import { circle, circleO } from 'svelte-awesome/icons';
</script>

<style>
  div {
    display: flex;
  }

  div i {
    margin: 0 1px;
  }

  div:hover {
    flex-direction: row-reverse;
  }

  .metronome-on {
    border: solid rgba(255, 255, 255, 0.623);
    border-width: 0 0 1px 0;
    padding-bottom: 9px;
    margin-bottom: -9px;
  }
</style>

<div class:metronome-on={$recorderSettings.isMetronomeOn}>
  <Icon data={circle} />
  <Icon data={circleO} />
</div>
