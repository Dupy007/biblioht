<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{name:"categoryAdd"}' class="btn btn-primary">Create</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Category</h4>
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
                                    <th>Value</th>
                                    <th>Description</th>
                                    <th>Account Name</th>
                                    <th>Account Number</th>
                                    <th>Limit Pyramid</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="categories.length > 0">
                                <tr v-for="(category,key) in filtered" :key="key">
                                    <td>{{ category.id }}</td>
                                    <td>{{ category.name }}</td>
                                    <td>{{ category.valeur }}</td>
                                    <td>{{ category.description }}</td>
                                    <td>{{ category.category_name_account }}</td>
                                    <td>{{ category.category_number_account }}</td>
                                    <td>{{ category.category_max }}</td>
                                    <td>
                                        <router-link :to='{ name:"categoryEdit" , params:{ id:category.id } }' class="btn btn-success">Edit</router-link>
                                        <button type="button" @click="deleteCategory(category.id)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" align="center">No Categories Found.</td>
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
    name:"categories",
    data(){
        return{
            categories:[],
            search: ""
        }
    },
    mounted(){
        this.getCategories()
    },
    methods:{
        async getCategories(){
            await axios.get('/plf/category').then(response=>{
                this.categories = response.data
            }).catch(error=>{
                this.categories = []
            })
        },
        deleteCategory(id){
            if(confirm("Are you sure to delete this category ?")){
                axios.delete('/plf/category/'+id).then(response=>{
                    this.getCategories()
                }).catch(error=>{
                })
            }
        }
    },
    computed: {
        filtered() {
        return this.categories.filter(p => {
            return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
        });
        }
  }
}
</script>
