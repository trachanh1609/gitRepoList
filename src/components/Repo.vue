<template>
    <div class="col col-md-4">
      <b-card :header="repo.language?repo.language:'Not specified'"
              header-variant="success"
              class="mx-1 my-2 p-0"
              footer-variant="success"
              show-footer
      >
      <ul class="text-left">
        <li>Repo Name: <br><strong>{{repo.name}}</strong></li>
        <li><a :href="repo.html_url">Github Page</a></li>
        <li>Language: {{repo.language?repo.language:'Not specified'}}</li>
        <li>Repo is <span v-if="repo.private">private</span><span v-else>public</span></li>
        <li>
          <a class="branch" @click="showBranchNames = !showBranchNames">{{branches.length}} branch<span v-if="branches.length > 1">es</span> in this repo</a>
        </li>
        <ul v-if="showBranchNames">
          <li v-for="branch in branches">{{branch.name}}</li>
        </ul>
        <h6 v-if="branchError" class="error">Error getting branch</h6>
      </ul>
         <small slot="footer" class="text-muted">

         </small>
      </b-card>
    </div>

</template>

<script>

export default {
  name: 'Repo',
  data () {
    return {
      branches: [],
      showBranchNames: false,
      branchError: false
    }
  },
  props: ['repo'],
  created: function () {
    this.getBranches()
  },
  watch: {
    // whenever repo changes, this function will run
    repo: function () {
      this.getBranches()
    }
  },
  methods: {
    getBranches: function () {
      const Repo = this
      return new Promise((resolve, reject) => {
        Repo.$http.get(Repo.repo.url + '/branches', ACCESS_TOKEN_OPTION)
          .then(response => {
            // get body data
            Repo.branches = response.body
            Repo.branchError = false
            resolve('Success')
          })
          .catch(response => {
            Repo.branches = []
            Repo.branchError = true
            reject('Failure')
          })
      })
    },
    urlIsValid: function (url) {
      if (url === '') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.branch{
  cursor: pointer;
}
</style>
