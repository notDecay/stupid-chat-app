<script>
  
</script>

<section class="section-menu">
  <div class="section-title">
    <div class="icon icon-arrow"></div>
    <h3>you &#123; display: flex; &#125;</h3>
  </div>
  <ul>
    <li>
      <div class="icon"></div>
      <div class="menu-item-name">General</div>
      <div class="notification-count">
        <span>1</span>
      </div>
    </li>
  </ul>
</section>

<style>
  .section-menu {
    padding: var(--app-space);
  }

  ul {
    padding-inline-start: 0px;
    margin-bottom: 3rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 9px;
    list-style: none;
    padding: 5px 10px 5px 24px;
    margin: 5px 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    border-radius: 5px;
  }

  li:hover {
    font-weight: bold;
    background: var(--app-icon-selected-color);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 7px 0;
  }

  .section-title h3 {
    margin: 0;
  }

  .section-title .icon {
    --icon-bound: 14px;
    transition: background-color 0.15s ease-out;
    cursor: pointer;
    padding: 4px;
  }

  .section-title .icon:hover {
    background-color: var(--app-icon-selected-color);
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 9px;
    list-style: none;
    padding: 5px 10px 5px 24px;
    margin: 5px 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    border-radius: 5px;
  }

  li .icon {
    --icon-url: url('https://cdn.discordapp.com/attachments/1089483298327253075/1136142944273969273/image.jpeg');
  }

  li .menu-item:hover {
    font-weight: bold;
    background-color: var(--app-icon-selected-color);
  }

  li .notification-count {
    margin-left: auto;
    padding: 1px 9px;
    border-radius: 8px;
    background: var(--app-notification-color);
  }
</style>