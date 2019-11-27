<template>
  <f7-page class="profile-page">
    <f7-navbar :title="$t('app.profile')" :back-link="$t('app.back')"></f7-navbar>

    <f7-list>
      <f7-list-item :title="$t('app.avatar')" class="avatar-content">
        <img class="avatar" slot="after" :src="user.avatar_url"/>
      </f7-list-item>
      <f7-list-item :title="$t('app.name')" :after="user.nick_name"></f7-list-item>
    </f7-list>

    <f7-list>
      <f7-list-item :title="$t('app.gender')" :after="formatGender(user.gender)"></f7-list-item>
      <f7-list-item :title="$t('app.location')" :after="user.location"></f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'users/getUser'
    })
  },

  methods: {
    formatGender(gender) {
      if (gender === 'm') return this.$t('app.male')

      else if (gender === 'f') return this.$t('app.female')

      else return this.$t('app.unknown')
    }
  }
}
</script>

<style lang="less">
.profile-page {
  .list {
    margin: 20px 0;

    .avatar-content {
      .item-after {
        max-height: inherit;
      }

      .avatar {
        width: 65px;
        height: 65px;
        border-radius: 5px;
      }
    }
  }
}
</style>
