<template>
    <v-select v-bind="computedProps" v-on="$listeners"></v-select>
</template>

<script>
import { VSelect } from 'vuetify/lib'
import regions from '@/data.js'

export default {
    name: 'VCountrySelect',
    extends: VSelect,
    props: {
        countryName: Boolean,
        whiteList: Array,
        blackList: Array,
        displayShortCode: { type: Boolean, default: false },
        topCountry: { type: String, default: '' },
        placeholder: { type: String, default: 'Select Country' },
        usei18n: { type: Boolean, default: true },
    },
    computed: {
        countries() {
            let countryList = regions.filter((region) => {
                if (this.countryName) {
                    return region.countryName !== this.firstCountry
                } else {
                    return region.countryShortCode !== this.firstCountry
                }
            })
            if (this.whiteList) {
                countryList = countryList.filter((country) => {
                    return this.whiteList.includes(country.countryShortCode)
                })
            }
            if (this.blackList) {
                countryList = countryList.filter((country) => {
                    return !this.blackList.includes(country.countryShortCode)
                })
            }
            if (this.$i18n && this.usei18n) {
                countryList = countryList.map((country) => {
                    let localeCountry = Object.assign({ }, country)
                    localeCountry.countryName = this.$t(country.countryName)
                    return localeCountry
                })
                countryList.sort((country1, country2) => {
                    return (country1.countryName > country2.countryName) ? 1 : -1
                })
            }
            return countryList
        },
        firstCountry() {
            if(this.countryName) {
                if(this.topCountry.length === 2 ) {
                const regionObj = regions.find((region) => {
                    return region.countryShortCode === this.topCountry
                })
                return regionObj.countryName
                } else {
                return this.topCountry
                }
            }
            if (this.topCountry) {
                return this.topCountry
            }
            return ''
        },
        autocompleteAttr() {
            const autocompleteType = (showsFullCountryName) => showsFullCountryName ? "country-name" : "country";
            return this.autocomplete ? autocompleteType(this.countryName) : "off";
        },
        computedProps() {
            return {
                ...this.$props,
                items: this.countries,
                itemText: this.displayShortCode? 'countryShortCode' : 'countryName',
                itemValue: this.countryName ? 'countryName' : 'countryShortCode',
                autocomplete: this.autocompleteAttr,
            }
        }
    },
}
</script>