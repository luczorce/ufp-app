<template>
  <div>
    <header>
      <nav class="nav">
        <div class="navbar-header">
          <button type="button" class="nav-toggle" v-bind:class="{'collapsed': navOpen}" @click="toggleNav()" title="menu">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <h1 class="project-name">Selfie</h1>
          
          <!-- TODO add the notification here -->
          <div class="notification-center"></div>
        </div>

        <div class="links-container" v-bind:class="{'collapsed': !navOpen}">
          <header>
            <button class="links-closer" type="button" @click="closeMenu()">close menu</button>
          </header>

          <ul class="nav-links">
            <li><router-link @click.native="closeMenu()" :to="{name: 'home'}">Your Data</router-link></li>
            <li><router-link @click.native="closeMenu()" :to="{name: 'welcome'}">About & Help</router-link></li>
            <li><router-link @click.native="closeMenu()" :to="{name: 'dataImport'}">Data Import</router-link></li>
            <li><router-link @click.native="closeMenu()" :to="{name: 'sharingReport'}">Sharing Report</router-link></li>
          </ul>
        </div>
      </nav>
    </header>

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'appy',
    data: function() {
      return {
        navOpen: false
      };
    },
    methods: {
      closeMenu() {
        this.navOpen = false;
      },
      toggleNav() {
        this.navOpen = !this.navOpen;
      }
    }
  }
</script>

<style>
  .nav {
    height: var(--menu-height);
  }

  .navbar-header {
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
  }

  .project-name {
    margin: 0;
  }

  .nav-toggle {
    padding: 5px 10px;
    background: var(--white-enuff);
    margin-right: auto;
  }

  /* TODO replace these?*/
  .nav-toggle .icon-bar {
    width: 10px;
    height: 2px;
    background: var(--black);
    display: block;
    margin: 0 auto 2px;
  }

  /* TODO placeholder styles */
  .notification-center {
    margin-left: auto;
    width: 40px;
    background: var(--white2);
  }

  .links-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--white-enuff);
    box-shadow: 10px 10px 10px var(--screen);
    z-index: 1000;
    width: 40%;
    min-width: 200px;
    padding: 10px;
  }

  .links-container.collapsed {
    display: none;
  }
</style>
