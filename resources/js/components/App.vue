<template>
    <main>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand" href="#">Pyramide de la liberte financiere (PLF)</router-link>

                <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <div class="navbar-nav"  v-if="auth.type_account=='admin'">
                            <li class="nav-item" exact-active-class="active">
                                <router-link to="/index" class="nav-link">Home</router-link>
                            </li>
                            <li class="nav-item" exact-active-class="active">
                                <router-link to="/category" class=" nav-link">Category</router-link>
                            </li>
                            <li class="nav-item" exact-active-class="active">
                                <router-link to="/pyramid" class=" nav-link">Pyramid</router-link>
                            </li>
                            <li class="nav-item" exact-active-class="active">
                                <router-link to="/user" class=" nav-link">User</router-link>
                            </li>
                        </div>
                        <div class="user" v-else>
                            <li class="nav-item" exact-active-class="active">
                                <router-link to="/mypyramid" class="nav-link">My Pyramid</router-link>
                            </li>
                        </div>
                    </ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                    <!-- Authentication Links -->
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                {{ auth.name }} ( {{ auth.code }} )
                            </a>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <form @submit.prevent="logout">
                                    <button type="submit" class="dropdown-item">
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </li>
                </ul>
                </div>
            </div>
        </nav>
        <main class="container py-4">
            <router-view></router-view>
        </main>
    </main>
</template>

<script>
    export default {
        data(){
            return{
                form:{},
                errors:[],
                auth:{},
            }
        },
        methods:{
            async logout(){
                await axios.post('/logout',this.form).then(response => {
                    localStorage.removeItem('auth');
                    window.location.replace('/')
                });
            },
            async loadSession(){
                await axios.get('/session')
                    .then( (response) => {
                        this.auth = response.data.auth;
                        localStorage.auth = JSON.stringify(this.auth);
                    })
                    .catch(function (error){
                        console.log(error);
                    });
            },
        },
        mounted() {
            this.loadSession();
        }
    }
</script>
