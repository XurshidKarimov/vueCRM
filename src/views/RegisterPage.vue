<template>
  <form class="card auth-card" @submit.prevent="checkFormData">
  <div class="card-content">
    <span class="card-title">Регистрация</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="state.email"
          :class="{invalid: this.emailError}"
          @input="this.emailError = ''"
          autocomplete="off"
      >
      <label for="email">Email</label>
      <small class="helper-text invalid">{{ emailErrorView }}</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="state.password"
          :class="{invalid: this.passwordError}"
          @input="this.passwordError = ''"
      >
      <label for="password">Пароль</label>
      <small class="helper-text invalid">{{ passwordErrorView }}</small>

    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="state.name"
          :class="{invalid: this.nameError}"
          @input="this.nameError = ''"
      >
      <label for="name">Имя</label>
      <small class="helper-text invalid">{{ nameErrorView }}</small>
    </div>
    <p>
      <label>
        <input type="checkbox" @change="state.agree = !state.agree" />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>


<script>
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength} from '@vuelidate/validators'
  import { computed, reactive } from 'vue'
  import { mapActions } from 'vuex'

  export default{
    
    data: () => ({
        emailError: '',
        passwordError: '',
        nameError: '',
        agreeError: ''
    }),

    setup(){
      const state = reactive({
        email: '',
        password: '',
        name: '',
        agree: false,
      })

      const rules = computed(() => {
        return {
          email: {email, required},
          password: {required, minLength: minLength(8)},
          name: {required},
          agree: { required, isTrue: () => state.agree === true },
        }
      })

      const v$ = useVuelidate(rules, state);

      return {state, v$}
    },
    methods: {
      ...mapActions(['register', 'getUID']),
      async checkFormData(){
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
          if(this.v$.name.required.$invalid){
            this.nameError = "Введите имя";
          }
          return;
        }          
          const sendObj = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
          };
          try{
            await this.register(sendObj);
            this.$router.push('/')
          }
          catch(e){
            console.log(e);
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
      nameErrorView(){
        return this.nameError;
      },
    }
  }

</script>
