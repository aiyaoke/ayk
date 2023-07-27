<template>
    <div class="running-chart">
      <iframe class="onetime" frameborder="0" src="https://admin.sovitjs.com/publish_2d/3245655079499333640"></iframe>
      <!-- <iframe class="Td" src="	https://admin.sovitjs.com/publish_2d/3250638613561475073" frameborder="0" ></iframe> -->
    </div>
  </template>
  
  <script>
  import { apiRunStatusValue } from "@/api/device";
  import md5 from 'js-md5';
  import { createNamespacedHelpers } from "vuex";
  const { mapGetters: device_getters } = createNamespacedHelpers("device");
  export default {
    name: "RunningChart",
    data() {
      return {
        sec:"appid=3179798697663791113&apikey=3179798697663791114&method=POST&code=x&signature=x",
        appid:'3179798697663791113',
        apikey:'3179798697663791114',
        secret:'7eec46100fbe5f6cac7ee3cc526b080d',
        signature:'',
        url:''
      };
    },
    mounted() {
     this.signature=md5(`appid=${this.appid}&apikey=${this.apikey}&secretkey=${this.secret}&method=POST&code=ai`);
     this.sec=`appid=3179798697663791113&apikey=3179798697663791114&method=POST&code=ai&signature=${this.signature}`;
     this.url=`https://admin.sovitjs.com/app_2d_preview/3245655079499333640${this.sec}`
    },
    computed: {
    
    },
    components: {
    
    },
    methods: {
     
    },
    destroyed() {
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .running-chart {
    padding: 50px;
    box-sizing: border-box;
    height: calc(100vh - 300px);
    min-height: 550px;
    display: grid;
    grid-gap: 5px;
    @include bg-color("1");
    border-radius: 5px;
    .onetime{
      width: 100%;
      height: 100%;
    }
    // grid-template:
    //   "r5 r2" 1fr
    //   "r5 r4" 1fr
    //   /1fr 1fr;
    // > div {
    //   position: relative;
    // }
    .r1 {
      grid-area: r1;
    }
    .r2 {
      grid-area: r2;
    }
    .r3 {
      grid-area: r3;
    }
    .r4 {
      grid-area: r4;
    }
    .r5 {
      grid-area: r5;
    }
  }
  </style>
  