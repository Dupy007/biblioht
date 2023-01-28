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
                auth:[]
            }
        },
        mounted(){
            this.auth = JSON.parse(localStorage.auth);
            this.getUserpyramids()
        },
        methods:{
            async getUserpyramids(){
                await axios.get('/api/userpyramid/'+this.auth.id).then(response=>{
                    this.userpyramids = response.data
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
