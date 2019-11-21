<template>
  <f7-page class="login-page">
    <f7-navbar title="Login"></f7-navbar>
    <f7-block>
      <p>Framework7 comes with ready to use Login Screen layout. It could be used inside of page or inside of popup (Embedded) or as a standalone overlay:</p>
    </f7-block>

    <f7-list form>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        v-model="form.username">
      </f7-list-input>

      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        v-model="form.password">
      </f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button large fill @click="signIn">{{ $t('Login') }}</f7-button>
    </f7-block>

    <f7-block>
      <f7-button large fill>{{ $t('Cadastre-se') }}</f7-button>
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
