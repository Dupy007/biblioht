<template>
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form @submit="checkForm">
                        <div class="row">
                            <p v-if="errors.length" class="bg-danger">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                <li v-for="error in errors">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" required autocomplete="email" autofocus  v-model="user.email">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required  v-model="user.password" >
                                </div>
                            </div>
                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                        <a href="/register" class="btn btn-link">
                                            I don't have a account
                                        </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default{
    name:"login-form",
    data(){
        return{
            user:{
                email:"",
                password:"",
            },
            errors:[],
        }
    },
    methods:{
        async login(){
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/login', this.user).then(response=>{
                    window.location.replace('/home');
                }).catch(error=>{
                    var theeerrors= [];
                    theeerrors = error.response.data.errors;
                    for (const key in theeerrors) {
                        if (Object.hasOwnProperty.call(theeerrors, key)) {
                            const element = theeerrors[key];
                            this.errors.push(element[0]);
                        }
                    }
                    console.log('error =>' ,error);
                })
            });
        },
        checkForm:function(e) {
            if(this.user.password && this.user.email  ) this.login();
            this.errors = [];
            if(!this.user.password) this.errors.push("Password required.");
            if(!this.user.email) this.errors.push("Email required.");
            e.preventDefault();
        }
    }
}
</script>
