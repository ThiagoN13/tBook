<template>
  <f7-page id="homeView" class="home-view"
    ptr
    infinite
    @ptr:refresh="onRefresh"
    @infinite="onInfiniteScroll">
    <f7-list media-list v-if="loading">
      <f7-list-item
        v-for="n in 8"
        :key="n"
        class="skeleton-text skeleton-effect-fade"
        title="Full Name"
        subtitle="Position"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
      >
        <f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
      </f7-list-item>
    </f7-list>

    <f7-block v-else>
      <card v-for="item in timeline" :key="item.id" :data="item" @card:content-click="routeToPost"></card>
    </f7-block>

  </f7-page>
</template>

<script>
import axios from 'axios'
import Card from '@/components/card'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      refreshing: false,
      loadingMore: false,
      loadedEnd: false,
      loading: true
    }
  },

  computed: {
    ...mapState({
      timeline: state => state.timeline
    })
  },

  async mounted () {
    await this.getTimeline()

    setTimeout(() => {
      this.loading = false
    }, 1000)
  },

  methods: {
    ...mapActions([
      'initTimeline',
      'infiniteTimeline',
      'refreshTimeline'
    ]),

    getTimeline() {
      this.$f7.preloader.show()
      axios.get('/timeline.json').then(res => {
        const timeline = res.data
        this.initTimeline(timeline)
        this.$f7.preloader.hide()
      })
    },

    onRefresh() {
      if (this.refreshing) return false

      this.refreshing = true
      axios.get('/refresh_timeline.json').then(res => {
        if (parseInt(this.timeline[0].id) === 48) {
          this.$emit('show-tip')
        } else {
          const timeline = res.data
          this.refreshTimeline(timeline)
        }
        this.refreshing = false
        this.$f7.ptr.done()
      })
    },

    onInfiniteScroll() {
      if (this.loadingMore || this.loadedEnd) return false

      this.loadingMore = true
      axios.get('/more_timeline.json').then(res => {
        const id = parseInt(this.timeline[this.timeline.length - 1].id)
        if (id === 24) {
          this.loadedEnd = true
          this.$f7.infiniteScroll.destroy('#homeView .infinite-scroll-content')
          this.$$('#homeView .infinite-scroll-preloader').remove()
        } else {
          const timeline = res.data
          this.infiniteTimeline(timeline)
        }
        this.loadingMore = false
      })
    },

    routeToPost(data) {
      this.$f7router.navigate(`/post/?mid=${data.id}`)
    }
  },

  components: {
    Card
  }
}
</script>
