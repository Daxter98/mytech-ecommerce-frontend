<template>
    <div class="page-search">
        <div class="column is-12">
            <h1 class="title">Busqueda</h1>
            <h2 class="is-size-5 has-text-grey-">Termino de Busqueda: {{ query }}</h2>

            <ProductItem v-for="product in productos" v-bind:key="product.id"
            v-bind:product="product"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProductItem from '@/components/ProductItem'

export default {
    name: 'Search',
    components: {
        ProductItem
    },
    data(){
        return{
            productos: [],
            query: ""
        }
    },
    mounted(){
        document.title = 'Busqueda | E-Commerce'

        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if(params.get('query')){
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods: {
        async performSearch(){
            this.$store.commit('setIsLoading', true)

            await axios
                .post('api/v1/productos/busqueda', {'query': this.query})
                .then(response => {
                    this.productos = response.data
                })
                .catch(error => {
                    console.error(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>