  <template>
  <div class="c-camera">
    <web-cam
      ref="webcam"
      :device-id="deviceId"
      width="100%"
      @started="onStarted"
      @stopped="onStopped"
      @error="onError"
      @cameras="onCameras"
      @camera-change="onCameraChange"/>

      <div class="btn-actions">
        <button class="btn-back" @click="$emit('back')">
          <f7-icon material="arrow_back"></f7-icon>
        </button>

        <button class="btn-capture" @click="onCapture">
          <f7-icon f7="camera_fill"></f7-icon>
        </button>

        <button class="btn-camera" v-if="devices.length > 1">
          <f7-icon f7="camera_rotate_fill"></f7-icon>
        </button>
      </div>
  </div>
</template>

<script>
import { WebCam } from 'vue-web-cam'

export default {
  components: {
    WebCam
  },

  data () {
    return {
      camera: null,
      deviceId: null,
      devices: []
    }
  },

  methods: {
    onCapture () {
      const img = this.$refs.webcam.capture()

      this.$emit('capture', img)
    },

    onStarted (stream) {
      console.log('On Started Event', stream)
    },

    onStopped (stream) {
      console.log('On Stopped Event', stream)
    },

    onStop () {
      this.$refs.webcam.stop()
    },

    onStart () {
      this.$refs.webcam.start()
    },

    onError (error) {
      console.log('On Error Event', error)
    },

    onCameras (cameras) {
      this.devices = cameras
      console.log('On Cameras Event', cameras)
    },

    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    }
  },

  watch: {
    camera (id) {
      this.deviceId = id
    },

    devices () {
      // Once we have a list select the first one
      const [ first, ...tail ] = this.devices

      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  }
}
</script>

<style lang="less">
.c-camera {
  .btn-actions {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: #393939aa;
    bottom: 0;
    padding: 10px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;

    .btn-back {
      position: absolute;
      left: 0;
      margin-left: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .btn-camera {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      left: 0;
      position: absolute;
      margin-left: 20px;
    }

    .btn-capture {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }

  video {
    object-fit: cover;
    height: 100vh;
  }
}
</style>
