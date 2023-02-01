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
                                                    <div class="tra m"><span @click="myalert(userpyramid,8)">{{ theposition(userpyramid,8) }}</span></div>
                                                    <div class="tra n"><span @click="myalert(userpyramid,9)">{{ theposition(userpyramid,9) }}</span></div>
                                                    <div class="tra m"><span @click="myalert(userpyramid,10)">{{ theposition(userpyramid,10) }}</span></div>
                                                    <div class="tra n"><span @click="myalert(userpyramid,11)">{{ theposition(userpyramid,11) }}</span></div>
                                                    <div class="center-2">
                                                        <div class="tritra"><span @click="myalert(userpyramid,4)">{{ theposition(userpyramid,4) }}</span></div>
                                                        <div class="tritra"><span @click="myalert(userpyramid,5)">{{ theposition(userpyramid,5) }}</span></div>
                                                        <div class="center">
                                                            <div class="tri"><span @click="myalert(userpyramid,2)">{{ theposition(userpyramid,2) }}</span></div>
                                                            <div class="cer"><span @click="myalert(userpyramid,1)">{{ theposition(userpyramid,1) }}</span></div>
                                                            <div class="tri"><span @click="myalert(userpyramid,3)">{{ theposition(userpyramid,3) }}</span></div>
                                                        </div>
                                                        <div class="tritra"><span @click="myalert(userpyramid,6)">{{ theposition(userpyramid,6) }}</span></div>
                                                        <div class="tritra"><span @click="myalert(userpyramid,7)">{{ theposition(userpyramid,7) }}</span></div>
                                                    </div>
                                                    <div class="tra n"><span @click="myalert(userpyramid,12)">{{ theposition(userpyramid,12) }}</span></div>
                                                    <div class="tra m"><span @click="myalert(userpyramid,13)">{{ theposition(userpyramid,13) }}</span></div>
                                                    <div class="tra n"><span @click="myalert(userpyramid,14)">{{ theposition(userpyramid,14) }}</span></div>
                                                    <div class="tra m"><span @click="myalert(userpyramid,15)">{{ theposition(userpyramid,15) }}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="position-relative mt-4">
                                            <div class="position-absolute bottom-0 start-0 text-danger">{{ created_at(userpyramid) }}</div>
                                            <div class="position-absolute bottom-0 end-0 text-danger">{{ expire_at(userpyramid) }}</div>
                                        </div>
                                    </div>
                                </div>
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
            }
        },
        mounted(){
            this.getUserpyramids()
        },
        methods:{
            async getUserpyramids(){
                await axios.get('/plf/mypyramid').then(response=>{
                    this.userpyramids = response.data.userpyramids
                    this.ismine = response.data.ismine
                    this.isend = response.data.isend
                }).catch(error=>{
                    console.log(error)
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
                        value = (userpyramid[key].user_name);
                    }
                }
                return value;
            },
            myalert(userpyramid,position){
                var value='Name : ';
                for (const key in userpyramid) {
                    if (position== userpyramid[key].position) {
                        value += (userpyramid[key].user_name);
                        // value += "\n";
                        // value += (userpyramid[key].user_code);
                        value += "\nPhone : ";
                        value += (userpyramid[key].user_mobile_no);
                    }
                }
                alert(value);
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
            }
        },
    }
    </script>
