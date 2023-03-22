<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header"> Archived </div>
                    <div class="card-body">
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
                                                        <div class="tra m"><span >{{ theposition(userpyramid,8).user_name }}</span></div>
                                                        <div class="tra n"><span >{{ theposition(userpyramid,9).user_name }}</span></div>
                                                        <div class="tra m"><span >{{ theposition(userpyramid,10).user_name }}</span></div>
                                                        <div class="tra n"><span >{{ theposition(userpyramid,11).user_name }}</span></div>
                                                        <div class="center-2">
                                                            <div class="tritra"><span >{{ theposition(userpyramid,4).user_name }}</span></div>
                                                            <div class="tritra"><span >{{ theposition(userpyramid,5).user_name }}</span></div>
                                                            <div class="center">
                                                                <div class="tri"><span >{{ theposition(userpyramid,2).user_name }}</span></div>
                                                                <div class="cer"><span >{{ theposition(userpyramid,1).user_name }}</span></div>
                                                                <div class="tri"><span >{{ theposition(userpyramid,3).user_name }}</span></div>
                                                            </div>
                                                            <div class="tritra"><span >{{ theposition(userpyramid,6).user_name }}</span></div>
                                                            <div class="tritra"><span >{{ theposition(userpyramid,7).user_name }}</span></div>
                                                        </div>
                                                        <div class="tra n"><span >{{ theposition(userpyramid,12).user_name }}</span></div>
                                                        <div class="tra m"><span >{{ theposition(userpyramid,13).user_name }}</span></div>
                                                        <div class="tra n"><span >{{ theposition(userpyramid,14).user_name }}</span></div>
                                                        <div class="tra m"><span >{{ theposition(userpyramid,15).user_name }}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="position-relative mt-4">
                                                <div class="position-absolute bottom-0 start-0 text-danger"><h1>{{ created_at(userpyramid) }}</h1></div>
                                                <div class="position-absolute bottom-0 end-0 text-danger"><h1>{{ expire_at(userpyramid) }}</h1></div>
                                            </div>
                                        </div>
                                        <router-link :to='{ name:"userpyramidEdit" , params:{ id:thepyramidid(userpyramid) } }' class="btn btn-success">View</router-link>
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
</template>
<script>
    export default {
        name:"Archived",
        data(){
            return{
                userpyramids:[],
            }
        },
        mounted(){
            this.getUserpyramids()
        },
        methods:{
            async getUserpyramids(){
                await axios.get('/plf/archived').then(response=>{
                    this.userpyramids = response.data
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
            }
        },
        computed: {
            filtered() {
                var result = this.userpyramids
                return result
        }
    }
}
</script>
