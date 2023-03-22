<template>
   <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('clicked')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ currentTime }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
            >
              {{getInfo.name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <router-link to="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
  import M from "../../../node_modules/materialize-css/dist/js/materialize";
  import filterDate from "@/filter/filter";
  import { mapActions, mapGetters } from 'vuex';

  export default{

    data: () => ({
      date: new Date(),
      interval: null,
      dropdown: null,
    }),
    methods: {
      ...mapActions(['logingout']),
      async logout(){
        this.$router.push('/login?message=logout')
      }
    },
    computed:{
      currentTime(){
        return filterDate(this.date, 'datetime');
      },
      ...mapGetters(['getInfo']),
    },
    mounted(){
      this.interval = setInterval(() => {
        this.date = new Date();
      }, 1000)
      this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: true,
      })
    },
    beforeUnmount(){
      clearInterval(this.interval);
      if(this.dropdown && this.dropdown.destroy){
        this.dropdown.destroy()
      }
    }
  }

</script>
