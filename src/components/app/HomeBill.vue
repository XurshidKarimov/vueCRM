<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p>{{ this.userBill }}</p>
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
import { mapGetters, mapActions } from 'vuex'

export default{
  data(){
    return {
      userBill: '',
    }
  },
  props: ['rates'],
  computed: {
    ...mapGetters(['getInfo', 'getUserUID']),
  },
  methods: {
    ...mapActions(['fetchInfo']),
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
  async mounted(){
    await this.fetchInfo(this.getUserUID);
    this.userBill = `${this.getInfo.bill} UZS`;
  }
}
</script>