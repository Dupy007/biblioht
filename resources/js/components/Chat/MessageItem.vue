<template>
    <div v-if="this.auth.id != message.user_id">
        <div class="message">
          <div class="message-text-wrapper">
            <div class="message-text">
                <pre v-if="message.type_message == null "> {{ message.message }} </pre>
                <img v-if="message.type_message == 'img' " :src="'/storage/app/chat_'+this.message.pyramid_id+'/'+this.message.message" alt="message pic">
            </div>
          </div>
          <p class="time-stamp"><i class="fa fa-check"></i>{{message.user.nickname}} at {{ getdatehr(message.created_at) }}</p>
      </div>
    </div>
    <div v-else>
        <div class="message message-right">
            <div class="message-text-wrapper">
                <div class="message-text">
                    <pre v-if="message.type_message == null "> {{ message.message }} </pre>
                    <img v-if="message.type_message == 'img' " :src="'/storage/app/chat_'+this.message.pyramid_id+'/'+this.message.message" alt="message pic">
                </div>
            </div>
            <p class="time-stamp"><i class="fa fa-check"></i>Me at {{ getdatehr(message.created_at) }}</p>
      </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    props:["message"],
    data(){
        return{
            auth:[],
            imgmessage: '/storage/app/chat_'+this.message.pyramid_id+'/'+this.message.message,
        }
    },
    mounted(){
        this.auth = JSON.parse(localStorage.auth);
    },
    methods:{
        getdatehr(value){
            if (value) {
                return moment(String(value)).format(' hh:mm DD-MM-YYYY');
            }
        }
    }
}
</script>
