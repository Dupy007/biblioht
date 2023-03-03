<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{name:"userAdd"}' class="btn btn-primary">Create</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>User</h4>
                    <div class="form-outline mb-4">
                        <input type="text" class="form-control" id="datatable-search-input" v-model="search" placeholder="Search">
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Nickname</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Code</th>
                                    <th>Code Parrain</th>
                                    <th>Type</th>
                                    <th>Departement</th>
                                    <!-- <th>Carte d'identité</th> -->
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="users.length > 0">
                                <tr v-for="(user,key) in filtered" :key="key">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.nickname }}</td>
                                    <td>{{ user.mobile_no }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.code }}</td>
                                    <td>{{ user.parrain }}</td>
                                    <td>{{ user.type_account }}</td>
                                    <td>{{ user.departement }}</td>
                                    <!-- <td> <img v-bind:src="'/storage/app/images/'+user.carte_identite" v-bind:alt=" user.name " srcset=""></td> -->
                                    <td>
                                        <router-link :to='{ name:"userEdit" , params:{ id:user.id } }' class="btn btn-success">Edit</router-link>
                                        <button type="button" @click="deleteuser(user.id)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="7" align="center">No Users Found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Users",
    data(){
        return{
            users:[],
            search: "",
        }
    },
    mounted(){
        this.getUsers()
    },
    methods:{
        async getUsers(){
            await axios.get('/plf/user').then(response=>{
                this.users = response.data
            }).catch(error=>{
                this.users = []
            })
        },
        deleteuser(id){
            if(confirm("Are you sure to delete this user ?")){
                axios.delete('/plf/user/'+id).then(response=>{
                    this.getUsers()
                }).catch(error=>{
                })
            }
        },
    },
    computed: {
        filtered() {
        return this.users.filter(p => {
            return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
        });
        }
  }
}
</script>
