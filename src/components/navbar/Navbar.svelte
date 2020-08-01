<script lang="ts">
  export let toggleVisibility: () => void;
</script>

<style>
  section {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    background-color: var(--main-pink);
  }

  .controls-container {
    display: flex;
    justify-content: start;
  }

  section i {
    padding: 8px;
    font-size: 1.2em;
    color: var(--main-pink);
    background-color: white;
    height: min-content;
    border-radius: 0 0 0 15px;
  }

  section i:hover {
    cursor: pointer;
    color: white;
    background-color: rgba(255, 255, 255, 0);
  }
  section i:active {
    background-color: var(--main-pink);
  }
</style>

<section>
  <div class="controls-container">
    <slot />
  </div>
  <i class="fa fa-close" on:click={toggleVisibility} />
</section>
