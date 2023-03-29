<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      
      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    
    <loader-l v-if="loading"/>
    <div v-else class="row">
      <HomeBill :rates="currency"/>
      <HomeCurreny :rates="currency"/>
    </div>
    
  </div>
</template>

<script>
import HomeBill from '@/components/app/HomeBill.vue';
import HomeCurreny from '@/components/app/HomeCurreny.vue';
import { mapActions } from 'vuex';

export default{
  data(){
    return {
      loading: true,
      currency: null,
    }
  },
  methods: {
    ...mapActions(['fetchCurrency'])
  },
  components: {
    HomeBill, HomeCurreny,
  },
  async mounted(){
    this.currency = await this.fetchCurrency();
    this.loading = false;
  }
}

</script>