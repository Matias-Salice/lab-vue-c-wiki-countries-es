<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CountryDetails from "./CountryDetails.vue";

const countries = ref([]);
const selectedCountry = ref(null);
const route = useRoute();
const router = useRouter();

const fetchCountries = async () => {
  try {
    const response = await fetch("/countries.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    countries.value = await response.json();
    updateSelectedCountry(route.params.alpha3Code);
  } catch (error) {
    console.error("Failed to fetch countries:", error);
  }
};

const updateSelectedCountry = (alpha3Code) => {
  if (alpha3Code) {
    selectedCountry.value = countries.value.find(
      (c) => c.alpha3Code === alpha3Code
    );
  } else {
    selectedCountry.value = null;
  }
};

const selectCountry = (alpha3Code) => {
  router.push({ name: "CountryDetails", params: { alpha3Code } });
};

onMounted(fetchCountries);

watch(
  () => route.params.alpha3Code,
  (newAlpha3Code) => {
    updateSelectedCountry(newAlpha3Code);
  }
);
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-5" style="max-height: 90vh; overflow: scroll">
        <div class="list-group">
          <a
            v-for="country in countries"
            :key="country.alpha3Code"
            href="javascript:void(0);"
            class="list-group-item list-group-item-action"
            @click="selectCountry(country.alpha3Code)"
          >
            <img
              :src="`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`"
            />
            <p>{{ country.name.common }}</p>
          </a>
        </div>
      </div>

      <div class="col-7">
        <CountryDetails
          v-if="selectedCountry"
          :country="selectedCountry"
          :countries="countries"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
