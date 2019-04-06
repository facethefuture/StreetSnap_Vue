<template>
  <div :class="$style.container">
    <div :class="$style['public-page']">
      <div>
        <el-menu
          :class="$style.navication"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">报表</el-menu-item>
          <el-submenu index="2">
            <template slot="title">图片管理</template>
            <el-menu-item index="2-1">街拍</el-menu-item>
            <el-menu-item index="2-2">摄影</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3">街拍故事</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeIndex: '1'
    }
  },
  created () {
    window.addEventListener('popstate', this.changeActiveIndex)
    this.activeIndex = this.$route.meta.activeIndex
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      console.log(key === '2-1')
      switch (key) {
        case '1':
          this.$router.push({name: 'home'})
          break
        case '2-1':
          this.$router.push({name: 'streetSnapManagement'})

          break
        case '2-2':
          this.$router.push({name: 'photographyManagement'})

          break
      }
      console.log('zhixing')
      this.activeIndex = localStorage.getItem('activeIndex') ? localStorage.getItem('activeIndex') : '1'
      // if (key === 1) {
      //   this.$router.push(name: 'home')
      // } else {}
    },
    changeActiveIndex () {
      console.log('后退事件')
      this.activeIndex = this.$route.meta.activeIndex
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;

}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container{
  /*好看的淡灰色*/
  /*background: #F6F6F6;*/
  /*纸质书的感觉*/
  background: #F6F5F0;
  min-height: 100vh;
  color: #555;
}
  .public-page{
    max-width: 1200px;
    margin: 0 auto;

  }
  .navication{
    ul{
      margin-top: 5px;
    }
  }
</style>
