<template>
    <div>
      <div class="block" :class="$style['date-picker']">
        <div @click="switchToPost"> <el-button type="primary" round><img src="../../../assets/fabu.svg" /><span>发布街拍</span></el-button>
        </div>
        <el-date-picker
          @change="changeDate"
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          >
        </el-date-picker>
      </div>
      <!--table-->
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :class="$style.table"
        >
          <el-table-column
            label="封面"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <img :class="$style['cover-image-popover']" :src="host.host + scope.row.coverImage"/>
                <div slot="reference" class="name-wrapper">
                  <!--<el-tag size="medium">{{ scope.row.name }}</el-tag>-->
                  <img :class="$style['cover-image']" :src="host.host + scope.row.coverImage"/>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="日期"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createdTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="照片名"
            width="180">
            <template slot-scope="scope">
              <div>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
            width="180">
            <template slot="header" slot-scope="scope">
              <div>描述</div><el-input
                @change="valiedateParams"
                v-model="description"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <div>{{scope.row.description}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            width="180">
            <template slot-scope="scope">
              <div>
                <div v-for="item in scope.row.tags" :key="item" :class="$style.tag">
                  {{item}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                active-color="#13ce66"
                @change="switchStatus(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="page-block">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import host from '@/common/host'
export default {
  name: 'index',
  data () {
    return {
      value6: [],
      search: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1,
      total: 1,
      host: host,
      switchValue: false,
      params: {
        page: 1,
        enable: 0
      },
      description: '',
      tag: ''
    }
  },
  created () {
    this.initDate()
    this.getList()
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.valiedateParams()
    },
    getList (page = 1) {
      this.$axios({
        method: 'GET',
        url: '/api/hotRecommend',
        params: this.params
        // headers: {
        //   'content-type': 'application/json',
        //   'Authorization': localStorage.getItem('Authorization')
        // }
      }).then((data, status) => {
        console.log(data)
        let res = data.data
        res.dataList.forEach((item) => {
          item.createdTime = this.dateFormat(item.createdTime)
          item.enable = item.enable === '1'
          item.tags = JSON.parse(item.tags)
        })
        this.tableData = res.dataList
        this.currentPage = res.currentPage
        this.total = res.totalRecord
      }).catch((err) => {
        console.log(err)
      })
    },
    dateFormat (val) {
      if (val) {
        let time = new Date(val * 1000)
        let year = time.getFullYear()
        let month = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
        let date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
        return `${year}-${month}-${date}`
      } else {
        return ''
      }
    },
    switchToPost () {
      this.$router.push({name: 'streetSnapPost'})
    },
    switchStatus (e) {
      console.log(e)
      let enable = e.enable ? 1 : 0
      this.updateStatus(e.id, enable)
    },
    valiedateParams () {
      Reflect.set(this.params, 'page', this.currentPage)
      if (!this.description.trim()) {
        Reflect.deleteProperty(this.params, 'description')
      } else {
        Reflect.set(this.params, 'description', this.description)
        Reflect.deleteProperty(this.params, 'tag')
        this.tag = ''
      }
      if (!this.tag.trim()) {
        Reflect.deleteProperty(this.params, 'tag')
      } else {
        Reflect.set(this.params, 'tag', this.tag)
        Reflect.deleteProperty(this.params, 'description')
        this.description = ''
      }
      console.log(this.params)
      this.getList()
    },
    updateStatus (id, enable) {
      console.log(id, enable)
      // const data = new URLSearchParams()
      // params.append('id', id)
      // params.append('enable', enable)
      this.$axios({
        method: 'POST',
        url: '/api/admin/updateHotRecommend',
        data: {
          id: id,
          enable: enable
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((data) => {
        console.log(data)
        if (data.status === 200 && data.data === 'success') {
          this.getList()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeDate (val) {
      console.log(val)
      if (Array.isArray(val)) {
        let startTime = new Date(val[0]).getTime()
        let endTime = new Date(val[1]).getTime()
        console.log(startTime, endTime)
        Reflect.set(this.params, 'startTime', Number.parseInt(startTime / 1000))
        Reflect.set(this.params, 'endTime', Number.parseInt(endTime / 1000))
        this.getList()
      } else {
        this.initDate()
        this.getList()
      }
    },
    initDate () {
      let today = new Date()
      let start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).getTime()
      let end = today.getTime()
      this.$nextTick(() => {
        this.value6 = [start, end]
      })
      Reflect.set(this.params, 'startTime', Number.parseInt(start / 1000))
      Reflect.set(this.params, 'endTime', Number.parseInt(end / 1000))
    }
  }
}
</script>

<style lang="scss" module>
  .date-picker{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
    &>div:nth-child(1){
      button{
        height: 32px;
        padding: 0px 20px;
        span{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      /*position: relative;*/
      img{
        height: 32px;
        margin-right: 5px;
        /*position: absolute;*/
      }
    }
  }
  .table{
    background: yellow;
    table{
      thead{
        th{
          div{
            padding-left: 0;
          }
        }
        th:nth-child(4),th:nth-child(5){
          &>div{
            padding-left: 0;
            &>div:nth-child(1){
              overflow: initial;
              text-overflow: initial;
            }
            display: flex;
            input{
              width: 100px;
              text-align: center;
              padding: 0;
            }
          }
        }
      }
      tbody{
        tr{
          /*height: 200px;*/
          td{
            /*height: 200px;*/
          }
        }
      }
    }
  }
  .page-block{
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }
  .cover-image{
    height: 100px;
    width: 100px;
  }
  .cover-image-popover{
    /*width: 300px;*/
    height: 300px;
  }
  .tag{
    font-size: 16px;
    vertical-align: middle;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 2px 5px;
    font-family:Helvetica Neue, Helvetica, sans-serif;
    border-radius: 12px;
    background-color:#fbbd08;
    color:#333;
    margin-right: 3px;
    text-align: center;
  }
</style>
