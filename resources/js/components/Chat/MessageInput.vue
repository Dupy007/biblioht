<template>
<div >
    <div class="chat-message clearfix">
        <div class="input-group mb-0">
            <div class="input-group-prepend">

                <div class="input-group-text" style="cursor:pointer;" @click="onPickFile"><i class="bi bi-camera">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                    </svg>
                    <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"/>
                </i></div>
            </div>
            <input v-model="message.message" type="text" class="form-control" placeholder="Enter text here..." @keyup.enter="sendmessage()">
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:["pyramid_id"],
    data(){
        return{
            message:{
                pyramid_id :this.pyramid_id ,
                message :null
            },
        }
    },
    methods:{
        async sendmessage(){
            if (!this.message.message) {
                return;
            }
            const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            await axios.post('/plf/chat',this.message,config).then(response=>{
                this.message.message = "";
                this.$emit('messagesent');
            }).catch(error=>{
                console.log(error)
            })
        },
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            const files = event.target.files
            let filename = files[0].name
            this.message.image = (this.isFileImage(files[0]))?files[0]:null;
            if (!this.message.image) {
                return;
            }
            this.message.message = filename
            this.message.type_message = 'img'
            this.sendmessage();
            delete this.message['type_message'];
            delete this.message['image'];
            console.log(this.message);
        },
        isFileImage(file) {
            const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
            return file && acceptedImageTypes.includes(file['type'])
        }
    }
}
</script>
