<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Update Category</h4>
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
                                    <label>Title</label>
                                    <input type="text" class="form-control" v-model="category.name">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Value</label>
                                    <input type="text" class="form-control" v-model="category.valeur">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Description</label>
                                    <input type="text" class="form-control" v-model="category.description">
                                </div>
                            </div>
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
    name:"update-category",
    data(){
        return{
            category:{
                name:"",
                valeur:"",
                description:"",
                _method:"patch"
            },
            errors:[],
        }
    },
    mounted(){
        this.showCategory()
    },
    methods:{
        async showCategory(){
            await axios.get('/api/category/'+this.$route.params.id).then(response=>{
                const { name,valeur, description} = response.data
                this.category.name = name
                this.category.valeur = valeur
                this.category.description = description
            }).catch(error=>{
                console.log(error)
            })
        },
        async update(){
            await axios.post('/api/category/'+this.$route.params.id, this.category).then(response=>{
                this.$router.push({name:"categoryList"})
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
        checkForm:function(e) {
            if(this.category.name && this.category.valeur  ) this.update();
            this.errors = [];
            if(!this.category.name) this.errors.push("Name required.");
            if(!this.category.valeur) this.errors.push("Value required.");
            e.preventDefault();
        }
    }
}
</script>
