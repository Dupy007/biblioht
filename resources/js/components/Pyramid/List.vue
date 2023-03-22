<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{name:"pyramidAdd"}' class="btn btn-primary">Create</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Pyramid</h4>
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
                                    <th>Code </th>
                                    <th>User</th>
                                    <th>Category</th>
                                    <th>Statut</th>
                                    <th>Expire</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="pyramids.length > 0">
                                <tr v-for="(pyramid,key) in filtered" :key="key">
                                    <td>{{ pyramid.id }}</td>
                                    <td>{{ pyramid.code_pyramid }}</td>
                                    <td>{{ pyramid.user.name }} ( {{ pyramid.user.code }} )</td>
                                    <td>{{ pyramid.category.name }}</td>
                                    <td>{{ pyramid.statut }}</td>
                                    <td>{{ pyramid.expire_at }}</td>
                                    <td>
                                        <router-link :to='{ name:"pyramidEdit" , params:{ id:pyramid.id } }' class="btn btn-success">Edit</router-link>
                                        <button  type="button" @click="deletepyramid(pyramid.id)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" align="center">No Pyramids Found.</td>
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
    name:"Pyramids",
    data(){
        return{
            pyramids:[],
            search: ""
        }
    },
    mounted(){
        this.getPyramids()
    },
    methods:{
        async getPyramids(){
            await axios.get('/plf/pyramid').then(response=>{
                this.pyramids = response.data
            }).catch(error=>{
                this.pyramids = []
            })
        },
        deletepyramid(id){
            if(confirm("Are you sure to delete this pyramid ?")){
                axios.delete('/plf/pyramid/'+id).then(response=>{
                    this.getPyramids()
                }).catch(error=>{
                })
            }
        }
    },
    computed: {
        filtered() {
        return this.pyramids.filter(p => {
            return (p.code_pyramid).toString().toLowerCase().indexOf(this.search.toLowerCase()) != -1;
        });
        }
  }
}
</script>
