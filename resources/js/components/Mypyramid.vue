<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Dashboard</div>
                    <div v-if="userpyramids.length <= 0" class="col-12 mb-2 text-center">
                        <p>Contact an administrator to add them to a circle</p>
                    </div>
                    <div v-else class="card-body">
                        <div class="row">
                            <div class="col-lg-6 py-4 my-2 card" v-for="(userpyramid,key) in userpyramids" :key="key">
                                <div>
                                    <div class="card shadow-sm">
                                        <div>
                                            <div class="position-relative">
                                                <div class="position-absolute top-0 start-0 text-success"> <h1> {{ userpyramid.category_name }}</h1></div>
                                                <div class="position-absolute top-0 end-0 text-danger"><h1> #{{  userpyramid.code_pyramid }}</h1></div>
                                            </div>
                                            <div class="position-relative mt-3">
                                                <div class=" top-50 start-0">
                                                    <div class="box">
                                                        <div class="tra m"><span>{{ theposition(userpyramid,8) }}</span></div>
                                                        <div class="tra n"><span>{{ theposition(userpyramid,9) }}</span></div>
                                                        <div class="tra m"><span>{{ theposition(userpyramid,10) }}</span></div>
                                                        <div class="tra n"><span>{{ theposition(userpyramid,11) }}</span></div>
                                                        <div class="center-2">
                                                            <div class="tritra"><span>{{ theposition(userpyramid,4) }}</span></div>
                                                            <div class="tritra"><span>{{ theposition(userpyramid,5) }}</span></div>
                                                            <div class="center">
                                                                <div class="tri"><span>{{ theposition(userpyramid,2) }}</span></div>
                                                                <div class="cer"><span data-bs-toggle="modal" data-bs-target="#exampleModal" @click="initmodal(userpyramid,1)">{{ userpyramid.ismine?'Me': theposition(userpyramid,1)}}</span></div>
                                                                <div class="tri"><span>{{ theposition(userpyramid,3) }}</span></div>
                                                            </div>
                                                            <div class="tritra"><span>{{ theposition(userpyramid,6) }}</span></div>
                                                            <div class="tritra"><span>{{ theposition(userpyramid,7) }}</span></div>
                                                        </div>
                                                        <div class="tra n"><span>{{ theposition(userpyramid,12) }}</span></div>
                                                        <div class="tra m"><span>{{ theposition(userpyramid,13) }}</span></div>
                                                        <div class="tra n"><span>{{ theposition(userpyramid,14) }}</span></div>
                                                        <div class="tra m"><span>{{ theposition(userpyramid,15) }}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="position-relative mt-4">
                                                <div class="position-absolute bottom-0 start-0 text-danger"><h1>{{ getdate(userpyramid.created_at) }}</h1></div>
                                                <div class="position-absolute bottom-0 end-0 text-danger"><h1>{{ getdate(userpyramid.expire_at)  }}</h1></div>
                                            </div>
                                        </div>
                                        <div v-if="userpyramid.ismine">
                                            <form @submit.prevent="endpyramid(userpyramid.pyramid_id)" v-if="!userpyramid.isend && !userpyramid.isconfirm && userpyramid.iscomplete">
                                                <div class="col-12 mb-2">
                                                    <button type="submit" class="btn btn-primary">Confirm receipt of payments</button>
                                                </div>
                                            </form>
                                            <form @submit.prevent="nextpyramid(userpyramid.pyramid_id)" v-if="userpyramid.isend">
                                                <div class="col-12 mb-2">
                                                    <button type="submit" class="btn btn-primary">Go to next level pyramid {{userpyramid.pyramid_id}}</button>
                                                </div>
                                            </form>
                                            <div v-if="!userpyramid.isend && userpyramid.isconfirm" class="col-12 mb-2 text-center">
                                                <p>Contact administrator for validation payment</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button v-if="userpyramid.myposition > 7 && userpyramid.myposition < 15" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="initmodal(userpyramid,2)">Contact for payment</button>
                                    <button v-else-if="userpyramid.myposition == 15" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="initmodal(userpyramid,3)">Contact for payment</button>
                                </div>
                            </div>
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
        <h5 v-if="ismine" class="modal-title" id="exampleModalLabel">Update my info payment</h5>
        <h5 v-else class="modal-title" id="exampleModalLabel">Payment Info</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card-body">
            <div v-if="ismine" class="col-12 mb-2 ">
                <form @submit="checkForm">
                    <div class="row">
                        <p v-if="errors.length" class="bg-danger">
                            <b>Please correct the following error(s):</b>
                            <ul>
                            <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </p>
                        <div class="col-12 mb-2 ">
                            <div class="form-group" >
                                <label>Name account</label>
                                <input class="form-control" type="text" v-model="pyramid.pyramid_name_account" >
                            </div>
                        </div>
                        <div class="col-12 mb-2 ">
                            <div class="form-group" >
                                <label>Number account</label>
                                <input class="form-control" type="text" v-model="pyramid.pyramid_number_account">
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else class="col-12 mb-2 ">
                <h1>Name account : {{  master_user.name }}</h1>
                <h2>Number account : {{  master_user.phone }}</h2>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="card" v-if="!(otherpyramids.length <= 0)">

    <div v-for="(userpyramids,valeur) in otherpyramids" :key="valeur">
                                <div class="card-header text-center my-2 bg-secondary" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#collapseExample'+valeur" aria-expanded="false" v-bind:aria-controls="'collapseExample'+valeur">
                                    Other circle in my category {{ valeur }}
                                </div>
                                <div class="collapse" v-bind:id="'collapseExample'+valeur">
                                    <div class="card card-body">
                                        <div class="row">
                                            <div class="col-lg-6 py-4 my-2 card" v-for="(userpyramid,key) in userpyramids" :key="key">
                                                <div>
                                    <div class="position-relative">
                                        <div class="position-absolute top-0 start-0  text-success"><h1>{{ thecategoryname(userpyramid) }}</h1></div>
                                        <div class="position-absolute top-0 end-0 text-danger"><h1> #{{  thepyramidcode(userpyramid) }}</h1></div>
                                    </div>
                                    <div class="position-relative mt-3">
                                        <div class="top-50 start-0">
                                            <div class="box">
                                                <div class="tra m"><span>{{ theposition(userpyramid,8) }}</span></div>
                                                <div class="tra n"><span>{{ theposition(userpyramid,9) }}</span></div>
                                                <div class="tra m"><span>{{ theposition(userpyramid,10) }}</span></div>
                                                <div class="tra n"><span>{{ theposition(userpyramid,11) }}</span></div>
                                                <div class="center-2">
                                                    <div class="tritra"><span>{{ theposition(userpyramid,4) }}</span></div>
                                                    <div class="tritra"><span>{{ theposition(userpyramid,5) }}</span></div>
                                                    <div class="center">
                                                        <div class="tri"><span>{{ theposition(userpyramid,2) }}</span></div>
                                                        <div class="cer"><span>{{ theposition(userpyramid,1) }}</span></div>
                                                        <div class="tri"><span>{{ theposition(userpyramid,3) }}</span></div>
                                                    </div>
                                                    <div class="tritra"><span>{{ theposition(userpyramid,6) }}</span></div>
                                                    <div class="tritra"><span>{{ theposition(userpyramid,7) }}</span></div>
                                                </div>
                                                <div class="tra n"><span>{{ theposition(userpyramid,12) }}</span></div>
                                                <div class="tra m"><span>{{ theposition(userpyramid,13) }}</span></div>
                                                <div class="tra n"><span>{{ theposition(userpyramid,14) }}</span></div>
                                                <div class="tra m"><span>{{ theposition(userpyramid,15) }}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="position-relative mt-4">
                                        <div class="position-absolute bottom-0 start-0 text-danger"><h1>{{ created_at(userpyramid) }}</h1></div>
                                        <div class="position-absolute bottom-0 end-0 text-danger"><h1>{{ expire_at(userpyramid) }}</h1></div>
                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
