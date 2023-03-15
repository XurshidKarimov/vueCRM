<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Логин</span>
      <div class="input-field ">
        <input 
        id="email" 
        type="text"
        v-model.trim="state.email"
        :class="{invalid: this.emailError}"
        @input="this.emailError = ''"
        autocomplete="off"/>
        <label for="email">Email</label>
        <small class="helper-text invalid">{{ emailErrorView }}</small>
      </div>
      <div class="input-field">
        <input 
        id="password" 
        type="password" 
        v-model.trim="this.state.password"
        :class="{invalid: this.passwordError}"
        @input="this.passwordError = ''"
        autocomplete="off"/>
        <label for="password">Пароль</label>
        <small class="helper-text invalid">{{ passwordErrorView }}</small>
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
import messages from '@/utils/messages'
import { auth } from "@/firebase/init"
import { signInWithEmailAndPassword } from '@firebase/auth'

  export default{

    data: () => ({
      emailError: '',
      passwordError: '',
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
          if(this.v$.email.required.$invalid){
            this.emailError = "Введите почту";
          }
          else if(this.v$.email.email.$invalid){
            this.emailError = "Некорректная почта";
          } 
          if(this.v$.password.required.$invalid){
            this.passwordError = "Введите пароль";
          }
          else if(this.v$.password.minLength.$invalid){
            this.passwordError = `Минимальная количество символов ${this.v$.password.minLength.$params.min}`;
          } 
          return;
        }

        try{
          await signInWithEmailAndPassword(auth, this.state.email, this.state.password);
          this.$router.push('/');
        }
        catch(error){
          this.$router.push("/error400")
        }
       
      }
    },
    computed: {
      emailErrorView(){
        return this.emailError;
      },
      passwordErrorView(){
        return this.passwordError;
      },

    },
    inject: ['message', 'error'],
    mounted(){
      if(messages[this.$route.query.message]){
        this.message(messages[this.$route.query.message]);
      }
    }
  }


</script>

<style scoped>
</style>
