<template lang="pug">
main
    section.full.flex
        div.column.image
            img(src="@/assets/img/login.gif")
            p Sube tu propio arte para que aparezca en el login
        div.column.flex.text
            div.content
                h1.text-center Aquí <strong> comienza</strong> tu propia <strong>galeria</strong>
                form(@submit.prevent="login")
                    p(v-show="error") {{ error }}
                    ValidationProvider(rules="email|required" v-slot="v")
                        span.error(v-if="v.errors[0]") {{ v.errors[0] }}
                        input(type="email" name="E-mail" placeholder="E-mail" v-model="email" :class="{ error: v.errors[0] }")
                    ValidationProvider(v-slot="v")
                        input(type="password" placeholder="*******" v-model="password")
                    button(type="submit") Entrar
                p.text-center Si no tiene un cuenta
                p.text-center
                    router-link(to="/register") Registrate
                p.text-center {{ mensaje }}
            ul.social
                li: a(href="#"): i.lab.la-facebook-square
                li: a(href="#"): i.lab.la-instagram
                li: a(href="#"): i.lab.la-patreon
</template>
  
<script>
import api from '@/api.js';
import { ValidationProvider, extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
extend('required', {
    ...required,
    message: 'Su {_field_} es obligatorio'

})
extend('email', {
    ...email,
    message: 'Su {_field_} es inválido, ingrese uno correcto'

})

export default {
    data() {
        return {
            mensaje: "Proyecto realizado por Linkdero",
            email: "",
            password: "",
            error: false
        }
    },
    components: {
        ValidationProvider
    },
   
    methods: {
        login() {
            api.post('/users/login', {
                email: this.email,
                password: this.password
            }).then(result => {
                if (result.data.error)
                    this.error = result.data.error
                if (result.data.token) {
                    this.$store.commit('setToken', result.data.token)
                    this.$store.commit('setId', result.data.id)
                    api.defaults.headers['Authorization'] = result.data.token
                    this.$router.push('/')
                }
                console.log(result.data)

            })
        }
    }
}
</script>

<style lang="stylus" scoped>
  .image
    width 60%
    flex-basis 60%
    position relative
    img
      width 100%
      display block
      height 100%
      object-fit cove
    p
      position absolute
      bottom 30px
      left 30px
      color white
      font-weight 600
  div.text
    align-self center
    flex-basis 40%
    align-items center
    justify-content center
    div.content
      width 320px
  ul.social
    position absolute
    bottom 40px
    margin 0
    padding 0
    li
      display inline-block
      margin 0 10px
      a
        font-size 30px
        font-weight normal
  span.error
    padding 0 20px
    color #F23C3C
    font-size 10px
    font-weight bold
    margin-bottom 5px
    display block
</style>