<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">{{ username }}</div>
                    <div class="card-body">
                        <form>
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="user.name" readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Nickname</label>
                                    <input type="text" class="form-control" v-model="user.nickname" readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Mobile</label>
                                    <input type="text" class="form-control" v-model="user.mobile_no" readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="mail" class="form-control" v-model="user.email" readonly>
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
                                    <input type="text" class="form-control " v-model="user.parrain" readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Departement</label>
                                    <input type="text" class="form-control " v-model="user.departement" readonly>
                                </div>
                            </div>
                            <div class="col-12 mb-2" v-if="user.carte_identite">
                                <div class="form-group">
                                    <label>Carte d'identité</label>
                                    <div class="form-control">
                                        <img class="col-4 row-6" v-bind:src="'../../../../storage/app/images/'+user.carte_identite">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                        <div >
                            <div v-for="(userpyramids,valeur) in filtered" :key="valeur">
                                <div class="card-header text-center my-2" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#collapseExample'+valeur" aria-expanded="false" v-bind:aria-controls="'collapseExample'+valeur">
                                     {{ 'All circles of '+valeur }}
                                </div>
                                <div class="collapse" v-bind:id="'collapseExample'+valeur">
                                    <div class="card card-body">
                                        <div class="row">
                                            <div class="col-lg-6 py-4 my-2 card" v-for="(userpyramid,key) in userpyramids" :key="key">
                                                <div>
                                            <div class="position-relative">
                                                <div class="position-absolute top-0 start-0 text-success"><h1>{{ thecategoryname(userpyramid) }}</h1></div>
                                                <div class="position-absolute top-0 end-0 text-danger"><h1> #{{  thepyramidcode(userpyramid) }}</h1></div>
                                            </div>
                                            <div class="position-relative mt-3">
                                                <div class="top-50 start-0">
                                                    <div class="box">
                                                        <div class="tra m"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(8,userpyramid)">{{ theposition(userpyramid,8).user_name }}</span></div>
                                                        <div class="tra n"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(9,userpyramid)">{{ theposition(userpyramid,9).user_name }}</span></div>
                                                        <div class="tra m"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(10,userpyramid)">{{ theposition(userpyramid,10).user_name }}</span></div>
                                                        <div class="tra n"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(11,userpyramid)">{{ theposition(userpyramid,11).user_name }}</span></div>
                                                        <div class="center-2">
                                                            <div class="tritra"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(4,userpyramid)">{{ theposition(userpyramid,4).user_name }}</span></div>
                                                            <div class="tritra"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(5,userpyramid)">{{ theposition(userpyramid,5).user_name }}</span></div>
                                                            <div class="center">
                                                                <div class="tri"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(2,userpyramid)">{{ theposition(userpyramid,2).user_name }}</span></div>
                                                                <div class="cer"><span >{{ theposition(userpyramid,1).user_name }}</span></div>
                                                                <div class="tri"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(3,userpyramid)">{{ theposition(userpyramid,3).user_name }}</span></div>
                                                            </div>
                                                            <div class="tritra"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(6,userpyramid)">{{ theposition(userpyramid,6).user_name }}</span></div>
                                                            <div class="tritra"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(7,userpyramid)">{{ theposition(userpyramid,7).user_name }}</span></div>
                                                        </div>
                                                        <div class="tra n"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(12,userpyramid)">{{ theposition(userpyramid,12).user_name }}</span></div>
                                                        <div class="tra m"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(13,userpyramid)">{{ theposition(userpyramid,13).user_name }}</span></div>
                                                        <div class="tra n"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(14,userpyramid)">{{ theposition(userpyramid,14).user_name }}</span></div>
                                                        <div class="tra m"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(15,userpyramid)">{{ theposition(userpyramid,15).user_name }}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="position-relative mt-4">
                                                <div class="position-absolute bottom-0 start-0 text-danger"><h1>{{ created_at(userpyramid) }}</h1></div>
                                                <div class="position-absolute bottom-0 end-0 text-danger"><h1>{{ expire_at(userpyramid) }}</h1></div>
                                            </div>
                                        </div>
                                        <router-link :to='{ name:"userpyramidEdit" , params:{ id:thepyramidid(userpyramid) } }' class="btn btn-success">Edit</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="userpyramids.length <= 0" class="col-12 mb-2 text-center">
                        <p>No circle</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update position</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
                <div class="card-body">
                    <form @submit="checkForm">
                        <div class="row">
                            <div class="col-12 mb-2 ">
                                <h5>User</h5>
                                <div class="form-group" >
                                    <label>Position  {{ position }}</label>
                                    <input type="number" name="position" v-model="userpyramidmodal.position" hidden>
                                    <input type="number" name="pyramid_id" v-model="userpyramidmodal.pyramid_id" hidden>
                                    <select class="form-select" v-model="userpyramidmodal.user_id">
                                        <option></option>
                                        <option v-for="option in users" v-bind:value="option.id">{{ option.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
    </template>
    <script>

    export default {
        name:"Welcome",
        data(){
            return{
                userpyramids:[],
                userpyramidmodal:[],
                position:null,
                users:[],
                search:"",
                username:"",
                user:{
                    id:"",
                    name:"",
                    nickname:"",
                    mobile_no:"",
                    email:"",
                    code:"",
                    parrain:"",
                    type_account:"",
                    departement:"",
                    carte_identite:"",
                },
            }
        },
        mounted(){
            this.getUserpyramids(),
            this.getUsers(),
            this.showuser()
        },
        methods:{
            async showuser(){
                await axios.get('/plf/user/'+this.$route.params.id).then(response=>{
                    const { id,name,mobile_no,email,code,type_account,parrain,departement,nickname,carte_identite} = response.data
                    this.user.id = id
                    this.user.name = name
                    this.user.nickname = nickname
                    this.user.mobile_no = mobile_no
                    this.user.email = email
                    this.user.code = code
                    this.user.parrain = parrain
                    this.user.type_account = type_account
                    this.user.departement = departement
                    this.user.carte_identite = carte_identite
                }).catch(error=>{
                })
            },
            async getUserpyramids(){
                await axios.get('/plf/pyramid_user/'+this.$route.params.id).then(response=>{
                    this.userpyramids = response.data
                }).catch(error=>{
                    this.userpyramids = []
                })
            },
            async getUsers(){
                await axios.get('/plf/user').then(response=>{
                    this.users = response.data
                }).catch(error=>{
                    this.users = []
                })
            },
            checkForm:function(e) {
                if(this.userpyramidmodal.user_id  ) this.update();
                this.getUserpyramids();
                e.preventDefault();
            },
            async update(){
                let userpyramid={
                    user_id:this.userpyramidmodal.user_id,
                    pyramid_id:this.userpyramidmodal.pyramid_id,
                    position:this.userpyramidmodal.position,
                    _method:"patch"
                };
                await axios.post('/plf/userpyramid/'+this.userpyramidmodal.pyramid_user_id, userpyramid).then(response=>{
                    this.setBackgroundColor('s');
                }).catch(error=>{
                    this.setBackgroundColor('f');
                })
            },
            thecategoryname(userpyramid){
                var value='';
                for (const key in userpyramid) {
                    value = (userpyramid[key].category_name);
                    break;
                }
                return value;
            },
            thepyramidid(userpyramid){
                var value='';
                for (const key in userpyramid) {
                    value = (userpyramid[key].pyramid_id);break;
                }
                return value;
            },
            thepyramidcode(userpyramid){
                var value='';
                for (const key in userpyramid) {
                    value = (userpyramid[key].code_pyramid);break;
                }
                return value;
            },
            theposition(userpyramid,position){
                var value='';
                for (const key in userpyramid) {
                    if (this.$route.params.id== userpyramid[key].user_id) {
                        this.username = (userpyramid[key].user_name);
                    }
                    if (position== userpyramid[key].position) {
                        value = (userpyramid[key]);
                    }
                }
                return value;
            },
            created_at(userpyramid){
                var value='';
                for (const key in userpyramid) {
                    value = (userpyramid[key].created_at);break;
                }
                return this.getdate(value);
            },
            expire_at(userpyramid){
                var value='';
                for (const key in userpyramid) {
                    value = (userpyramid[key].expire_at);break;
                }
                return this.getdate(value);
            },
            getdate(value){
                if (value) {
                    var date = new Date(value);
                    return ((date.getMonth()+1) + '/' + date.getDate() + '/' +  date.getFullYear());
                }
            },
            setBackgroundColor (val) {
                var backgroundColor = ref('#f00000')
                if(val=='s'){
                    backgroundColor = ref('#00f000')
                }
                document.querySelector('body').style.backgroundColor = backgroundColor.value;
                setTimeout(() => { document.querySelector('body').style.backgroundColor =null; }, 3000);

            }
        },
        computed: {
            filtered() {
                var result = this.userpyramids
                // if (this.search.length>0){
                //     var result = [];
                //     for (const iduserpyramid in this.userpyramids) {
                //         if (Object.hasOwnProperty.call(this.userpyramids, iduserpyramid)) {
                //             const userpyramid = this.userpyramids[iduserpyramid];
                //             for (const position in userpyramid) {
                //                 if (Object.hasOwnProperty.call(userpyramid, position)) {
                //                     const element = userpyramid[position];
                //                     if (element.code_pyramid.toString().toLowerCase().includes(this.search.toLowerCase())) {
                //                         result = userpyramid
                //                     }
                //                     // console.log(element.code_pyramid.toString().toLowerCase().includes(this.search.toLowerCase()))
                //                 }
                //             }
                //         }
                //     }
                // }else{
                //     result = this.userpyramids
                // }
                return result
            // return this.userpyramids.filter(p => {
            //     return p
            //     // return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            // });
        }
    }
}
    </script>
