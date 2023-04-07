<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <div v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</div>
      <form>
        <div class="input-field">
          <select ref="select" v-model="categories">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" />
          <label for="name">Название</label>
          <span class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect, ref } from 'vue';
import M from 'materialize-css';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const categories = computed(() => store.getters.getCategories);

    // используем ref для создания реактивной переменной select
    const select = ref("Not");

    watchEffect(() => {
      console.log('categories changed', categories.value);
    });

    return {
      categories,
      select, // возвращаем select из setup()
    };
  },
  mounted() {
    // получаем значение select из реактивной переменной
    this.select.value = M.FormSelect.init(this.$refs.select);
  },
  beforeUnmount() {
    if (this.select.value && this.select.value.destroy) {
      this.select.value.destroy();
    }
  },
};
</script>
