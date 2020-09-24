import VCountrySelect from '@/components/VCountrySelect.vue'
import VRegionSelect from '@/components/VRegionSelect.vue'

const install = function (Vue) {
    const components = { VCountrySelect, VRegionSelect }
    Object.keys(components).forEach(name => {
        Vue.component(name, components[name])
    })
}

const VueCountryRegionSelect = { VCountrySelect, VRegionSelect, install }

export default VueCountryRegionSelect
export { VCountrySelect, VRegionSelect }