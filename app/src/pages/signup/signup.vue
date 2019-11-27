<template>
  <f7-page class="signup-page">
    <f7-navbar :title="$t('app.feedback')" :back-link="$t('app.back')">
    </f7-navbar>

    <f7-block>
      <p>Framework7 comes with ready to use Login Screen layout. It could be used inside of page or inside of popup (Embedded) or as a standalone overlay:</p>
    </f7-block>

    <f7-list form>
      <f7-list-input
        :label="$t('login.username')"
        type="text"
        :placeholder="$t('login.username')"
        floating-label
        v-model="form.username">
      </f7-list-input>

      <f7-list-input
        :label="$t('login.password')"
        type="password"
        :placeholder="$t('login.password')"
        floating-label
        v-model="form.password">
      </f7-list-input>

      <f7-list-item :title="$t('app.gender')" smart-select>
        <select name="gender">
          <option value="nale" selected>Masculino</option>
          <option value="fenale">Feminino</option>
        </select>
      </f7-list-item>
    </f7-list>

    <f7-block>
      <f7-button large fill>{{ $t('login.new') }}</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>

export default {
  data () {
    return {
      form: {
        username: null,
        password: null
      }
    }
  },

  methods: {
    signIn () {
      this.$f7router.navigate('/main')
    }
  }
}
</script>
