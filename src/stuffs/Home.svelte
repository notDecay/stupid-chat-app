<script>
  import ChatPage from "../page/ChatPage.svelte";
import SideBar from "./sidebar/SideBar.svelte"
  import UserInfo from "./sidebar/UserInfo.svelte"
</script>

<div class="app-container screen">
  <aside>
    <SideBar />
    <UserInfo />
  </aside>
  <main>
    <ChatPage />
  </main>
</div>

<style>
  .app-container {
    padding: var(--app-space);
    display: grid;
    grid-template-columns: 1fr 3fr;
    background: var(--app-bg-color);
    color: var(--app-text-color);
    gap: var(--app-space);
  }

  aside, main {
    height: 100%;
  }

  aside {
    background: var(--app-sidebar-color);
    border-radius: var(--app-sidebar-border-radius);
    position: relative;
  }

  main {
    overflow: hidden;
  }
</style>