<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div class="text-center">
              <v-avatar size="50">
                <img alt="Vue logo" src="./assets/logo.png">
              </v-avatar>
          </div>
          <div class="text-center my-5 text-h5 font-weight-bold">vuetify-country-region-input</div>
          <v-card>
            <v-card-text>
              country: {{ country }}
              <v-country-select v-model="country" />
              region/state: {{ region }}
              <v-region-select v-model="region" :country="country" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// import VCountrySelect from '@/components/VCountrySelect'
// import VRegionSelect from '@/components/VRegionSelect'

export default {
  name: 'App',
  // components: {
  //   VCountrySelect,
  //   VRegionSelect
  // },
  data: () => ({
    country: 'AU',
    region: 'South Australia'
  })
};
</script>

<style>
#app {
  background-color: #e6ebf1;
}
</style>
