<template>
  <div class="app-main-layout">
   <navbar-comp @clicked="isOpen = !isOpen"></navbar-comp>
   <sidebar-comp :value="isOpen"></sidebar-comp>
    
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
  import NavbarComp from "@/components/app/NavbarComp"
  import SidebarComp from "@/components/app/SidebarComp"

  export default{
    data: () => ({
      isOpen: true,
    }),

    components: {
      NavbarComp, SidebarComp
    }
  }
</script>
