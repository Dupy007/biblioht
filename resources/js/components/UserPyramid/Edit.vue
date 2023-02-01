<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Update Pyramid</h4>
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
                            <div class="col-12 mb-2 ">
                                <h5>User</h5>
                                <div class="form-group" v-for="(userpyramid,key) in userpyramids" :key="key">
                                    <label>Position  {{ key }}</label>
                                    <select class="form-select" v-model="userpyramid.user_id">
                                        <option></option>
                                        <option v-for="option in users" v-bind:value="option.id">{{ option.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                    <form @submit.prevent="endpyramid" v-if="!isend && iscomplete">
                        <input type="text" class="form-control" v-model="pyramid_id" hidden>
                        <div class="col-12 mb-2">
                            <button type="submit" class="btn btn-primary">Confirm the end of the pyramid</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default{
    name:"update-pyramid",
    data(){
        return{
            userpyramid:{
                id:null,
                user_id:    null,
                pyramid_id: null,
                position:   null,
                _method:"patch"
            },
            userpyramids:{},
            users:[],
            errors:[],
            intervalid1:null,
            changes:null,
            iscomplete:false,
            isend:false,
            pyramid_id:null,
        }
    },
    mounted(){
        this.showuserpyramid(),
        this.getUsers()
    },
    methods:{
        async showuserpyramid(){
            await axios.get('/plf/userpyramid/'+this.$route.params.id).then(response=>{
                // this.userpyramids = response.data.userpyramid
                this.iscomplete = response.data.iscomplete
                this.isend = response.data.isend

                let res = response.data.userpyramid
                for (let index = 1; index < 16; index++) {
                    let userpyramid = {
                                user_id:    null,
                                pyramid_id: res[1].pyramid_id,
                                position:   index,
                                _method:"patch"
                            };
                        this.pyramid_id=res[1].pyramid_id;
                    if (res[index]) {
                        userpyramid.id =  res[index].pyramid_user_id;
                        userpyramid.user_id =  res[index].user_id;
                    }
                    this.userpyramids[index] = userpyramid;
                    
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        async update(userpyramid){
            await axios.post('/plf/userpyramid/'+userpyramid.id, userpyramid).then(response=>{
                // this.$router.push({name:"pyramidList"})
                this.setBackgroundColor('s');
            }).catch(error=>{
                this.setBackgroundColor('f');
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
        async getUsers(){
            await axios.get('/plf/user').then(response=>{
                this.users = response.data
            }).catch(error=>{
                console.log(error)
                this.users = []
            })
        },
        checkForm:function(e) {
            for (const key in this.userpyramids) {
                if (Object.hasOwnProperty.call(this.userpyramids, key)) {
                    const element = this.userpyramids[key];
                    if(element.user_id ) this.update(element);
                }
            }
            this.showuserpyramid();
            e.preventDefault();
        },
        setBackgroundColor (val) {
            var backgroundColor = ref('#f00000')
            if(val=='s'){
                backgroundColor = ref('#00f000')
            }
            document.querySelector('body').style.backgroundColor = backgroundColor.value;
            setTimeout(() => { document.querySelector('body').style.backgroundColor =null; }, 3000);
        },
        async endpyramid(){
                await axios.get('/plf/endpyramid/'+this.pyramid_id).then(response=>{
                    
                }).catch(error=>{
                    console.log(error)
                    this.userpyramids = []
                })
            },
    }
}
</script>
