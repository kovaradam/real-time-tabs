<script lang="ts">
  export let isSoundOn: boolean;
</script>

<style>
  div {
    overflow: hidden;
    width: 35px;
    height: 35px;
    transition: width 200ms ease-in;
    padding-right: 0;
  }
  
  div:hover {
    width: 100px;
  }

  .volume-slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 60px;
    height: 10px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    cursor: pointer;
    padding:0;
  }

  .volume-slider:hover {
    opacity: 1;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 10px; 
    height: 10px;
    background: white; 
    margin:0;
  }

  .volume-slider::-moz-range-thumb {
    width: 10px;
    height: 10px; 
    background: white;
  }
</style>

<div>
  <button class={`fa fa-volume-${isSoundOn ? 'up' : 'off'} control-btn`} />
  <input type="range" min="1" max="100" value="50" class="volume-slider" />
</div>
