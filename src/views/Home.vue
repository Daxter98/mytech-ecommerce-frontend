<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          MyTech E-Commerce
        </p>
        <p class="subtitle">
          WIP Proyecto ISW
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Productos Recientes</h2>
      </div>

      <ProductItem v-for="product in latestProducts" v-bind:key="product.id"
       v-bind:product="product"/>


    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

import ProductItem from '@/components/ProductItem'

export default {
  name: 'Home',
  data(){
    return{
      latestProducts: []
    }
  },
  components: {
    ProductItem
  },
  mounted(){
    this.getLatestProducts()

    document.title = 'MyTech | E-Commerce'
  },
  methods:{
    async getLatestProducts(){
      this.$store.commit('setIsLoading', true)

      await axios
      .get('/api/v1/productos-recientes/')
      .then(response =>{
        this.latestProducts = response.data
      })
      .catch(error => {
        console.error(error)
      })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>


