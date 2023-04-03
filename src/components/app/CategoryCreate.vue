<template>
     <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Создать</h4>
            </div>

            <form @submit.prevent="checkFormData">
              <div class="input-field">
                <input id="name"
                    type="text"
                    autocomplete="off"
                    v-model.trim="state.name"
                    :class="{invalid: this.nameError}"
                    @input="this.nameError = ''"
                    />
                <label for="name">Название</label>
                <span class="helper-text invalid">{{ nameErrorView }}</span>
              </div>

              <div class="input-field">
                <input id="limit" 
                    type="number" 
                    autocomplete="off"
                    v-model.number="state.limit"
                    :class="{invalid: this.limitError}"
                    @input="this.limitError = ''"
                    />
                <label for="limit">Лимит</label>
                <span class="helper-text invalid">{{ limitErrorView }}</span>
              </div>

              <button class="btn waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue} from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import { mapActions, mapGetters } from 'vuex';
import M from "../../../node_modules/materialize-css";

    export default{
       data: () => ({
            nameError: '',
            limitError: '',
       }),

       setup(){
            const state = reactive({
                name: '',
                limit: 1000,
            })

            const rules = computed(() => {
                return {
                    name: {required},
                    limit: {required, minValue: minValue(1000)}
                }
            })

            const v$ = useVuelidate(rules, state);

            return {state, v$};
       },

       methods: {
        ...mapActions(['createCategory']),
        async checkFormData(){
            const result = await this.v$.$validate();
            
            if(!result){
                if(this.v$.name.required.$invalid){
                    this.nameError = 'Введите имя'
                }
                if(this.v$.limit.required.$invalid){
                    this.limitError = 'Введите значение';
                }
                if(this.v$.limit.minValue.$invalid){
                    this.limitError = `Минимальная значание ${this.v$.limit.minValue.$params.min}`
                }
                return;
            }

            try{
                const category = await this.createCategory({
                    name: this.state.name,
                    limit: this.state.limit,
                    userUID: this.getUserUID,
                });

                console.log(category);

                this.state.name = '';
                this.state.limit = 1000;
                
                let nameInput = document.getElementById("name");
                nameInput.focus();
            }
            catch(e){
                // null
            }
        }
       },

       computed: {
        ...mapGetters(['getUserUID']),
        nameErrorView(){
            return this.nameError;
        },
        limitErrorView(){
            return this.limitError;
        },
       },

       mounted(){
        M.updateTextFields();
       }
    }

</script>