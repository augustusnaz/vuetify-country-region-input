<template>
    <v-select v-bind="computedProps" v-on="$listeners"></v-select>
</template>

<script>
import { VSelect } from 'vuetify/lib'
import regions from '@/data.js'

export default {
    name: 'VRegionSelect',
    extends: VSelect,
    props: {
        country: String,
        defaultRegion: String,
        countryName: { type: Boolean, default: false },
        whiteList: Array,
        blackList: Array,
        regionName: Boolean,
        usei18n: { type: Boolean, default: true },
    },
    data: () => ({
        shownRegions: [],
        regions,
        ran: false
    }),
    mounted() {
        if (this.country) {
            this.getRegionWithCountry()
        } else {
            let findRegion = this.defaultRegion ? this.defaultRegion : 'AU'
            this.getRegionWithCountry(findRegion)
        }
    },
    computed: {
        valueType() {
          return this.regionName ? 'name' : 'shortCode'
        },
        autocompleteAttr() {
            return this.autocomplete ? "address-level1" : "off";
        },
        computedProps() {
            return {
                ...this.$props,
                items: this.shownRegions,
                itemText: this.displayShortCode? 'shortCode' : 'name',
                itemValue: this.countryName ? 'countryName' : 'countryShortCode',
                autocomplete: this.autocompleteAttr,
            }
        }
    },
    methods: {
        getRegionWithCountry(country) {
            country = country || this.country
            let countryRegions = regions.find((elem) => {
                if (this.countryName) {
                    return elem.countryName === country
                } else {
                    return elem.countryShortCode === country
                }
            }).regions
            if (this.$i18n && this.usei18n) {
                countryRegions = countryRegions.map((region) => {
                    let localeRegion = Object.assign({}, region)
                    localeRegion.name = this.$t(region.name)
                    return localeRegion
                })
                countryRegions.sort((region1, region2) => {
                    return region1.name > region2.name ? 1 : -1
                })
            }
            if (this.whiteList) {
                countryRegions = countryRegions.filter((region) => {
                    return this.whiteList.includes(region.shortCode)
                })
            }
            if (this.blackList) {
                countryRegions = countryRegions.filter((region) => {
                    return !this.blackList.includes(region.shortCode)
                })
            }
            this.shownRegions = countryRegions
            this.ran = true
        }
    },
    watch: {
      country(newVal, oldVal) {
        if (oldVal !== '') {
            this.$emit('input', '')
        }
        if (this.country) {
            this.getRegionWithCountry()
        } else {
            this.shownRegions = []
        }
      }
    }
}
</script>

