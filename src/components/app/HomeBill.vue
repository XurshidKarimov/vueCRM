<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p  v-for="curr in currencies"
        :key="curr"
        class="currency-line"
        >
        <span>
         {{ currencyFilter(this.rates[curr], curr) }}
        </span>
      </p>
    </div>
  </div>
</div>
</template>

<script >
import { mapGetters } from 'vuex'

export default{
  data(){
    return {
      currencies: ['UZS', 'USD', 'EUR', 'RUB'],
    }
  },
  props: ['rates'],
  computed: {
    ...mapGetters(['getInfo']),
    base(){
      return this.getInfo.bill / (this.rates['UZS'] / this.rates['EUR'])
    },
    
  },
  methods: {
    getCurrency(currency){
      return (this.base * this.rates[currency]).toFixed(2);
    },
    currencyFilter(value, currency = 'UZS'){
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value)
    },
  }
}
</script>