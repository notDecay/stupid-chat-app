<div class="setting-warpper">
  <div class="icon user-avatar"></div>
  <div class="user-name-warpper">
    <div class="user-name">Amongious</div>
    <div class="user-status">something</div>
  </div>
  <div class="setting">
    <div class="icon icon-gear"></div>
  </div>
</div>

<style>
  .setting-warpper {
    --bottom-padding: 1rem;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 1rem var(--bottom-padding) 1rem;
    width: -webkit-fill-available;
    position: absolute;
    bottom: 0;
    background-color: #23232c;
    border-radius: 0 0 var(--app-sidebar-border-radius) var(--app-sidebar-border-radius);
  }

  .user-name {
    font-weight: bold;
  }

  .user-status {
    font-size: 14px;
    color: var(--app-user-status-color);
  }

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