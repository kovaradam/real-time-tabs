<script lang="ts">
  import { helpContent } from '../../stores/help-content';
</script>

<style>
  p {
    text-align: center;
    font-weight: 300;
    transition: all 200ms;
    font-size: 0.9em;
    margin: 5px 10px;
  }

  div {
    position: absolute;
    background-color: transparent;
    bottom: 0;
    border-top-right-radius: 15px;
  }
</style>

<div id="help">
  <p>{$helpContent}</p>
</div>
