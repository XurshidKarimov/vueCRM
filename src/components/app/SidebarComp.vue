<template>
  <ul class="sidenav app-sidenav" :class="{open: value == true}">
    <li v-for="link in links" :key="link.url">
      <router-link :to="link.url" class="waves-effect waves-orange pointer">{{link.title}}</router-link>
    </li>
  </ul>
</template>

<script>
  export default{
    props: ['value'],
    data(){
      return {
        links: [
          {title: 'Счет', url: '/'},
          {title: 'История', url: '/history'},
          {title: 'Планирование', url: '/planing'},
          {title: 'Новая запись', url: '/record'},
          {title: 'Категории', url: '/categories'},
        ]
      }
    },
  }



</script>


<style scoped>
  .router-link-exact-active{
    background-color: orange;
    color: white;
  }
  .router-link-exact-active:hover{
    background-color: orange;
  }
</style>
