<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      node-key="id"
      show-checkbox
      :props="defaultProps"
      :filter-node-method="filterNode"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
    />

    <el-dialog title="修改名称" :visible.sync="dialogFormVisible" width="500px" center>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="原名称: ">
          <label>{{form.originLabel}}</label>
        </el-form-item>
        <el-form-item label="新名称: " prop="newLabel">
          <el-input v-model="form.newLabel" class="el-input" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm('form')">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
let id = 1000
export default {

  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: 'Level one 1',
        IsShow: false,
        children: [{
          id: 4,
          label: 'Level two 1-1',
          IsShow: false,
          children: [{
            id: 9,
            label: 'Level three 1-1-1',
            IsShow: false
          }, {
            id: 10,
            label: 'Level three 1-1-2',
            IsShow: false
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        IsShow: false,
        children: [{
          id: 5,
          label: 'Level two 2-1',
          IsShow: false
        }, {
          id: 6,
          label: 'Level two 2-2',
          IsShow: false
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        IsShow: false,
        children: [{
          id: 7,
          label: 'Level two 3-1',
          IsShow: false
        }, {
          id: 8,
          label: 'Level two 3-2',
          IsShow: false
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
        IsShow: false
      },
      form: {
        originLabel: '',
        newLabel: ''
      },
      rules: {
        newLabel: [
          { required: true, message: 'Please input new Label name', trigger: 'blur' },
          { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' }
        ]
      },
      activeData: {},
      dialogFormVisible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button
              size='mini'
              type='text'
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size='mini'
              type='text'
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
            <el-button
              size='mini'
              type='text'
              on-click={() => this.alter(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      )
    },
    Inp(value, data) {
      data.label = value
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [], IsShow: false }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },
    alter(node, data) {
      console.log(node)
      console.log(data)
      // data.IsShow = !data.IsShow
      this.dialogFormVisible = !this.dialogFormVisible
      this.activeData = data
      this.form.originLabel = data.label
    },
    cancel(node, data) {
      console.log(node)
      console.log(data)
      data.IsShow = !data.IsShow
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.activeData.label = this.form.newLabel
          this.dialogFormVisible = !this.dialogFormVisible
          this.form = {}
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 200px;
  }

  .el-input {
    width: 300px;
  }
</style>

