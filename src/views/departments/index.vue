<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" @delDepts="getDepartment" @addDepts="addDepts" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" default-expand-all>
      <treeTools slot-scope="{data}" :tree-node="data" @delDepts="getDepartment" @addDepts="addDepts" @editDept="editDept" @reflushed="getDepartment" />
    </el-tree>
    <addDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>
<script>
import { getDepartments } from '@/api/departments'
import treeTools from './cpns/tree-tools.vue'
import { tranListToTreeData } from '@/utils/index'
import addDept from './cpns/add-dept.vue' // 引入新增部门组件
export default {
  name: 'HrsaasIndex',
  components: { treeTools, addDept },
  data() {
    return {
      loading: false,
      showDialog: false,
      departs: [],
      defaultProps: {
        label: 'name'
      },
      company: { name: '江苏省', manager: '负责人', id: '' }
    }
  },

  mounted() {
    this.getDepartment()
  },

  methods: {
    async getDepartment() {
      try {
        this.loading = true
        const { depts, companyName, companyManage, id } = await getDepartments()
        // console.log(depts)
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: id }
      } finally {
        this.loading = false
      }
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层;
      this.currentNode = node
    },
    editDept(node) {
      console.log(node)
      this.showDialog = true
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 85%;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        padding-right: 20px;
      }
    }
  }
  </style>
