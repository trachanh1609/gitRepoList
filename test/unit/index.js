import Vue from 'vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueResource)
Vue.use(BootstrapVue)
global.GITHUB_URL = 'https://api.github.com/orgs/'
global.ACCESS_TOKEN_OPTION = {params: {access_token: 'd7610917ef34de405d7b9c73a0be80b42d9ed205'}}

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
