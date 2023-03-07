<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Логин</span>
      <div class="input-field">
        <input 
        id="email" 
        type="text"
        v-model.trim="state.email"
        :class="{invalid: (v$.email.$dirty && !v$.email.required) || (v$.email.$dirty && !v$.email.email)}" 
        autocomplete="off"/>
        <label for="email">Email</label>
        <small v-if="v$.email.$dirty && !v$.email.required" class="helper-text invalid">Введите почту</small>
        <small v-else-if="v$.email.$dirty && !v$.email.email" class="helper-text invalid">Введите корректную почту</small>
      </div>
      <div class="input-field">
        <input 
        id="password" 
        type="password" 
        v-model.trim="state.password"
        autocomplete="off"/>
        <label for="password">Пароль</label>
        <small v-if="v$.password.$dirty && !v$.password.required" class="helper-text invalid">Введите парол</small>
        <small v-else-if="v$.password.$dirty && !v$.password.minLength" 
        class="helper-text invalid">Пароль должен содержать минимум {{ v$.password.minLength.$params.min }} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { computed, reactive } from 'vue'

  export default{

    data: () => ({
      
    }),
    setup(){
      const state = reactive({
        email: '',
        password: '',
      })

      const rules = computed(() => {
        return {
          email: { email, required, },
          password: {required, minLength: minLength(8) }
        }   
      })

      const v$ = useVuelidate(rules, state)

      return {state, v$}
    },
    methods: {
     async submitHandler(){
        const result = await this.v$.$validate();
        if(!result){
          this.v$.email.$touch();
          return;
        }
        this.$router.push('/');
      }
    }
  }


</script>
