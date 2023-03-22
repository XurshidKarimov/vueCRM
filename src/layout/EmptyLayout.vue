<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>


<script >
import { mapGetters } from 'vuex';
import messages from '@/utils/messages'

export default {
  data(){
    return {
      errorMessage: null,
    }
  },

  computed: {
    ...mapGetters(['getError']),
    error(){
      return this.getError;
    }
  },
    watch: {
      error: {
        handler(newArg){
         this.message(messages[newArg.code])
        }
      }
    }
  ,
  inject: ['message'],
}
</script>