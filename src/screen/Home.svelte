<script>
  import ChatPage from './page/ChatPage.svelte'
  import UserInfo from '../components/UserInfo.svelte'
  import SideBarItem from '../components/SideBarItem.svelte'
  import SideBarSection from '../components/SideBarSection.svelte'
</script>

<div class="app-container screen">
  <aside class="idk-how-to-name-this">
    <UserInfo username="Amongious" />
  </aside>
  <aside>
    <SideBarSection name="you &#123; display: flex; &#125;">
      <SideBarItem name="Playground" description="Experimenting some feature" id="playground" icon="something" selected={true} notificationCount=1 />
    </SideBarSection>
  </aside>
  <main>
    <ChatPage />
  </main>
</div>

<style>
  .app-container {
    padding: var(--app-space);
    display: grid;
    grid-template-columns: 60px 330px 3fr;
    background: var(--app-bg-color);
    color: var(--app-text-color);
  }

  /* .app-container::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: center center no-repeat url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5JhuCU8skF5vdbNWewC9M2dwzBcCinWK4g&usqp=CAU);
    background-size: cover;
  } */

  .idk-how-to-name-this {
    background: var(--app-first-sidebar-color);
    border-top-left-radius: var(--app-sidebar-border-radius);
    border-bottom-left-radius: var(--app-sidebar-border-radius);
  }

  aside, main {
    height: 100%;
  }

  aside {
    background: var(--app-second-sidebar-color);
    position: relative;
  }

  main {
    overflow: hidden;
    margin-left: var(--app-space);
  }
</style>