<template>
  <div>
    <div class="block date-picker">
      <el-date-picker
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </div>
    homexxxxxxxxx
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      value6: ''
    }
  }
}
</script>

<style scoped>
  .date-picker{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 30px 0;
  }
</style>
