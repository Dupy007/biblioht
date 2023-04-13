<template>
     <div class="container-fluid">
        <MessageContainer :messages="messages" />
        <MessageInput
            :pyramid_id="userpyramid.pyramid_id"
            v-on:messagesent="getMessages()" />
    </div>
</template>
<script>
import MessageContainer from './MessageContainer.vue';
import MessageInput from './MessageInput.vue';
export default {
    props:["userpyramid"],
    components:{
        MessageContainer,
        MessageInput,
    },
    data(){
        return{
            messages:[],
            currentPyramid:null,
        }
    },
    mounted(){
        // this.getMessages();
        this.currentPyramid = this.userpyramid.pyramid_id;
    },
    watch:{
        currentPyramid(){
            this.connect();
        }
    },
    methods:{
        connect(){
            if (this.userpyramid.pyramid_id) {
                // let vm = this;
                this.getMessages();
                // Echo.private("chat."+this.userpyramid.pyramid_id)
                // .listen('chat.created', e => {
                //     vm.getMessages();
                // });
            }
        },
        async getMessages(){
            await axios.get('/plf/chat/'+this.userpyramid.pyramid_id).then(response=>{
                this.messages = response.data
            }).catch(error=>{
                this.messages = [];
                console.log(error)
            })
        },
    }
}
</script>
