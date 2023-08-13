<script>
  import AppThemePreview from "./previewer/AppThemePreview.svelte"


</script>

<section>
  <h3>Theme</h3>
  <div class="theme-list">
    <AppThemePreview themeName="Dark" backgroundColor="#131418" sidebarColor="#1c1c24" selected={true} />
    <AppThemePreview themeName="Light" backgroundColor="#ffffff" sidebarColor="#ededed" />
  </div>
</section>

<section>
  <h3>Background</h3>
  <div class="background-settings">
    <div>something</div>
    <div class="background-previewer">
      <div class="small-app">
        <aside>
          <br>
          <br>
          <br>
          <br>
        </aside>
        <main></main>
      </div>
    </div>
  </div>
</section>

<style>
  .theme-list {
    padding: 10px;
    background: #ffffff0d;
    display: flex;
    gap: 2rem;
  }

  .background-settings {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .small-app {
    display: grid;
    grid-template-columns: 7rem auto;
    height: 15rem;
    padding: 10px;
    background: var(--app-bg-color);
  }
  
  aside {
    background: var(--app-second-sidebar-color);
  }

  .background-previewer {
    padding: 15px;
    background-color: #ffffff0d;
  }
</style>