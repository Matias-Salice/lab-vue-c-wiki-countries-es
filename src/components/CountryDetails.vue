<script setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  country: Object,
  countries: Array,
});

const router = useRouter();

const getCountryName = (alpha3Code) => {
  const country = props.countries.find((c) => c.alpha3Code === alpha3Code);
  return country ? country.name.common : alpha3Code;
};

const selectBorderCountry = (alpha3Code) => {
  router.push({ name: "CountryDetails", params: { alpha3Code } });
};
</script>

<template>
  <div class="col-7" v-if="country">
    <img
      :src="`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`"
      alt="country flag"
      style="width: 300px"
    />
    <h1>{{ country.name.common }}</h1>
    <table class="table">
      <thead></thead>
      <tbody>
        <tr>
          <td style="width: 30%">Capital</td>
          <td>{{ country.capital[0] }}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>{{ country.area }} km<sup>2</sup></td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            <ul>
              <li v-for="border in country.borders" :key="border">
                <a
                  href="javascript:void(0);"
                  @click="selectBorderCountry(border)"
                  >{{ getCountryName(border) }}</a
                >
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