</div>
</template>
<script>
export default {
    name:"mypyramid",
    data(){
        return{
            userpyramids:[],
            ismine:false,
            isend:false,
            isconfirm:false,
            iscomplete:false,
            pyramid_id:null,
            auth:null,
            myposition:null,
            master_user:{
                name:null,
                phone:null,
            },
            pyramid:{
                id:null,
                pyramid_name_account:null,
                pyramid_number_account:null,
                user_id:null,
                category_id:null
                // _method:"patch"
            },
            errors:[],
            otherpyramids:[],
            category_id:null,
        }
    },
    mounted(){
        this.getUserpyramids();
        this.auth = JSON.parse(localStorage.auth);
    },
    methods:{
        async nextpyramid(id){
            await axios.get('/plf/nextpyramid/'+id).then(response=>{
                alert(response.data.message)
                this.getUserpyramids();
            }).catch(error=>{
                this.userpyramids = []
            })
        },
        async endpyramid(id){
            await axios.get('/plf/confirmpaymentpyramid/'+id).then(response=>{
                this.getUserpyramids();
            }).catch(error=>{
                this.userpyramids = []
            })
        },
        async getUserpyramids(){
            await axios.get('/plf/mypyramid').then(response=>{
                // console.log(response.data)
                this.userpyramids = response.data.userpyramids
                this.otherpyramids = response.data.moreuserpyramids
            }).catch(error=>{
                this.userpyramids = []
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
        thepyramidcode(userpyramid){
            var value='';
            for (const key in userpyramid) {
                value = (userpyramid[key].code_pyramid);break;
            }
            this.pyramid_id=value;
            return value;
        },
        thepyramidid(userpyramid){
            var value='';
            for (const key in userpyramid) {
                value = (userpyramid[key].pyramid_id);break;
            }
            this.pyramid_id=value;
            return value;
        },
        theposition(userpyramid,position){
            var value='';
            for (const key in userpyramid) {
                if ( (userpyramid[key] != null) && position == userpyramid[key].position) {
                    value = (userpyramid[key].user_name);
                    break;
                }
            }
            return value;
        },
        initmodal(userpyramid,position){
            this.ismine = false
            for (const key in userpyramid) {
                if (position == 1 && position== userpyramid[key].position) {
                    this.ismine = userpyramid.ismine

                    this.pyramid.pyramid_name_account = userpyramid[key].pyramid_name_account;
                    this.pyramid.pyramid_number_account = userpyramid[key].pyramid_number_account;
                    this.pyramid.user_id = userpyramid[key].user_id;
                    this.pyramid.category_id = userpyramid[key].category_id;
                    this.pyramid.id = userpyramid[key].pyramid_id;
                    console.log(this.pyramid)
                    this.master_user.name = userpyramid[key].pyramid_name_account;
                    this.master_user.phone = userpyramid[key].pyramid_number_account;
                    break;
                }
                else if (position == 2) {
                    this.master_user.name = userpyramid[key].pyramid_name_account;
                    this.master_user.phone = userpyramid[key].pyramid_number_account;
                    break;
                }else{
                    this.master_user.name = userpyramid[key].category_name_account;
                    this.master_user.phone = userpyramid[key].category_number_account;
                    break;
                }
            }
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
        checkForm:function(e) {
            if(this.pyramid.pyramid_name_account && this.pyramid.pyramid_number_account ) this.update();
            this.errors = [];
            if(!this.pyramid.pyramid_name_account) this.errors.push("Name required.");
            if(!this.pyramid.pyramid_number_account) this.errors.push("Number required.");
            e.preventDefault();
        },
        async update(){
            this.pyramid.user_id = this.auth.id
            await axios.post('/plf/pyramidedit/'+this.pyramid.id, this.pyramid).then(response=>{
                $('#exampleModal').hide()
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                this.getUserpyramids();
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
    },
}
</script>
