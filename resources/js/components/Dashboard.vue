<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <video class="col-12" ref="videoRef" src="" id="video-container" controls></video>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'dashboard',
        mounted() {
            var video = document.getElementById('video-container');
            video.src = "../../../storage/app/VID-20230203-WA0003(1).mp4";
            // video.play();
        }
    }
</script>
