<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      
      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    
    <loader-l/>

    <div class="row">
      <HomeBill/>
      <HomeCurreny/>
    </div>
    
  </div>
</template>

<script>
import HomeBill from '@/components/app/HomeBill.vue';
import HomeCurreny from '@/components/app/HomeCurreny.vue';

export default{
  components: {
    HomeBill, HomeCurreny,
  },
  inject: ['loader'],
}

</script>