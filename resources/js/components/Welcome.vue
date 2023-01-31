<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Dashboard</div>
                    <div class="card-body">
                        <div v-for="(userpyramid,key) in userpyramids" :key="key">
                            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-2">
                            <div class="col">
                                <div class="card shadow-sm">
                                    <div>
                                        <div class="position-relative">
                                            <div class="position-absolute top-0 start-0 text-danger">{{ thecategoryname(userpyramid) }}</div>
                                            <div class="position-absolute top-0 end-0 text-danger"> #{{  thepyramidid(userpyramid) }}</div>
                                        </div>
                                        <div class="position-relative mt-3">
                                            <div class=" top-50 start-0">
                                                <div class="box">
                                                    <div class="tra m"><span>{{ theposition(userpyramid,8).user_name }}</span></div>
                                                    <div class="tra n"><span>{{ theposition(userpyramid,9).user_name }}</span></div>
                                                    <div class="tra m"><span>{{ theposition(userpyramid,10).user_name }}</span></div>
                                                    <div class="tra n"><span>{{ theposition(userpyramid,11).user_name }}</span></div>
                                                    <div class="center-2">
                                                        <div class="tritra"><span>{{ theposition(userpyramid,4).user_name }}</span></div>
                                                        <div class="tritra"><span>{{ theposition(userpyramid,5).user_name }}</span></div>
                                                        <div class="center">
                                                            <div class="tri"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(2,userpyramid)">{{ theposition(userpyramid,2).user_name }}</span></div>
                                                            <div class="cer"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(1,userpyramid)">{{ theposition(userpyramid,1).user_name }}</span></div>
                                                            <div class="tri"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="loadDataModal(3,userpyramid)">{{ theposition(userpyramid,3).user_name }}</span></div>
                                                        </div>
                                                        <div class="tritra"><span>{{ theposition(userpyramid,6).user_name }}</span></div>
                                                        <div class="tritra"><span>{{ theposition(userpyramid,7).user_name }}</span></div>
                                                    </div>
                                                    <div class="tra n"><span>{{ theposition(userpyramid,12).user_name }}</span></div>
                                                    <div class="tra m"><span>{{ theposition(userpyramid,13).user_name }}</span></div>
                                                    <div class="tra n"><span>{{ theposition(userpyramid,14).user_name }}</span></div>
                                                    <div class="tra m"><span>{{ theposition(userpyramid,15).user_name }}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="position-relative mt-4">
                                            <div class="position-absolute bottom-0 start-0 text-danger">{{ created_at(userpyramid) }}</div>
                                            <div class="position-absolute bottom-0 end-0 text-danger">{{ expire_at(userpyramid) }}</div>
                                        </div>
                                    </div>
                                    <router-link :to='{ name:"userpyramidEdit" , params:{ id:thepyramidid(userpyramid) } }' class="btn btn-success">Edit</router-link>
                                </div>
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
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
                render: true,
            }
        },
        mounted(){
            this.getUserpyramids(),
            this.getUsers()
        },
        methods:{
            reload() {
                this.render = false;
                this.$nextTick(() => {
                    this.render = true;
                });
            },
            loadDataModal(position,userpyramid){
                this.position = position;
                this.userpyramidmodal = this.theposition(userpyramid,position);
            },
            async getUserpyramids(){
                await axios.get('/api/userpyramid').then(response=>{
                    this.userpyramids = response.data
                    // console.log(response.data);
                }).catch(error=>{
                    console.log(error)
                    this.userpyramids = []
                })
            },
            async getUsers(){
                await axios.get('/api/user').then(response=>{
                    this.users = response.data
                }).catch(error=>{
                    console.log(error)
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
                await axios.post('/api/userpyramid/'+this.userpyramidmodal.pyramid_user_id, userpyramid).then(response=>{
                    this.setBackgroundColor('s');
                }).catch(error=>{
                    console.log(error)
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
            theposition(userpyramid,position){
                var value='';
                for (const key in userpyramid) {
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
    }
    </script>
<style>
span{
    position: absolute;
    left: -50%;
    display: block;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
}

.box {
    width: 100%;
    height: 100%;
    position: relative;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    /* border: 1px solid #000; */
}

.center, .center-2{
    margin: auto;
}

.tri {
    position: absolute;
    height: 0;
    width: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
    border-left: 100px solid transparent;
    z-index: 1;
}

.tri span{
    width: 90px;
    transform: translate(-44px, 44px);
}

.tri:last-child span{
    transform: scale(-1) translate(44px, -44px);
}


.tri:first-child{
    left: 300px;
    top: 300px;
    transform: translate(-50%, -103%);
}

.tri:last-child{
    left: 300px;
    top: 300px;
    transform: translate(-50%, 3%) rotate(180deg);
}

.cer{
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: greenyellow;
    left: 300px;
    top: 300px;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.cer span{
    width: 70px;
    top: -30%;
    transform: translate(45px, 45px);
}

.tritra{
    position: absolute;
}

.tritra::before {
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    border-bottom: 30px solid blue;
    border-right: 125px solid transparent;
    border-left: 125px solid transparent;
    z-index: 1;
}

.tritra::after{
    content: '';
    position: absolute;
    top: 29.2px;
    height: 0;
    width: 148px;
    border-bottom: 50px solid blue;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
    transform: rotate(180deg);
}

.tritra span{
    width: 185px;
    transform: translate(35px, 30px);
    z-index: 3;
}

.tritra:nth-child(n+3) span{
    transform: scale(-1) translate(-35px, -30px);
}

.tritra:first-child{
    top: 276px;
    left: 100px;
    transform: rotate(-45deg);
}

.tritra:nth-child(2){
    top: 100px;
    left: 324px;
    transform: rotate(45deg);
}

.tritra:nth-child(4){
    top: 500px;
    left: 276px;
    transform: rotate(-135deg);
}

.tritra:last-child{
    top: 324px;
    left: 500px;
    transform: rotate(135deg);
}

.tra{
    position: absolute;
    height: 0;
    width: 127px;
    border-bottom: 50px solid yellow;
}

.tra span{
    width: 95%;
    transform: translate(68px, 25px);
}

.tra:nth-child(-n+5) span{
    transform: scale(-1) translate(-68px, -25px);
}

.tra.m{
    border-right: 30px solid transparent;
    border-left: 10px solid transparent;
}

.tra.n{
    border-right: 10px solid transparent;
    border-left: 30px solid transparent;
}

.tra:first-child{
    top: 212px;
    left: 38px;
    transform: rotate(121.5deg);
}

.tra:nth-child(2){
    top: 97px;
    left: 153px;
    transform: rotate(148.5deg);
}

.tra:nth-child(3){
    top: 97px;
    left: 279px;
    transform: rotate(211.5deg);
}

.tra:nth-child(4){
    top: 212px;
    left: 396px;
    transform: rotate(238.5deg);
}

.tra:nth-child(6){
    top: 340px;
    left: 39px;
    transform: rotate(418.5deg);
}

.tra:nth-child(7){
    top: 454px;
    left: 154px;
    transform: rotate(391.5deg);
}

.tra:nth-child(8){
    top: 452px;
    left: 280px;
    transform: rotate(328.5deg);
}

.tra:last-child{
    top: 337px;
    left: 395px;
    transform: rotate(-58.5deg);
}
</style>
