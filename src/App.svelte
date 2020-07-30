<script lang="ts">
  export let name: string;
</script>

<style>
  main {
    text-align: center;
    max-width: 240px;
    margin: 30px auto;
    border-width: 1px;
    box-shadow: 0px 0px 47px -20px rgba(0, 0, 0, 0.5);
  }

  main,
  div {
    border-style: solid;
    border-color: #ff3e00;
    border-radius: 15px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
	font-weight: 100;
	pointer-events: none;
  }

  div {
    width: 100%;
    bottom: 0;
    height: 40px;
    border-width: 1px 0 0 0;
    display: flex;
    justify-content: space-evenly;
  }

  label,
  button {
    padding: 0 5px;
    color: white;
    font-weight: 500;
    border-width: 0;
    width: 50%;
    height: auto;
    border-width: 0px;
    background-color: rgba(195, 35, 35, 0.295);
    border-color: #ecd0d0;
    transition: all 200ms;
  }

  label:hover,
  button:hover {
    cursor: pointer;
    background-color: rgba(247, 247, 238, 0.1);
    color: rgba(195, 35, 35, 0.295);
  }

  #upload {
    padding-top: 9px;
    border-radius: 15px 0 0 15px;
  }

  #record {
    border-left-width: 1px;
    border-radius: 0 15px 15px 0;
    padding-top: 2px;
    margin: 0;
  }

  #upload i {
    margin-left: 5px;
  }

  #record i {
    margin-right: 5px;
  }

  input {
    display: none;
  }
</style>

<main>
  <h1>{name}</h1>
  <div>
    <label id="upload">
      Upload
      <input type="file" />
      <i class="fa fa-upload" aria-hidden="true" />
    </label>
    <button id="record">
      <i class="fa fa-microphone" aria-hidden="true" />
      Record
    </button>
  </div>
</main>
