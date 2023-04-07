<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader-l v-if="!userUID"/>
      <div class="row" v-else>
      <CategoryCreate @created="addNewCategory"/>
      <CategoryEdit/>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from "@/components/app/CategoryCreate.vue"
  import CategoryEdit from "@/components/app/CategoryEdit.vue"
  import { mapActions, mapGetters, useStore } from "vuex";
  import { computed, watch, } from 'vue';

  export default{
    setup(){
      const store = useStore();
    
      const userUID = computed(() => store.getters.getUserUID);
      
      watch(userUID, async(newValue) => {
       await store.dispatch('fetchCategories', newValue);
      })
      
      return {userUID, };
    },


    data: () => ({
      categories: [],
      loading: true,
    }),
    components: {
    CategoryCreate,
    CategoryEdit,
    },
    methods: {
      ...mapActions(['fetchCategories']),
      addNewCategory(category){
        this.categories.push(category);
      }
    },
    computed: {
      ...mapGetters(['getUserUID'])
    },
  }

</script>