<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      
      <button class="btn waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    
    <div v-if="val">
      <loader-l />
    </div> 
    <div v-show="!val" class="row">
      <HomeBill :rates="currency"/>
      <HomeCurreny :rates="currency"/>
    </div>
    
  </div>
</template>

<script>
import HomeBill from '@/components/app/HomeBill.vue';
import HomeCurreny from '@/components/app/HomeCurreny.vue';
import { mapActions, mapGetters, useStore} from 'vuex';
import { computed, watch } from 'vue';

export default{
  setup(){
    const store = useStore();

    const val = computed(() => store.getters.getUserDataStatus);

    watch(val, (newValue) => {
      if(newValue){
        store.commit("setUserDataStatus");
      }
    });

    return {
      val,
    }
  },
  data(){
    return {
      currency: null,
    }
  },
  methods: {
    ...mapActions(['fetchCurrency',]),
    async refresh(){
      this.currency = await this.fetchCurrency();
    }
  },
  computed: {
    ...mapGetters(['getInfo',]),
  },
  components: {
    HomeBill, HomeCurreny,
  },
  async mounted(){
    this.currency = await this.fetchCurrency();
  }
}

</script>