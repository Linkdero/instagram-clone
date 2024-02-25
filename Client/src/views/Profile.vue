<template lang="pug">
  main
        div.mx-5.bg-white
            .container
                .profile
                    .profile-image
                        img(src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces", alt="")
                    .row 
                        .col.d-flex
                            h1.profile-user-name janedoe_
                            b-button.btn.profile-edit-btn.border.border-dark(variant="outline-primary") Editar Perfil
                    .row
                        .col.profile-stats 
                            ul
                                li
                                    span 164 posts
                                li
                                    span 164 Seguidores
                                li
                                    span 164 Siguiendo

                            div.profile-bio
                                p
                                    span.profile-real-name Jane Doe Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️

            .container
                .gallery
                    .gallery-item(tabindex="0" v-for="n in 5")
                        img.gallery-image(src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop", alt="")
                        .gallery-item-info
                            ul
                                li.gallery-item-likes
                                    span.visually-hidden Likes:
                                    i.fas.fa-heart(aria-hidden="true")
                                    |  56
                                li.gallery-item-comments
                                    span.visually-hidden Comments:
                                    i.fas.fa-comment(aria-hidden="true")
                                    |  2
                    .loader


        router-view
</template>
    
<script>
import api from '@/api.js';
export default {
    data() {
        return {
            email: null
        }
    },
    created() {
        api.get('/users/profile').then(response => {
            this.email = response.data.email;
        })
    },
    methods: {
        logout() {
            this.$store.commit('setToken', null)
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="stylus" scoped>

.btn
        background none
        color inherit
        margin  10px 50% 0 20px
        cursor pointer

  main
    background #EEEEEE
    padding-top 100px
    min-height 100vh

  .profile-image
    float left
    width calc(33.333% - 1rem)
    display flex
    justify-content center
    align-items center
    margin-right 3rem

    img
      border-radius 50%


  .profile-stats li
    display inline-block
    font-size 1.6rem
    line-height 1.5
    margin-right 4rem
    cursor pointer
  .profile-bio
    font-size 1.2rem
    font-weight 200
    line-height 1.5
    margin-top 2.3rem



.gallery
  display flex
  flex-wrap wrap
  margin -1rem -1rem
  padding-bottom 3rem

  .gallery-item
    position relative
    flex 1 0 22rem
    margin 1rem
    color #fff
    cursor pointer

    &:hover .gallery-item-info, &:focus .gallery-item-info
      display flex
      justify-content center
      align-items center
      position absolute
      top 0
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.3)

  .gallery-item-info
    display none

  .gallery-item-info li
    display inline-block
    font-size 1.7rem
    font-weight 600

  .gallery-item-likes
    margin-right 2.2rem

  .gallery-image
    width 100%
    height 100%
    object-fit cover

.loader
  width 5rem
  height 5rem
  border 0.6rem solid #999
  border-bottom-color transparent
  border-radius 50%
  margin 0 auto
  animation loader 500ms linear infinite

@media screen and (max-width: 40rem)
  .profile-stats
    order 1
    margin-top 1.5rem

  .profile-stats ul
    display flex
    text-align center
    padding 1.2rem 0
    border-top 0.1rem solid #dadada
    border-bottom 0.1rem solid #dadada

  .profile-stats li
    font-size 1.4rem
    flex 1
    margin 0

  .profile-stat-count
    display block

/* Spinner Animation */
@keyframes loader
  to
    transform rotate(360deg)

/* Supports CSS Grid */
@supports (display: grid)
  .profile
    display grid
    grid-template-columns 1fr 2fr
    grid-template-rows repeat(3, auto)
    grid-column-gap 3rem
    align-items center

  .profile-image
    grid-row 1 / -1

  .gallery
    display grid
    grid-template-columns repeat(auto-fit, minmax(22rem, 1fr))
    grid-gap 2rem

  .profile-image, .profile-user-settings, .profile-stats, .profile-bio, .gallery-item, .gallery
    width auto
    margin 0

  @media (max-width: 40rem)
    .profile
      grid-template-columns auto 1fr
      grid-row-gap 1.5rem

    .profile-image
      grid-row 1 / 2

    .profile-user-settings
      display grid
      grid-template-columns auto 1fr
      grid-gap 1rem

    .profile-edit-btn, .profile-stats, .profile-bio
      grid-column 1 / -1


</style>