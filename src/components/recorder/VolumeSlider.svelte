<script lang="ts">

</script>

<style>
  .volume-slider {
    -webkit-appearance: none;
    width: 60px;
    height: 15px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    cursor:pointer;
    margin-top: 8px;
    margin-left: 7px;
  }

  .volume-slider:hover {
    opacity: 1;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 15px; /* Set a specific slider handle width */
    height: 15px; /* Slider handle height */
    background: white; /* Green background */
  }

  .volume-slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 15px; /* Slider handle height */
    background: white; /* Green background */
  }
</style>

<input type="range" min="1" max="100" value="50" class="volume-slider">
