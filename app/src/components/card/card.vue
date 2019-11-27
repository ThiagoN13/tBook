<template>
  <f7-card class="f7-card">
    <f7-card-header class="no-border">
      <div class="avatar">
        <img :src="getAvatar(data.avatar)" width="34" height="34"/>
      </div>
      <div class="demo-facebook-name">{{data.nickname}}</div>
      <div class="demo-facebook-date">{{formatTime(data.created_at)}}</div>
    </f7-card-header>

    <f7-card-content>
      <div>
        <p>{{ data.text }}</p>
        <div v-if="data.original_pic" class="image" @click.stop="openPhotoBrowser(data.original_pic)">
          <img :src="data.original_pic">
        </div>
      </div>
    </f7-card-content>

    <f7-card-footer class="no-border">
      <f7-link class="tool flex-rest-width" @click="contentClick(data)">
        <span class="iconfont icon-comment"></span>
        <span class="text" v-text="data.comment_count ? data.comment_count : $t('home.comment')"></span>
      </f7-link>

      <f7-link class="tool flex-rest-width" :class="{liked: data.liked}" @click="toggleLike(data.id, data.liked)">
        <span class="iconfont icon-like"></span>
        <span class="text" v-text="data.like_count ? data.like_count : $t('home.like')"></span>
      </f7-link>
    </f7-card-footer>
  </f7-card>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import { getRemoteAvatar } from '@/utils/appFunc'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },

    enableToolbar: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    contentClick(data) {
      this.$emit('card:content-click', data)
    },

    openPhotoBrowser(url) {
      const pb = this.$f7.photoBrowser.create({
        zoom: 400,
        theme: 'dark',
        photos: [url]
      })
      pb.open()
    },

    formatTime(time) {
      if (!time) return ''
      return formatDistanceToNow(new Date(time * 1000), { addSuffix: true })
    },

    getAvatar(id) {
      return getRemoteAvatar(id)
    },

    toggleLike(mid, status) {
      this.$store.dispatch('updateTimeline', {
        mid,
        type: status ? 'unlike' : 'like'
      })
    }
  }
}
</script>

 <style lang="less">
  @import "../../assets/styles/mixins.less";

  .f7-card {
    margin-bottom: 20px;

    .card-header {
      display: block;
      padding: 10px
    }

    .avatar {
      float: left;
      margin-top: 5px;
    }

    .image {
      margin-top: 5px;
      > img {
        width: 100%;
      }
    }

    .demo-facebook-date {
      margin-left: 44px;
      font-size: 13px;
      color: #8e8e93;
    }

    .demo-facebook-name {
      margin-left: 44px;
      font-size: 14px;
      font-weight: 500;
    }

    .card-content-padding .likes {
      color: #8e8e93;
    }

    .tool {
      height: 100%;
      justify-content: center;

      &.liked{
        > span {
          color: @mainColor;
        }
      }
      > span {
        color: #6D6D78;
        vertical-align: middle;
      }
      .iconfont{
        font-size: 16px;
      }
      .text {
        font-size: 13px;
      }
    }
  }
 </style>
