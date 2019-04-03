<template>
    <div>
      <div class="block" :class="$style['date-picker']">
        <div @click="switchToPost"> <el-button type="primary" round><img src="../../../assets/fabu.svg" /><span>发布街拍</span></el-button>
        </div>
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
            label="姓名"
            width="180">
            <template slot-scope="scope">
              <div>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
            width="180">
            <template slot-scope="scope">
              <div>{{scope.row.description}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            width="180">
            <template slot-scope="scope">
              <div>
                {{scope.row.tags}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            width="">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>

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
      value6: '',
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
      switchValue: false
    }
  },
  created () {
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
    },
    getList (page = 1) {
      this.$axios({
        method: 'GET',
        url: '/api/hotRecommend',
        params: {
          page: page
        },
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
        }
      }).then((data, status) => {
        console.log(data)
        let res = data.data
        res.dataList.forEach((item) => {
          item.createdTime = this.dateFormat(item.createdTime)
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
</style>
