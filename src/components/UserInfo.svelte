<script>
  import Setting from "../screen/Setting.svelte";

  export let username

  function showSetting() {
    new Setting({
      target: document.querySelector('.app-mount')
    })
  }
</script>

<div class="setting-warpper">
  <div class="icon user-avatar"></div>
  <!-- <div class="user-name-warpper">
    <div class="user-name">{username}</div>
  </div> -->
  <div class="setting" on:click={showSetting}>
    <div class="icon icon-gear"></div>
  </div>
</div>

<style>
  .setting-warpper {
    /* --bottom-padding: 1rem; */
    padding: var(--app-space);
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    height: 100%;
    flex-flow: column;
  }

  .setting-warpper > * {
    flex: none;
  }

  /* .user-status {
    font-size: 14px;
    color: var(--app-user-status-color);
  } */

  .setting-warpper .user-avatar {
    --icon-bound: 2rem;
    --icon-url: url('https://media.discordapp.net/attachments/1089483298327253075/1136148197572616304/image.jpeg');
    border-radius: 50%;
  }

  .setting {
    margin-left: auto;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }

  .setting:hover {
    background-color: var(--app-icon-selected-color);
  }

  .setting-warpper .icon-gear {
    --icon-bound: 1.25rem;
  }
</style>