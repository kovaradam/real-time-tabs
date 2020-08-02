<script lang="ts">
  import { recorderSettings } from '../../stores';
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

<div class={$recorderSettings.isMetronomeOn && 'metronome-on'}>
  <i class="fa fa-circle" />
  <i class="fa fa-circle-o" />
</div>
