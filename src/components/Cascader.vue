<!----
<template>

  <div>
    级联选择器
    <h-selector v-model="address" :showValue="showAddress">
      <h-wrapper prop="province">
        <h-option v-for="item in provinceList" :key="item.id" :value="item.id">
          {{ item.name }}
        </h-option>
      </h-wrapper>
      <h-wrapper prop="city">
        <h-option v-for="item in cityList" :key="item.id" :value="item.id">
          {{ item.name }}
        </h-option>
      </h-wrapper>
    </h-selector>
  </div>
</template>

<script>
import Vue from "vue";
import hOption from "../components/hOption.vue";
import hSelector from "../components/hSelector.vue";
import hWrapper from "../components/hWrapper.vue";

export default Vue.extend({
  name: "Cascader ",
  components: { hOption, hSelector, hWrapper },
  data() {
    return {
      address: {
        province: "",
        city: "",
      },
    };
  },
  computed: {
    showAddress() {
      let province = this.provinceList.find(
        (item) => item.id === this.address.province
      ) || { name: "选择省" };
      let city = this.cityList.find(
        (item) => item.id === this.address.city
      ) || { name: "选择市" };
      return `${province.name} - ${city.name}`;
    },
  },
});
</script>

<style scoped>
</style>
