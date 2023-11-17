<template lang="pug">
main
    section.full.flex
        .column.image
            img(src="@/assets/img/login.gif")
        .column.flex.text
            .content
                h1.text-center Aquí <strong> comienza</strong> tu propia <strong>galeria</strong>
                form
                    input(type="text" placeholder="E-mail")
                    input(type="password" placeholder="********")
                    button(type="submit") Ingresar
                p.text-center Si no tiene un cuenta
                p.text-center
                    a(href="#") Registrate
            ul.social
                li: a(href="#"): i.lab.la-facebook
                li: a(href="#"): i.lab.la-instagram
                li: a(href="#"): i.lab.la-patreon

</template>

<script>
export default {

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
</style>