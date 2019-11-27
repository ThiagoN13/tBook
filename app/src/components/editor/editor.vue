<template>
  <div class="editor-container">
    <textarea type="textarea" :placeholder="placeholder" value="text" v-model="post.message"></textarea>

    <img v-show="post.img" :src="post.img" id="preview" class="post-image">

    <ul class="tools flex-row">
      <li class="tool" v-show="enableTool('camera')" @click="openCamera">
        <i class="iconfont icon-ios7cameraoutline"></i>
      </li>

      <li class="tool file" v-show="enableTool('album')">
        <input type="file" name="arquivo" id="arquivo" accept="image/png, image/jpeg" @change="readImage"/>
        <i class="iconfont icon-pic"></i>
      </li>

      <li class="tool" v-show="enableTool('emotion')" @click="openDisplayEmotion">
        <i class="iconfont icon-emotion"></i>
      </li>

      <li class="tool" v-show="enableTool('at')">
        <i class="iconfont icon-iosatoutline"></i>
      </li>

      <li class="tool" v-show="enableTool('location')">
        <i class="iconfont icon-location"></i>
      </li>
    </ul>

    <picker @select="addEmoji" v-show="popupEmoji"/>

    <f7-popup class="demo-popup" :opened="popupOpened">
      <camera @back="closeCamera" @capture="onCapture"/>
    </f7-popup>
  </div>
</template>

<script>
import Camera from '@/components/camera'
import { Picker } from 'emoji-mart-vue'

export default {
  props: {
    enableTools: {
      type: String,
      default: 'camera,album,emotion,at,location'
    },
    text: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  components: {
    Picker,
    Camera
  },

  data () {
    return {
      post: {
        img: null,
        message: ''
      },
      popupEmoji: false,
      popupOpened: false
    }
  },

  watch: {
    message (text) {
      this.$emit('text:change', text)
    }
  },

  methods: {
    openDisplayEmotion () {
      this.popupEmoji = !this.popupEmoji
    },

    addEmoji (emoji) {
      const { native } = emoji

      this.post.message += native
      this.popupEmoji = false
    },

    onCapture (img) {
      this.post.img = img

      this.closeCamera()
    },

    openCamera () {
      this.popupOpened = true
    },

    closeCamera () {
      this.popupOpened = false
    },

    readImage (event) {
      const input = event.target
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          //aqui é onde eu setaria a url da imagem que estou manipulando, mas como ela é um objeto do tipo categoria não sei como acessar essa propriedade dela
          this.post.img = e.target.result
          document.getElementById('preview').src = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
    },

    enableTool (name) {
      const tools = this.enableTools.split(',')

      return ~tools.indexOf(name)
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/styles/mixins.less';

  .editor-container{
    .post-image {
      width: 80px;
      height: 80px;
      margin-left: 10px;
      margin-bottom: 10px;
      background-color: @whiteColor;
    }

    > textarea {
      width: 100%;
      height: 150px;
      font-size: 15px;
      border: none;
      color: #444;
      margin: 0;
      padding: 5px;
      resize: none;
      box-sizing: border-box;
      background-color: @whiteColor;
    }

    .emoji-mart {
      width: 100%;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }

    .tools {
      width: 100%;
      height: 40px;
      background-color: #f9f9f9;
      border-bottom: 1px solid #dadada;
      border-top: 1px solid #dadada;
      list-style: none;
      margin: 0;
      padding: 0;
      margin-top: -5px;

      .tool {
        width: 50px;
        height: 100%;
        text-align: center;
        line-height: 40px;

        &.file {
          input {
            position: absolute;
            z-index: 2;
            opacity: 0;
            width: 32px;
            height: 40px;
          }
        }

        .iconfont {
          color: #666;
        }
      }
    }
  }
</style>
