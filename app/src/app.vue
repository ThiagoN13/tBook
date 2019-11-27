<template>
  <!-- App -->
  <f7-app :params="f7params">

    <!-- Main View -->
    <f7-view id="main-view" url="/" main color-theme="orange"></f7-view>

    <!-- Comment, publisher Popup -->
    <f7-popup :opened="publisherPopupOpened">
      <publisher-popup></publisher-popup>
    </f7-popup>

    <f7-popup :opened="commentPopupOpened">
      <comment-popup></comment-popup>
    </f7-popup>
  </f7-app>
</template>

<script>
import routes from './routes.js'
import PublisherPopup from './popup/publisher'
import CommentPopup from './popup/comment'
import StoreCache from './utils/storeCache'

export default {
  data () {
    return {
      publisherPopupOpened: false,
      commentPopupOpened: false,
      // Framework7 parameters here
      f7params: {
        id: 'com.hiliaox.tbook', // App bundle ID
        name: 'tBook', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,
      }
    }
  },

  mounted () {
    this.$f7ready((f7) => {
      window.$$ = {
        alert: f7.dialog.alert,
        confirm: f7.dialog.confirm,
        prompt: f7.dialog.prompt,
        cache: new StoreCache('vuex')
      }
    })

    document.addEventListener('deviceready', this.onDeviceReady, false)
  },

  methods: {
    onDeviceReady () {
      console.log(navigator.camera)
    }
  },

  components: {
    PublisherPopup,
    CommentPopup
  }
}
</script>
