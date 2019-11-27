<template>
  <f7-page class="login-page">
    <f7-navbar title="Login"></f7-navbar>
    <f7-block>
      <p>Framework7 comes with ready to use Login Screen layout. It could be used inside of page or inside of popup (Embedded) or as a standalone overlay:</p>
    </f7-block>

    <f7-list form>
      <f7-list-input
        :label="$t('login.email')"
        type="text"
        :placeholder="$t('login.email')"
        floating-label
        v-model="form.email"
        @input="form.email = $event.target.value">
      </f7-list-input>

      <f7-list-input
        :label="$t('login.password')"
        type="password"
        :placeholder="$t('login.password')"
        floating-label
        v-model="form.password"
        @input="form.password = $event.target.value">
      </f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button large fill @click="signIn">{{ $t('login.auth') }}</f7-button>
    </f7-block>

    <f7-block>
      <div class="el-divider">
        <div class="el-divider__text is-center">Entre com</div>
      </div>

      <f7-row>
        <f7-col>
          <button class="loginBtn loginBtn--facebook" @click="signInFacebook">
            Login with Facebook
          </button>
        </f7-col>

        <f7-col>
          <button class="loginBtn loginBtn--google" @click="signInGoogle">
            Login with Google
          </button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block>
      <f7-link href="/signup/">Realizar cadastro</f7-link>
    </f7-block>
  </f7-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },

  methods: {
    ...mapActions({
      login: 'users/login'
    }),

    signInGoogle () {

    },

    signInFacebook () {

    },

    async signIn () {
      try {
        await this.login(this.form)

        this.$f7router.navigate('/main')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less">
.login-page {
  .el-divider {
    background-color: #DCDFE6;
    position: relative;
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;

    .el-divider__text {
      position: absolute;
      background-color: #FFF;
      padding: 0 20px;
      color: #303133;

      &.is-center {
        left: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }

  /* Shared */
  .loginBtn {
    box-sizing: border-box;
    position: relative;
    margin: 0.2em;
    padding: 0 15px 0 46px;
    border: none;
    text-align: left;
    line-height: 34px;
    white-space: nowrap;
    border-radius: 0.2em;
    font-size: 12px;
    color: #FFF;

    &:before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 34px;
      height: 100%;
    }

    &:focus {
      outline: none;
    }

    &:active {
      box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
    }

    /* Facebook */
    &.loginBtn--facebook {
      background-color: #4C69BA;
      background-image: linear-gradient(#4C69BA, #3B55A0);
      text-shadow: 0 -1px 0 #354C8C;

      &:before {
        border-right: #364e92 1px solid;
        background: url('../../assets/images/icon_facebook.png') 6px 6px no-repeat;
      }

      &:hover {
        background-color: #5B7BD5;
        background-image: linear-gradient(#5B7BD5, #4864B1);
      }

      &:focus {
        background-color: #5B7BD5;
        background-image: linear-gradient(#5B7BD5, #4864B1);
      }
    }

    /* Google */
    &.loginBtn--google {
      background: #DD4B39;

      &:before {
        border-right: #BB3F30 1px solid;
        background: url('../../assets/images/icon_google.png') 6px 6px no-repeat;
      }
    }
  }
}
</style>
