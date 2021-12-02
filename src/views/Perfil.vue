<template>
    <div class="page-perfil">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Mi Perfil</h1>
            </div>

            <div class="column is-12">
                <h2 class="subtitle">Mis Ordenes</h2>

                <Ordenes v-for="orden in ordenes" v-bind:key="orden.id" v-bind:orden="orden"></Ordenes>
            </div>

            <hr>

            <div class="column is-12">
                <button class="button is-danger" @click="logout()">Cerrar Sesión</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import Ordenes from '@/components/Ordenes.vue'

export default {
    name: 'Perfil',
    data (){
        return {
            ordenes: []
        }
    },
    components: {
        Ordenes
    },
    mounted (){
        document.title = 'Perfil | E-Commerce'

        this.getOrdenes()
    },
    methods:{
        logout(){
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("usuario")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')
            this.$store.commit('clearCart')
            this.$router.push('/')
        },
        async getOrdenes(){
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/ordenes/')
                .then(response => {
                    this.ordenes = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>