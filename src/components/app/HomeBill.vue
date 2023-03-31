<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line">
          <span>{{ `${this.getInfo.bill} UZS` }}</span>
        </p>
        <p v-for="curr in this.rates"
        :key="curr"
        class="currency-line"
        >
        <span>
         {{ currencyFilter(getCurrency(this.getInfo.bill, curr.rates['UZS']), curr.base) }}
        </span>
      </p>
    </div>
  </div>
</div>
</template>

<script >
import { computed, watch } from 'vue';
import { mapGetters, mapActions, useStore } from 'vuex'

export default{
  setup(){
    const store = useStore();

    const checkUID = computed(() => store.getters.getUserUID);

    watch(checkUID, async (newValue) => {
      await store.dispatch('fetchInfo', newValue);
    })
  },
  data(){
    return {
      userBill: '',
    }
  },
  props: ['rates'],
  computed: {
    ...mapGetters(['getInfo', 'getUserUID']),
    computedUserBill(){
      return this.userBill;
    },
  },
  methods: {
    ...mapActions(['fetchInfo', 'getUID']),
    getCurrency(userBill, foreignCurrency){
      return userBill / foreignCurrency.toFixed(2);
    },
    currencyFilter(value, currency = 'UZS'){
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value)
    },
  },
}
</script>