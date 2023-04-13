<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Add User</h4>
                </div>
                <div class="card-body">
                    <!-- <form @submit.prevent="create" @submit="checkForm"> -->
                    <form @submit="checkForm">
                        <div class="row">
                            <p v-if="errors.length" class="bg-danger">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                <li v-for="error in errors">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="user.name">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Nickname</label>
                                    <input type="text" class="form-control" v-model="user.nickname">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Mobile</label>
                                    <input type="text" class="form-control" v-model="user.mobile_no">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="mail" class="form-control" v-model="user.email">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Type</label>
                                    <input type="text" class="form-control " v-model="user.type_account">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Code parrain</label>
                                    <input type="text" class="form-control " v-model="user.parrain">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Departement</label>
                                    <select  class="form-control " v-model="user.departement">
                                        <option v-for="item in departements" v-bind:value="item">{{ item }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Carte d'identité</label>
                                    <input type="file" class="form-control " v-on:change="onFileChange" accept="image/*" >
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
    name:"add-user",
    data(){
        return{
            user:{
                name:"",
                nickname:"",
                mobile_no:"",
                email:"",
                code:"",
                parrain:"",
                type_account:"user",
                password:"PLFMotDePasse",
                password_confirmation:"PLFMotDePasse",
                carte_identite:null,
                departement:"",
            },
            errors:[],
            departements:[ "Artibonite","Centre","Grand'Anse","Nippes","Nord","Nord-Est","Nord-Ouest","Ouest","Sud","Sud-Est","Autre"],
        }
    },
    methods:{
        onFileChange(e){
            this.user.carte_identite = e.target.files[0];
        },
        async create(){
            const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            await axios.post('/plf/user', this.user,config).then(response=>{
                this.$router.push({name:"userList"})
            }).catch(error=>{
                var theeerrors= [];
                theeerrors = error.response.data.errors;
                for (const key in theeerrors) {
                    if (Object.hasOwnProperty.call(theeerrors, key)) {
                        const element = theeerrors[key];
                        this.errors.push(element[0]);
                    }
                }
            })
        },
        checkForm:function(e) {
            if(this.user.name && this.user.email  ) this.create();
            this.errors = [];
            if(!this.user.name) this.errors.push("Name required.");
            if(!this.user.nickname) this.errors.push("Nickname required.");
            if(!this.user.email) this.errors.push("Email required.");
            if(!this.user.mobile_no) this.errors.push("Mobile required.");
            e.preventDefault();
        }
    }
}
</script>
