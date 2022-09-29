<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10">
            <el-button type="primary" style="margin-left: 10px" size="small" icon="el-icon-plus" @click="addRole">新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" style="width: 100%" :data="rolelist">
            <el-table-column label="序号" width="120" type="index" />
            <el-table-column label="角色" width="240" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row :gutter="10" type="flex" justify="end" align="middle">
            <el-pagination
              v-if="total>0"
              background
              layout="prev, pager, next, sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2, 5, 10, 15]"
              @current-change="getRolelists"
              @size-change="getRolelists"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="getCompanyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="getCompanyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="getCompanyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="getCompanyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :dislogVisible.sync="dislogVisible" @refreshList="getRolelists" />
  </div>
</template>

<script>
import { getRolelist, dellRole, getCompanyInfo } from '@/api/setting'
import addRole from './cnps/addRole.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole
  },
  data() {
    return {
      dislogVisible: false,
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 10,
      rolelist: [],
      loading: false,
      getCompanyInfo: []
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRolelists()
    this.getCompanyInfos()
  },

  methods: {
    async getRolelists() {
      try {
        this.loading = true
        const { rows, total } = await getRolelist(this.page)
        console.log(rows)
        this.total = total
        this.rolelist = rows
        if (this.total > 0 && this.rolelist.length === 0) {
          this.page.page--
          this.getRolelists()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    addRole() {
      console.log(1)
      this.dislogVisible = true
    },
    // 绑定点击事件
    // 拿到当前行这条数据
    // 回显再新增角色的组件上
    editRole(row) {
      this.$refs.addRole.formData = { ...row } // 优化同步修改的问题 1.深拷贝 2.扩展运算符
      this.dislogVisible = true
    },
    // 删除角色
    // 给删除按钮添加点击事件
    // 删除按钮二次确认
    async  delRole(id) {
      try {
        await this.$confirm('确认删除该角色吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        // 删除接口封装
        // 调用删除接口
        await dellRole(id)
        this.getRolelists()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 获取公司
    // 拿到companyI
    // 1. this.$store.state.user.userInfo.company
    // 2. this.$store.getters.companyId
    // 调用 获取公司接口
    async getCompanyInfos() {
      this.getCompanyInfo = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
