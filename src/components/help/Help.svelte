<script lang="ts">
  import { helpContent } from '../../stores/help-content';
  import { isErrorMessage } from '../../stores/help-content';
</script>

<style>
  p {
    text-align: center;
    font-weight: 300;
    transition: all 200ms;
    font-size: 0.9em;
    margin: 5px 5px;
    padding: 0 5px;
    border-radius: 5px;
  }

  div {
    position: absolute;
    background-color: transparent;
    bottom: 0;
    border-top-right-radius: 15px;
  }
  
  .error {
    animation: error-alert 0.7s ease-out;
  }

  @keyframes error-alert {
    from {
      background-color: var(--alert-yellow);
    }
    to {
      background-color: transparent;
    }
  }
</style>

<div id="help">
  <p class:error={$isErrorMessage}>{$helpContent}</p>
</div>
