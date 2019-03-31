<template>
  <div :class="$style.container">
    <div>
      <div :class="$style.loginForm">
        <el-form  :model="formLabelAlign">
          <el-form-item label="">
            <el-input v-model="formLabelAlign.username" required placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formLabelAlign.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="" :class="$style.loginIcon" >
            <div @click="doLogin">
              <img src="../../assets/loginIcon.svg"/>
              <div>登陆</div>
            </div>
          </el-form-item>
        </el-form>
        <!--<img src="../../assets/login.jpg" >-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin () {
      console.log('登陆')
      // this.$axios.post('https://localhost/login', {
      //   username: 'admin',
      //   password: '123'
      // }).then((data) => {
      //   console.log(data)
      // }).catch((err) => {
      //   console.log(err)
      // })
      this.$axios({
        method: 'POST',
        url: '/api/login',
        data: {
          username: this.formLabelAlign.username,
          password: this.formLabelAlign.password
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(({status, data, headers}) => {
        console.log(data)
        console.log(status)
        console.log(headers)
        if (status === 200 && headers.authorization) {
          localStorage.setItem('Authorization', headers.authorization)
          let jwtDate = new Date().getTime()
          localStorage.setItem('jwtDate', jwtDate)
        } else {
          // this.
        }
      }).catch((msg) => {
        console.log(msg)
      })
    }
  }
}
</script>

<style lang="scss" module>
.container{
  /*background: ;*/
  /*position: relative;*/
  /*margin: 0 auto;*/
  background: rgba(45,45,45,0.98);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /*text-align: center;*/
  &>div{
    background: url("../../assets/login.jpg") no-repeat center;
    background-size: 100% 100%;
    width: 1200px;
    height: 735px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
/*(min-width:735px ) 735w, 100vw*/
  /*background: url("../../assets/login.jpg") no-repeat;*/
}
.loginForm{
  /*margin: auto auto;*/
  /*position: relative;*/
  /*top: 50%;*/
  /*left: 50%;*/
  opacity: 100%;
  z-index: 100;
  form{
    &>div{
      &>div{
        margin-left: 37px!important;
      }
    }
  }
  input{
    background:rgba(0,0,0,0.2);
    border: 1px solid rgba(0,0,0, 0.2);
    color: yellow;
  }
}
  .loginIcon{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &>div{
      line-height: 20px!important;
    }
    img{
      width: 32px;
      height: 32px;
    }
  }
  .loginIcon{
    &>div:hover{
      cursor:pointer
    }
  }
</style>
