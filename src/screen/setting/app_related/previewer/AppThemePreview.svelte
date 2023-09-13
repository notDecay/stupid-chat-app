<script>
  export let themeName
  export let backgroundColor
  export let sidebarColor
  export let selected = false

  let lastSelectedTheme = ''
  function selectedTheme(themeName) {
    console.log('theme selected:', themeName);
    if (lastSelectedTheme == themeName) return
    const appRoot = document.querySelector('.app-mount')
    appRoot.className = `app-mount ${themeName}-theme ${themeName}-theme-text`
  }
</script>

<div class="previewer {selected ? 'selected' : ''}" on:click={() => selectedTheme(themeName.toLowerCase())}>
  <h5>{themeName}</h5>
  <div class="app-previewer">
    <div class="small-app" style="background: {backgroundColor}">
      <aside style="background: {sidebarColor}">
        <br>
        <br>
        <br>
        <br>
      </aside>
      <main></main>
    </div>
  </div>
</div>

<style>
  .app-previewer {
    padding: 5px;
    border: 1px solid transparent;
  }

  .previewer:hover .app-previewer, 
  .previewer.selected .app-previewer {
    border-color: #ffffff8f;
  }

  .small-app {
    margin: 5px;
    display: grid;
    grid-template-columns: 3rem 7rem;
    padding: 5px;
  }

  h5 {
    margin: 0 5px;
    margin-bottom: 1rem;
  }
</style>