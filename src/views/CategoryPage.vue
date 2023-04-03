<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader-l v-if="loading"/>
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
  import { mapActions, mapGetters } from "vuex";

  export default{
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
    async mounted(){
      console.log(this.getUserUID);
      this.categories = await this.fetchCategories(this.getUserUID);
      this.loading = false;
    }
  }

</script>