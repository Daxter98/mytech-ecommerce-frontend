<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{ categoria.nombre }}</h2>
            </div>
            
            <ProductItem v-for="product in categoria.productos" v-bind:key="product.id"
            v-bind:product="product"/>
        </div>
    </div>
</template>

<script>
import  axios from 'axios'
import { toast } from 'bulma-toast'
import ProductItem from '@/components/ProductItem'

export default {
    name: 'Categoria',
    data(){
        return{
            categoria:{
                productos: []
            }
        }
    },
    mounted(){
        this.getCategory()
    },
    watch:{
        $route(to, from){
            if(to.name === 'Categoria'){
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory(){
            const categoriaSlug = this.$route.params.categoria_slug

            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/v1/productos/${categoriaSlug}/`)
                .then(response => {
                    this.categoria = response.data

                    document.title = this.categoria.nombre + ' | E-Commerce'
                })
                .catch(error =>{
                    console.error(error)

                    toast({
                        message: 'Algo salio mal. Intenta de nuevo',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })
            
            this.$store.commit('setIsLoading', false)
        }
    },
    components:{
        ProductItem
    }
}
</script>