import Vue from 'vue'
import RepoList from '@/components/RepoList'

describe('RepoList.vue', function () {
  this.timeout(5000)
  describe('#getRepos', () => {
    const Constructor = Vue.extend(RepoList)
    const vm = new Constructor().$mount()

    it('should get repos correctly if Organization name is Github', done => {
      vm.searchQuery = 'github'
      vm.getRepos()
        .then((message) => {
          expect(message).to.equal('Success')
          expect(vm.repos).to.be.an('array')
          expect(vm.repos.length).to.be.above(1)
          done()
        })
        .catch(message => {
          console.log('github : ' + message)
          done()
        })
    })

    it('should get error if Organization name is not found', done => {
      vm.searchQuery = 'gpoasnp'
      vm.getRepos()
        .then((message) => {
          // console.log('4. message = ' + message)
          done()
        })
        .catch(message => {
          expect(message).to.equal('Failure')
          expect(vm.repos).to.be.an('array')
          expect(vm.repos.length).to.equal(0)
          done()
        })
    })
  })

  describe('#getByPrivate and #getByLanguage', () => {
    const Constructor = Vue.extend(RepoList)
    const vm = new Constructor().$mount()
    const allRepos = [
      {
        'id': 0,
        'name': 'zero',
        'private': false,
        'language': 'Python'
      },
      {
        'id': 1,
        'name': 'one',
        'private': false,
        'language': 'JavaScript'
      },
      {
        'id': 2,
        'name': 'two',
        'private': false,
        'language': 'JavaScript'
      },
      {
        'id': 3,
        'name': 'three',
        'private': false,
        'language': 'Python'
      },
      {
        'id': 4,
        'name': 'four',
        'private': true,
        'language': 'Java'
      },
      {
        'id': 5,
        'name': 'five',
        'private': true,
        'language': 'Python'
      },
      {
        'id': 6,
        'name': 'zero',
        'private': 'six',
        'language': 'JavaScript'
      },
      {
        'id': 7,
        'name': 'seven',
        'private': false,
        'language': 'C'
      },
      {
        'id': 8,
        'name': 'eight',
        'private': false,
        'language': 'Python'
      },
      {
        'id': 9,
        'name': 'nine',
        'private': true,
        'language': 'Java'
      }
    ]
    it('should filter only Private repos', () => {
      let filteredRepos = []
      filteredRepos = vm.getByPrivate(allRepos, 'Private')
      filteredRepos.forEach((repo) => {
        expect(repo.private).to.be.true
      })
      expect(filteredRepos.length).to.equal(3)
    })

    it('should filter only Public repos', () => {
      let filteredRepos = []
      filteredRepos = vm.getByPrivate(allRepos, 'Public')
      filteredRepos.forEach((repo) => {
        expect(repo.private).to.be.false
      })
      expect(filteredRepos.length).to.equal(6)
    })

    it('should filter all Public or Private repos', () => {
      let filteredRepos = []
      filteredRepos = vm.getByPrivate(allRepos, 'all')
      expect(filteredRepos.length).to.equal(10)
    })

    it('should filter only Python language', () => {
      let filteredRepos = []
      filteredRepos = vm.getByLanguage(allRepos, 'Python')
      filteredRepos.forEach((repo) => {
        expect(repo.language).to.equal('Python')
      })
      expect(filteredRepos.length).to.equal(4)
    })

    it('should filter only JavaScript language', () => {
      let filteredRepos = []
      filteredRepos = vm.getByLanguage(allRepos, 'JavaScript')
      filteredRepos.forEach((repo) => {
        expect(repo.language).to.equal('JavaScript')
      })
      expect(filteredRepos.length).to.equal(3)
    })

    it('should filter only Java language', () => {
      let filteredRepos = []
      filteredRepos = vm.getByLanguage(allRepos, 'Java')
      filteredRepos.forEach((repo) => {
        expect(repo.language).to.equal('Java')
      })
      expect(filteredRepos.length).to.equal(2)
    })
  })
})
