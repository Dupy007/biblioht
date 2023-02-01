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
                                    <input type="text" class="form-control" v-model="user.name">
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
                                    <label>Code</label>
                                    <input type="text" class="form-control" readonly v-model="user.code">
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
                                    <label>Code Parrain</label>
                                    <div v-if="codeparrain">
                                        <input type="text" class="form-control " v-model="user.parrain" readonly>
                                    </div>
                                    <div v-else>
                                        <input type="text" class="form-control " v-model="user.parrain">
                                    </div>
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
    name:"update-user",
    data(){
        return{
            user:{
                name:"",
                mobile_no:"",
                email:"",
                code:"",
                parrain:"",
                type_account:"",
                _method:"patch"
            },
            errors:[],
            codeparrain:null,
        }
    },
    mounted(){
        this.showuser()
    },
    methods:{
        async showuser(){
            await axios.get('/plf/user/'+this.$route.params.id).then(response=>{
                const { name,mobile_no,email,code,type_account,parrain} = response.data
                this.user.name = name
                this.user.mobile_no = mobile_no
                this.user.email = email
                this.user.code = code
                this.user.parrain = this.codeparrain = parrain
                this.user.type_account = type_account
            }).catch(error=>{
                console.log(error)
            })
        },
        async update(){
            await axios.post('/plf/user/'+this.$route.params.id, this.user).then(response=>{
                this.$router.push({name:"userList"})
                // console.log(response.data);
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
            if(this.user.name && this.user.email  ) this.update();
            this.errors = [];
            if(!this.user.name) this.errors.push("Name required.");
            if(!this.user.email) this.errors.push("Email required.");
            if(!this.user.mobile_no) this.errors.push("Mobile required.");
            e.preventDefault();
        }
    }
}
</script>
