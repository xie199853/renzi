<template>
  <div class="departments-container">
    <el-card>
      <treeTools :tree-node="company" is-root="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" default-expand-all>
      <treeTools slot-scope="{data}" :tree-node="data" />
    </el-tree>
  </div>
</template>
<!-- 丽姐刚刚在厕所打了我一拳 然后说子债父偿 -->
<script>
import { getDepartments } from '@/api/departments'
import treeTools from './cpns/tree-tools.vue'
export default {
  name: 'HrsaasIndex',
  components: { treeTools },
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name'
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }

    }
  },

  mounted() {
    this.getDepartment()
  },

  methods: {
    async getDepartment() {
      await getDepartments()
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
