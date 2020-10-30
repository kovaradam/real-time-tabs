<script lang="ts">
  import Icon from 'svelte-awesome';
  import { github } from 'svelte-awesome/icons';
</script>

<style>
  div {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px 20px;
  }

  a {
    margin: 0 10px;
    vertical-align: text-top;
  }
  button,
  a {
    background-color: transparent;
    color: rgb(134, 134, 134);
    border: none;
    font-weight: 300;
    font-size: 1.2em;
  }

  a:hover,
  button:hover {
    color: black;
    cursor: pointer;
    text-decoration: none;
  }
</style>

<div>
  <button>Help</button>
  <button>About</button>
  <a href="https://github.com/kovaradam/real-time-tabs" target="_blank" rel="noreferrer noopener">
    <Icon data={github} scale="1.2" />
  </a>
</div>
