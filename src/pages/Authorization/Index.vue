<template>
  <div class="authorization">
    <Header></Header>
    <Login v-show="formType === 'login'" v-on:changeForm="changeForm"></Login>
    <Register
      v-show="formType === 'register'"
      v-on:changeForm="changeForm"
    ></Register>
    <span class="auth"
      >{{ $translate("上海采日能源科技有限公司 - 沪ICP备") }}
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=17053140"
        target="_blank"
        >17053140 {{ $translate("号") }}</a
      >
    </span>
  </div>
</template>

<script>
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

export default {
  name: "Authorization",
  data() {
    return {
      formType: "login"
    };
  },
  components: {
    Header,
    Login,
    Register
  },
  methods: {
    changeForm(type) {
      this.formType = type;
    }
  }
};
</script>

<style scoped lang="scss">
.authorization {
  height: 100vh;
  background: #0d2133 url("#{$img-url}earth.png") no-repeat;
  background-position: 10%;
  @include dis-flex(center, center);
  position: relative;
  .auth {
    position: absolute;
    bottom: 30px;
    color: #fff;
    font-size: 14px;
    a {
      color: #fff !important;
      text-decoration: none;
    }
  }
}
</style>
