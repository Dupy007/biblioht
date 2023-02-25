<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Update User</h4>
                </div>
                <div class="card-body">
                    <!-- <form @submit.prevent="update" @submit="checkForm"> -->
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
                                    <input type="text" class="form-control" v-model="user.name" v-if="edit">
                                    <input type="text" class="form-control" v-model="user.name" v-else readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Mobile</label>
                                    <input type="text" class="form-control" v-model="user.mobile_no" v-if="edit">
                                    <input type="text" class="form-control" v-model="user.mobile_no" v-else readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="mail" class="form-control" v-model="user.email" v-if="edit">
                                    <input type="mail" class="form-control" v-model="user.email" v-else readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Code</label>
                                    <input type="text" class="form-control" readonly v-model="user.code">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Code Parrain</label>
                                    <div v-if="codeparrain">
                                        <input type="text" class="form-control " v-model="user.parrain" readonly>
                                    </div>
                                    <div v-else>
                                        <input type="text" class="form-control " v-model="user.parrain" v-if="edit">
                                        <input type="text" class="form-control " v-model="user.parrain" v-else readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Departement</label>
                                    <select  class="form-control " v-model="user.departement" v-if="edit">
                                        <option v-for="item in departements" v-bind:value="item">{{ item }}</option>
                                    </select>
                                    <input type="text" class="form-control " v-model="user.departement" v-else readonly>
                                </div>
                            </div>
                            <div v-if="edit" class="col-12 mb-2">
                                <button type="submit" class="btn btn-primary">Update</button>
                            </div>
                            <div v-else class="col-12 mb-2">
                                <button class="btn btn-warning" v-on:click="editprofil">Edit</button>
                            </div>
                            <div  class="col-12 mb-2">
                                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Change Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
                <div class="card-body">
                    <form @submit="updatepass">
                        <div class="row">
                            <p v-if="errorspassword.length" class="bg-danger">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                <li v-for="error in errorspassword">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Old Password</label>
                                    <input type="password" class="form-control " v-model="password.password_old">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>New Password</label>
                                    <input type="password" class="form-control " v-model="password.password">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" class="form-control " v-model="password.password_confirmation">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" class="btn btn-primary" >Update</button>
                            </div>
                        </div>
                    </form>
                </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default{
    name:"update-user",
    data(){
        return{
            user:{
                id:"",
                name:"",
                mobile_no:"",
                email:"",
                code:"",
                parrain:"",
                type_account:"",
                departement:"",
                _method:"patch"
            },
            errors:[],
            errorspassword:[],
            codeparrain:null,
            departements:[ "Artibonite","Centre","Grand'Anse","Nippes","Nord","Nord-Est","Nord-Ouest","Ouest","Sud","Sud-Est","Autre"],
            edit:false,
            password:{
                password_old:null,
                password_:null,
                password_confirmation:null,
            },
        }
    },
    mounted(){
        this.showuser()
    },
    methods:{
        async showuser(){
            await axios.get('/session').then(response=>{
                const { id,name,mobile_no,email,code,type_account,parrain,departement} = response.data.auth
                this.user.id = id
                this.user.name = name
                this.user.mobile_no = mobile_no
                this.user.email = email
                this.user.code = code
                this.user.parrain = this.codeparrain = parrain
                this.user.type_account = type_account
                this.user.departement = departement
            }).catch(error=>{
            })
        },
        async update(){
            await axios.post('/plf/user/'+this.user.id, this.user).then(response=>{
                this.edit=false;
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
        async password_update(){
            await axios.post('/plf/password_change', this.password).then(response=>{
                // this.$router.push({name:"userList"})
                this.edit=false;
            }).catch(error=>{
                var theeerrors= [];
                theeerrors = error.response.data.errors;
                for (const key in theeerrors) {
                    if (Object.hasOwnProperty.call(theeerrors, key)) {
                        const element = theeerrors[key];
                        this.errorspassword.push(element[0]);
                    }
                }
            })
        },
        checkForm:function(e) {
            if(this.user.name && this.user.email  ) this.update();
            this.errors = [];
            if(!this.user.name) this.errors.push("Name required.");
            if(!this.user.email) this.errors.push("Email required.");
            if(!this.user.mobile_no) this.errors.push("Mobile required.");
            e.preventDefault();
        },
        editprofil() {
            this.edit=true;
        },
        updatepass:function(e) {
            if(this.password.password_old && this.password.password && this.password.password_confirmation  ) this.password_update();
            this.errorspassword = [];
            if(!this.password.password_old) this.errorspassword.push("Old Password required.");
            if(!this.password.password) this.errorspassword.push("New Password required.");
            if(!this.password.password_confirmation) this.errorspassword.push("Confirmation Password required.");
            e.preventDefault();
        },
    }
}
</script>
