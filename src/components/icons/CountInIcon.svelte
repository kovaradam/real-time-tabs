<script lang="ts">
  import { recorderStore } from '../../stores/recorder';
</script>

<style>
  div p {
    font-weight: 300;
    font-size: 0.6em;
    color: rgb(255, 255, 255);
    margin: 0;
    padding: 0;
  }

  .count-in-on {
    border: solid rgba(255, 255, 255, 0.623);
    border-width: 0 0 1px 0;
    padding-bottom: 5px;
    margin-bottom: -5px;
  }
</style>

<div class:count-in-on={$recorderStore.isCountInOn}>
  <p>
    CNT
    <br />
    IN
  </p>
</div>
