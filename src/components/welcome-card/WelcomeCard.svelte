<script lang="ts">
  import textContent from '../../data/text-content';
  import { uploadAudioFile } from '../../stores/audio-files';
  import { viewState } from '../../stores/view';
  import { ViewState } from '../../utils/enums';
  import Icon from 'svelte-awesome';
  import { upload, microphone } from 'svelte-awesome/icons';

  const uploadClickHandler = (event: any) => {
    uploadAudioFile(event);
    viewState.set(ViewState.RECORDER);
  };

  const recordClickHandler = () => {
    viewState.set(ViewState.RECORDER);
  };
</script>

<style>
  main {
    text-align: center;
    margin: 0;
    z-index: 1;
    overflow: hidden;
    height: 380px;
    width: 240px;
  }

  div {
    border-style: solid;
    border-color: var(--border-red);
    border-radius: 15px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    pointer-events: none;
  }

  main div {
    width: 100%;
    height: 40px;
    border-width: 1px 0 0 0;
    display: flex;
    justify-content: space-evenly;
  }

  .main-button {
    padding: 0 15px;
    box-sizing: border-box;
    color: white;
    font-weight: 500;
    border-width: 0;
    width: 50%;
    height: auto;
    border-width: 0px;
    background-color: var(--main-pink);
    border-color: #ecd0d0;
    transition: all 200ms;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .main-button:hover {
    cursor: pointer;
    background-color: rgba(247, 247, 238, 0.1);
    color: var(--main-pink);
  }

  #upload {
    border-radius: 15px 0 0 15px;
  }

  #record {
    border-left-width: 1px;
    border-radius: 0 15px 15px 0;
    margin: 0;
  }

  input {
    display: none;
  }
</style>

<main>
  <h1>{textContent.name}</h1>
  <div>
    <label class="main-button" id="upload">
      <Icon data={upload} class="icon" />
      Upload
      <input type="file" accept="audio/*" on:change={uploadClickHandler} />
    </label>
    <button class="main-button" id="record" on:click={recordClickHandler}>
      <Icon data={microphone} class="button-icon" />
      Record
    </button>
  </div>
</main>
