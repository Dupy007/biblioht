<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Update Pyramid</h4>
                </div>
                <div class="card-body">
                    <form @submit="checkForm">
                        <div class="row">
                            <p v-if="errors.length">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                <li v-for="error in errors">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>User</label>
                                    <select class="form-select" v-model="pyramid.user_id">
                                        <option v-for="option in users" v-bind:value="option.id">{{ option.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Category</label>
                                    <select class="form-control" v-model="pyramid.category_id">
                                        <option v-for="option in categories" v-bind:value="option.id">{{ option.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Expire</label>
                                    <input type="text" class="form-control" v-model="pyramid.expire_at">
                                </div>
                            </div> -->
                            <div class="col-12 mb-2">
                                <button type="submit" class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"update-pyramid",
    data(){
        return{
            pyramid:{
                user_id:"",
                category_id:"",
                expire_at:"",
                _method:"patch"
            },
            users:[],
            categories:[],
            errors:[],
        }
    },
    mounted(){
        this.showpyramid(),
        this.getUsers(),
        this.getCategories()
    },
    methods:{
        async showpyramid(){
            await axios.get('/plf/pyramid/'+this.$route.params.id).then(response=>{
                const { user_id,category_id, expire_at} = response.data
                this.pyramid.user_id = user_id
                this.pyramid.category_id = category_id
                this.pyramid.expire_at = expire_at
            }).catch(error=>{
                console.log(error)
            })
        },
        async update(){
            await axios.post('/plf/pyramid/'+this.$route.params.id, this.pyramid).then(response=>{
                this.$router.push({name:"pyramidList"})
            }).catch(error=>{
                var theeerrors= [];
                theeerrors = error.response.data.errors;
                for (const key in theeerrors) {
                    if (Object.hasOwnProperty.call(theeerrors, key)) {
                        const element = theeerrors[key];
                        this.errors.push(element[0]);
                    }
                }
                console.log(error)
            })
        },
        async getUsers(){
            await axios.get('/plf/user').then(response=>{
                this.users = response.data
            }).catch(error=>{
                console.log(error)
                this.users = []
            })
        },
        async getCategories(){
            await axios.get('/plf/category').then(response=>{
                this.categories = response.data
            }).catch(error=>{
                console.log(error)
                this.categories = []
            })
        },
        checkForm:function(e) {
            if(this.pyramid.user_id && this.pyramid.category_id  ) this.update();
            this.errors = [];
            if(!this.pyramid.user_id) this.errors.push("User required.");
            if(!this.pyramid.category_id) this.errors.push("Category required.");
            e.preventDefault();
        }
    }
}
</script>
