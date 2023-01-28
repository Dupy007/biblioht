<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Add Category</h4>
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
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="category.name">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Value</label>
                                    <input type="number" class="form-control" v-model="category.valeur">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Description</label>
                                    <input type="text" class="form-control" v-model="category.description">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" class="btn btn-primary">Save</button>
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
    name:"add-category",
    data(){
        return{
            category:{
                name:"",
                valeur:"",
                description:""
            },
            errors:[],
        }
    },
    methods:{
        async create(){
            await axios.post('/api/category', this.category).then(response=>{
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
                console.log('error =>' ,error);
            })
        },
        checkForm:function(e) {
            if(this.category.name && this.category.valeur) this.create();
            this.errors = [];
            if(!this.category.name) this.errors.push("Name required.");
            if(!this.category.valeur) this.errors.push("Value required.");
            e.preventDefault();
        }
    }
}
</script>
