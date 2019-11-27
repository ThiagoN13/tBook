<template>
  <f7-page class="post-page">
    <f7-navbar :title="$t('post.post')" :back-link="$t('app.back')">
    </f7-navbar>

    <card :enable-toolbar="false" :data="post"></card>

    <div class="comments">
      <div class="title">
        <span>{{ $t('home.comment') }}</span>
      </div>

      <div class="clist">
        <f7-list form>
          <editor
            @text:change="editorTextChange"
            enableTools="emotion,at"
            :placeholder="$t('comment.placeholder')"/>

          <f7-block>
            <f7-button large fill @click="btnComment">{{ $t('post.comment') }}</f7-button>
          </f7-block>
        </f7-list>

        <template v-if="comments.length">
          <div class="comment flex-row" v-for="comment in comments" :key="comment.name">
            <img class="avatar" :src="getAvatar(comment.avatar)" />
            <div class="detail flex-rest-width">
              <div class="name"><span>{{ comment.name }}</span></div>
              <div class="time"><span>{{ formatTime(comment.time) }}</span></div>
              <div class="text"><span>{{ comment.text }}</span></div>
            </div>
          </div>
        </template>

        <div class="empty-content" v-else>
          <i class="iconfont icon-wujieguoyangshi"/>
          <div class="text">
            <span>{{ $t('app.empty_container') }}</span>
          </div>
        </div>
      </div>
    </div>

    <f7-toolbar class="custom-toolbar flex-row" bottom-md>
      <f7-link class="tool flex-rest-width" :class="{ liked: post.liked }" @click="toggleLike(post.id, post.liked)">
        <span class="iconfont icon-like"></span>
        <span class="text" v-text="post.like_count ? post.like_count : $t('home.like')"></span>
      </f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import axios from 'axios'
import Card from '@/components/card'
import { formatDistanceToNow } from 'date-fns'
import { getRemoteAvatar } from '@/utils/appFunc'
import { mapState, mapActions } from 'vuex'
import find from 'lodash/find'
import Editor from '@/components/editor'

export default {
  components: {
    Editor,
    Card
  },

  data () {
    return {
      form: {
        text: ''
      },
      post: {},
      comments: []
    }
  },

  mounted () {
    const query = this.$f7route.query
    this.post = find(this.timeline, p => p.id === query.mid)
    this.getComments()
  },

  methods: {
    ...mapActions([
      'updatePopup'
    ]),

    editorTextChange (text) {
      this.form.text = text
    },

    btnComment () {
      this.form.time = new Date()

      this.comments.unshift(this.form)
    },

    getComments () {
      const random = Math.floor(Math.random() * 2)

      if (!random) return []

      axios.get('/comments.json').then(res => {
        this.comments = res.data
      })
    },

    formatTime (time) {
      if (!time) return ''

      return formatDistanceToNow(new Date(time * 1000), { addSuffix: true })
    },

    getAvatar (id) {
      return getRemoteAvatar(id)
    },

    openCommentPopup () {
      this.updatePopup({
        key: 'commentOpened',
        value: true
      })
    },

    toggleLike (mid, status) {
      this.$store.dispatch('updateTimeline', {
        mid,
        type: status ? 'unlike' : 'like'
      })
    }
  },

  computed: {
    ...mapState({
      timeline: state => state.timeline
    })
  }
}
</script>

<style lang="less">
@import '../../assets/styles/mixins.less';

.post-page {
  .clist {
    .list {
      margin: 0
    }
  }

  .custom-toolbar {
    background: @mainColor;

    &:before {
      background: #e1e1e1;
    }

    .tool {
      justify-content: center;

      &.tool-border {
        border-right: 1px solid #e1e1e1;
      }

      &.liked {
        > span {
          color: @mainColor;
        }
      }

      > span {
        color: #6d6d78;
        vertical-align: middle;
      }

      .iconfont {
        font-size: 18px;
      }
      .text {
        font-size: 15px;
      }
    }
  }

  .comments {
    background-color: @whiteColor;
    border-top: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
    margin-bottom: 15px;

    .title {
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      font-size: 13px;
    }

    .comment {
      border-top: 1px solid #dadada;
      padding: 10px;
      font-size: 14px;

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 30px;
      }

      .detail {
        margin-left: 8px;

        .name {
          font-weight: bolder;
          font-size: 13px;
          color: #333;
        }

        .time {
          font-size: 11px;
          color: #929292;
          margin-bottom: 2px;
        }

        .text {
          line-height: 20px;
          color: #5d5d5d;
        }
      }
    }
  }
}

.md {
  .post-page {
    .custom-toolbar {
      .tool {
        &.liked {
          > span {
            color: @whiteColor;
          }
        }

        > span {
          color: rgba(255, 255, 255, 0.7);;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>