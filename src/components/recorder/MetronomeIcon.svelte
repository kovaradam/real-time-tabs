<script lang="ts">
  export let isMetronomeOn: boolean;
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
    padding-bottom: 5px;
    margin-bottom: -5px;
  }
</style>

<div class={isMetronomeOn && 'metronome-on'}>
  <i class="fa fa-circle" />
  <i class="fa fa-circle-o" />
</div>
