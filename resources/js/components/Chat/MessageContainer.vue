<template>
    <div style="height:auto;max-height:250px;overflow: hidden visible;">
        <div class="panel panel-default chat-widget">
            <div class="panel-body" v-for="(message,key) in messages" :key="key">
                <MessageItem :message="message" />
            </div>
        </div>
    </div>
</template>
<script>
import MessageItem from './MessageItem.vue';
export default {
    props:["messages"],
    components:{
        MessageItem,
    },
}
</script>
