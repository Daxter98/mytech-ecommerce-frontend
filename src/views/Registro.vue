<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Registro</h1>

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

                    <div class="field">
                        <label>Confirmar Contraseña</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password2">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Registro</button>
                        </div>
                        <hr>
                        O <router-link to="/login">Click Aqui</router-link> para Iniciar Sesión!
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { toast } from 'bulma-toast'

export default {
    name: 'Registro',
    data(){
        return{
            usuario: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    mounted(){
        document.title = 'Registro | E-Commerce'
    },
    methods:{
        submitForm(){
            this.errors = []

            if(this.usuario === ''){
                this.errors.push('El campo usuario no puede estar vacio')
            }

            // Password 
            if(this.password === ''){
                this.errors.push('El campo contraseña no puede estar vacio')
            }else if(this.password.length < 8){
                this.errors.push('La contraseña es demasiado corta, 8 caracteres minimo')
            }

            if(this.password !== this.password2){
                this.errors.push('Las contraseñas no coinciden')
            }

            if(!this.errors.length){
                const datos = {
                    username: this.usuario,
                    password: this.password
                }

                axios
                    .post('/api/v1/users/', datos)
                    .then(response =>{
                        toast({
                            message: 'Usuario creado correctamente',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right'
                        })

                        this.$router.push('/login')
                    })
                    .catch(error =>{
                        if(error.response){
                            for(const propiedad in error.response.data){
                                this.errors.push(`${propiedad}: ${error.response.data[propiedad]}`)
                            }

                            console.error(JSON.stringify(error.response.data))
                        } else if (error.message){
                            this.error.push('Algo salio mal. Por favor, intenta de nuevo')

                            console.error(JSON.stringify(error))
                        }
                    })
            }
        }
    }
}
</script>