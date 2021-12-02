<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Iniciar Sesion</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label >Usuario</label>
                        <div class="control">
                            <input type="text" class="input" v-model="usuario">
                        </div>
                    </div>

                    <div class="field">
                        <label>Contraseña</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Iniciar Sesión</button>
                        </div>
                        <hr>
                        O <router-link to="/registro">Click Aqui</router-link> para Registrarte!
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LogIn',
    data() {
        return {
            usuario: '',
            password: '',
            errors: []
        }
    },
    mounted(){
        document.title = 'Iniciar Sesion | E-Commerce'
    },
    methods:{
        async submitForm(){
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")

            const datos = {
                username: this.usuario,
                password: this.password
            }

            await axios
                .post('/api/v1/token/login/', datos)
                .then(response => {
                    const token = response.data.auth_token

                    this.$store.commit('setToken', token)

                    axios.defaults.headers.common["Authorization"] = "Token " + token

                    localStorage.setItem("token", token)

                    const toPath = this.$route.query.to || '/carrito'

                    this.$router.push(toPath)
                })
                .catch(error => {
                    if(error.response){
                        for(const propiedad in error.response.data){
                            this.errors.push(`${propiedad}: ${error.response.data[propiedad]}`)
                        }
                    }
                    else{

                    }
                })
        }
    }
}
</script>