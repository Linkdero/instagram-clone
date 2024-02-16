<template lang="pug">
main
    section.full.flex
        .column.image
            img(src="@/assets/img/register.gif")
        .column.flex.text
            .content
                h1.text-center Registrate en <strong> artgram</strong> para explorar <strong>experiencias</strong>
                form(@submit.prevent="register")
                    ValidationProvider(rules="email|required" name="E-mail" v-slot="v")
                        span.error(v-if="v.errors[0]") {{ v.errors[0] }}
                        input(type="email" placeholder="E-mail" v-model="email" :class="{ error: v.errors[0] }")
                    ValidationProvider(v-slot="v" rules="required" name="Contraseña")
                        span.error(v-if="v.errors[0]") {{ v.errors[0] }}
                        input(type="password" placeholder="Contraseña" v-model="password" :class="{ error: v.errors[0] }")
                    ValidationProvider(v-slot="v" rules="required" name="Validación")
                        span.error(v-if="v.errors[0]") {{ v.errors[0] }}
                        input(type="password" placeholder="Verifica tu Contraseña" v-model="password2" :class="{ error: v.errors[0] }")
                    button(type="submit") Registrate
                p.text-center Si ya tienes una cuenta
                p.text-center
                    router-link(to="/") Inicia Sesión
                p.text-center {{ mensaje }}
            ul.social
                li: a(href="#"): i.lab.la-facebook
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
            password2: ""
        }
    },
    components: {
        ValidationProvider
    },
    methods: {
        register() {
            if (this.password != this.password2) {
                alert("Las contraseñas no coinciden")
                return
            }
            api.post('/users/register', {
                email: this.email,
                password: this.password
            }).then(result => {
                if (result.data.token) {
                    this.$store.commit('setToken', result.data.token)
                    this.$router.push('/')
                }
                console.log(result.data)
            })
        }
    }
}
</script>
    
<style lang="stylus" scoped> //Solamente clases que esten en este archivo con scoped
        .image
            width 60%
            flex-basis 60%
            img
                width 100%
                display block
                height 100%
                object-fit cover
        .text
            align-self center
            flex-basis 40%
            align-items center
            justify-content center
            .content
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
            color red
            font-size 15px
            font-weight bold
            margin-bottom 5px
            display block
    </style>