<template>
  <div class="weatherInfo">
    <div class="now" v-show="today">
      <div class="temp">
        <div>
          {{ today.fxDate }}
        </div>
        <div class="temp-today">
          {{ today.tempMin }}° ~ {{ today.tempMax }}°
        </div>
        <div>{{ today.textDay }}</div>
      </div>
      <div class="location-wind">
        <!-- <img
          class="weather-icon"
          :src="weatherIconUrl + today.cond_code_d + 'd.pnghefen'"
        /> -->
        <i
          :class="['qi-'+today.iconDay,'weather-icon']"
        ></i>
      </div>
    </div>
    <div class="location" v-show="basic">
      <i class="iconfont icon-weizhi1"></i>
      <span>{{ showLocation(basic) }}</span>
    </div>
    <div class="later" v-show="today">
      <div class="title">
        <div>{{ $translate("日期") }}</div>
        <div>{{ $translate("温度") }}</div>
        <div>{{ $translate("天气") }}</div>
      </div>
      <div v-for="(item, index) in later" :key="index">
        <div>{{ item.fxDate }}</div>
        <div>{{ item.tempMin }}° / {{ item.tempMax }}°</div>
        <div>
          <!-- <img
            class="weather-icon later-icon"
            :src="weatherIconUrl + item.cond_code_d + 'd.png'"
          /> -->
          <i
          :class="['qi-'+today.iconDay,'weather-icon',' later-icon']"
        ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showMessage, momentFormate } from "@/common/utils";
import { weatherUrl, weatherIconUrl } from "@/common/config";
import { createNamespacedHelpers } from "vuex";

const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
const { mapGetters: app_getters } = createNamespacedHelpers("app");
export default {
  name: "WeatherInfo",
  data() {
    return {
      weatherIconUrl,
      basic: "",
      today: "",
      later: "",
    };
  },
  computed: {
    ...plant_getters(["currentPlant"]),
    ...app_getters(["locale"]),
    showLocation() {
      return basicInfo => {
        let { location, parent_city, admin_area, cnty } = basicInfo;
        return [location, parent_city, admin_area, cnty].join("/");
      };
    }
  },
  methods: {
    async getWeather(plant) {
      let { latitude, longitude } = plant;
      let url = `${weatherUrl}?location=${longitude},${latitude}&key=bdfd2a48d5b74aba8d8f066d5023a588&lang=${this.locale}`;
      let {
       code,
       daily
      } = await (await fetch(url)).json();
      if (code === "200") {
        // let { basic, daily_forecast } = info;
        // this.basic = basic;
        this.today = daily[0];
        this.later = [daily[1], daily[2]];

      } else {
        this.basic = "";
        this.today = "";
        this.now = "";
        this.later = "";
        // showMessage("error", info.status);
      }
    }
  },
  watch: {
    currentPlant(plant) {
      if (plant.plantId) {
        this.getWeather(plant);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.weather-icon {
  width: 60px;
  height: 60px;
  font-size: 50px;
  &.later-icon {
    width: 30px;
    height: 30px;
  font-size: 20px;

  }
}

.temp-today {
  font-size: 20px;
}

.weatherInfo {
  background-size: cover;
  padding: 10px;
  box-sizing: border-box;
  font-size: 13px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .location {
    margin: 10px 0;
    color: #999;
  }
  .now {
    color: #fff;
    height: 120px;
    background: url("#{$img-url}weather_bg.png") no-repeat;
    background-size: cover;
    border-radius: 5px;
    padding: 10px;
    @include dis-flex(center, stretch);
    > div {
      @include dis-flex(center, center, column);
      flex: 1;
      &.temp {
        justify-content: space-around;
      }
    }
  }

  .later {
    margin-top: 50px;
    flex: 2;
    font-size: 20px;
    @include font-color("1");
    > div {
      @include dis-flex(flex-start, center);
      &:first-child {
        margin-bottom: 5px;
      }
      > div {
        flex: 1;
        text-align: center;
      }
    }
    .title{
      padding-bottom: 10px;
    }
  }
}
</style>
