<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="currency in rates" :key="currency">
              <td>{{ currency.base }}</td>
              <td>{{ currency.rates['UZS'].toFixed(2) }}</td>
              <td>{{ today }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
  export default{
    props: ['rates'],
    computed: {
      today(){
        const options = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }

        return new Intl.DateTimeFormat('ru-Ru', options).format(new Date());
      }
    }
  }

</script>