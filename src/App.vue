<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from "@/layout/EmptyLayout";
import MainLayout from "@/layout/MainLayout";
import M from "../node_modules/materialize-css";
import LoaderL from "@/components/app/LoaderL.vue"


export default {
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout}Layout`;
    },
  },
  provide() {
    return {
      message: function (html) {
        M.toast({ html })
      },
      error: function (html) {
        M.toast({ html })
      },
      loader: function(){
        return LoaderL;
      }
    }
  }
};
</script>





<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
