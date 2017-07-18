import Vue from 'vue'
import Repo from '@/components/Repo'

describe('Repo.vue', function () {
  this.timeout(5000)
  const repoData = {
    'id': 6341383,
    'name': 'Archimedes',
    'full_name': 'github/Archimedes',
    'owner': {
      'login': 'github',
      'id': 9919,
      'avatar_url': 'https://avatars5.githubusercontent.com/u/9919?v=4',
      'gravatar_id': '',
      'url': 'https://api.github.com/users/github',
      'html_url': 'https://github.com/github',
      'type': 'Organization',
      'site_admin': false
    },
    'private': false,
    'html_url': 'https://github.com/github/Archimedes',
    'description': 'Geometry functions for Cocoa and Cocoa Touch',
    'fork': false,
    'url': 'https://api.github.com/repos/github/Archimedes',
    'language': 'Objective-C'
  }

  describe('#getBranches', () => {
    const Constructor = Vue.extend(Repo)
    const vm = new Constructor({propsData: {repo: repoData}}).$mount()

    it('should get branches correctly', done => {
      vm.getBranches()
        .then((message) => {
          expect(message).to.equal('Success')
          expect(vm.branches).to.be.an('array')
          expect(vm.branches.length).to.be.above(1)
          done()
        })
        .catch(message => {
          console.log('get branches : ' + message)
          done()
        })
    })
  })
})
