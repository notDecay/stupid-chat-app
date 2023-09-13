<script>
  import AppearancePage from "./setting/app_related/AppearancePage.svelte"
  import SettingPage from "./setting/SettingPage.svelte"
  import SideBarItem from "../components/SideBarItem.svelte"
  import SideBarSection from "../components/SideBarSection.svelte"

  /**@type {HTMLDivElement}*/
  let setting
</script>


<div class="setting screen" bind:this={setting}>
  <aside>
    <h1>Settings</h1>
    <SideBarSection name="App related">
      <SideBarItem name="Appearance" id="appearance" />
    </SideBarSection>
  </aside>
  <main>
    <SettingPage name="App related > Appearance" description="Change the app theme, customize the background, ..." on:close_setting={() => setting.remove()}>
      <AppearancePage />
    </SettingPage>
  </main>
</div>

<style>
  .setting {
    background: var(--app-bg-color);
    animation: fade-in 0.15s ease-in;
    display: grid;
    grid-template-columns: 22rem auto;
    gap: var(--app-space);
    padding: var(--app-space);
  }

  h1 {
    margin-left: var(--app-space);
  }
  
  aside {
    padding: 0 5px;
    background: var(--app-second-sidebar-color);
  }
</style>