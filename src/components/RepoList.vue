<template>
  <div class="container">
    <div class="header clearfix">
        <h3>List all Repositories</h3>
    </div>
    <hr>
    <div class="jumbotron">
        <div class="input-group">
          <button @click="getRepos()" type="button" name="searchButton" class="btn btn-primary input-group-addon">Search</button>
          <input @keyup.enter="getRepos()" v-model="searchQuery" id="searchInput" type="text" class="form-control" placeholder="Enter organization name">
          <button @click="emptyRepos()" type="button" class="btn btn-danger input-group-addon">Clear result</button>
        </div>
    </div>
    <div class="jumbotron">
      <div class="row">
        <h4 class="col col-md-12 text-left">There are {{filteredRepos.length}} {{showPrivate==='All'?'Public and Private':showPrivate}} repositories , written in {{showLanguage}} language{{showLanguage==='All'?'s':''}}</h4>
      </div>
      <br>
      <div class="row">
        <h5 class="col col-md-3 text-left">Show Public/Private: </h5>
        <b-button @click="showPrivate='All'" :variant="showPrivate==='All'?'success':'outline-success'">All</b-button>
        <b-button @click="showPrivate='Public'" :variant="showPrivate==='Public'?'success':'outline-success'">Public</b-button>
        <b-button @click="showPrivate='Private'" :variant="showPrivate==='Private'?'success':'outline-success'">Private</b-button>

      </div>
      <br>
      <div class="row">
        <h5 class="col col-md-3 text-left">Show Language: </h5>
        <b-button @click="showLanguage='All'" :variant="showLanguage==='All'?'success':'outline-success'">All</b-button>
        <b-button @click="showLanguage='Python'" :variant="showLanguage==='Python'?'success':'outline-success'">Python</b-button>
        <b-button @click="showLanguage='JavaScript'" :variant="showLanguage==='JavaScript'?'success':'outline-success'">Javascript</b-button>
        <b-button @click="showLanguage='Ruby'" :variant="showLanguage==='Ruby'?'success':'outline-success'">Ruby</b-button>
        <b-button @click="showLanguage='C'" :variant="showLanguage==='C'?'success':'outline-success'">C</b-button>
        <b-button @click="showLanguage='Java'" :variant="showLanguage==='Java'?'success':'outline-success'">Java</b-button>
        <b-button @click="showLanguage='Go'" :variant="showLanguage==='Go'?'success':'outline-success'">Go</b-button>

      </div>
      <div v-if="reposError" id="reposError" class="error text-left">
        <h6>Error getting repos</h6>
        <h6>{{errorMsg}}</h6>
      </div>
      <div class="row" >
        <Repo v-for="repo in filteredRepos" :repo="repo" :key="repo.index"></Repo>
      </div>
    </div>
  </div>
</template>

<script>
import Repo from './Repo.vue'

export default {
  name: 'RepoList',
  data () {
    return {
      errorMsg: '',
      searchQuery: '',
      showPrivate: 'All',
      showLanguage: 'All',
      repos: [],
      reposError: false
    }
  },
  components: {Repo},
  computed: {
    filteredRepos: function () {
      let filteredByLanguageRepos = this.getByLanguage(this.repos, this.showLanguage)
      return this.getByPrivate(filteredByLanguageRepos, this.showPrivate)
    }
  },
  methods: {
    getRepos: function () {
      const RepoList = this
      return new Promise((resolve, reject) => {
        RepoList.$http.get(GITHUB_URL + RepoList.searchQuery + '/repos', ACCESS_TOKEN_OPTION)
          .then(response => {
            // get body data
            RepoList.repos = response.body
            RepoList.reposError = false
            RepoList.errorMsg = ''
            RepoList.searchQuery = ''
            resolve('Success')
          })
          .catch(response => {
            RepoList.repos = []
            RepoList.reposError = true
            RepoList.errorMsg = 'Organization ' + RepoList.searchQuery + ' ' + response.body.message
            RepoList.searchQuery = ''
            reject('Failure')
          })
      })
    },
    emptyRepos: function () {
      this.repos = []
    },
    getByPrivate: function (array, isPrivate) {
      if (isPrivate === 'Public') {
        return array.filter(repo => {
          return repo.private === false
        })
      } else if (isPrivate === 'Private') {
        return array.filter(repo => {
          return repo.private === true
        })
      } else {
        return array
      }
    },
    getByLanguage: function (array, language) {
      if (language === 'All') {
        return array
      } else {
        return array.filter(repo => {
          return repo.language === language
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  cursor: pointer;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
</style>
