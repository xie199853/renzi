<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登录账户设置" name="first">

            <!-- 放置表单 -->
            <el-form ref="from" :model="accountInfo" :rules="accountInfoRules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accountInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accountInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second" >
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third" >
           <jobINfo></jobINfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import userInfo from './components/user-info.vue'
import jobINfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    userInfo,
    jobINfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      accountInfoRules: {
        username: [
          { required: true, message: '请输入员工名称', tigger: 'blur' },
          { min: 2, max: 10, message: '长度在2-10之间', tigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', tigger: 'blur' },
          { min: 6, message: '密码长度最小6位', tigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployees() {
      try {
        await this.$refs.from.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
