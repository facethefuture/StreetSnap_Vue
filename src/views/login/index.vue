<template>
  <div>
    login
    <button @click="doLogin">登陆</button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
    doLogin () {
      this.axios.post('/api/login', {
        username: 'admin',
        password: '123'
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
