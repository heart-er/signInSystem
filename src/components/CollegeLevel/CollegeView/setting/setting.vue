<template>
  <div class="setting">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="类型配置" v-if="tab0">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            
            <div style="display:flex;margin:1em">
              <table class="hovertable">
                <tr>
                  <th>配置模块</th>
                  <th>数据展示范围</th>
                  <th style="width:20%">操作</th>
                </tr>
                <tr>
                  <td>专业</td>
                  <td>
                    <div v-for="(major, index) in majorList" :key="major.major_id" >
                      <input type="hidden" v-model="major.major_id">
                      <span style="cursor:pointer"  @click="onEditName(major, index)">{{major.major_name}}</span>
                      <span
                        @click="sureDelte(major,index)"
                        v-show="isDelete"
                        style="color:red;font-weight:bold;position:absolute;margin-top:-0.5em"
                      >×</span>
                    </div>
                  </td>
                  <td>
                    <Button type="primary" @click="isShowMajorModal=true">新增</Button>
                    <Button type="error" style="margin-left:1em">
                      <span v-if="!isDelete" @click="deleteMajor">删除</span>
                      <span v-if="isDelete" @click="notDo">取消</span>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>年级</td>
                  <td>
                    <span>2015学年</span>
                    <span
                      v-show="isDeleteYear"
                      style="color:red;font-weight:bold;position:absolute;margin-top:-0.5em"
                    >×</span>
                  </td>
                  <td>
                    <Button type="primary">新增</Button>
                    <Button type="error" style="margin-left:1em">
                      <span v-if="!isDeleteYear" @click="deleteYear">删除</span>
                      <span v-if="isDeleteYear" @click="notDoYear">取消</span>
                    </Button>
                  </td>
                </tr>
              </table>
            </div>
            <!-- 弹窗 -->
            <Modal title="修改信息" 
            v-model="handleEdit.show" 
            class-name="vertical-center-modal">
              <Form :model="formItem" :label-width="80">
                <FormItem label="专业名称">
                  <Input v-model="formItem.name" placeholder="请输入新的专业名称"></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="submitSureUpdate">提交</Button>
                </FormItem>
              </Form>
            </Modal>
            <Modal title="添加专业" v-model="isShowMajorModal" class-name="vertical-center-modal">
              <Form :model="formItem" :label-width="80">
                <FormItem label="专业名称">
                  <Input v-model="newMajorName" placeholder="请输入需要添加的专业名称"></Input>
                </FormItem>
                <FormItem>
                  <!-- <Button type="primary" >提交</Button> -->
                </FormItem>
              </Form>
                <div slot="footer">
                    <Button>取消</Button>
                    <Button type="primary" @click="submitSureNew">提交</Button>
                  </div>
            </Modal>

          </Content>
        </TabPane>
      </Tabs>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  name: "setting",
  data() {
    return {
      tab0: true,
      majorList: [],
      isDelete: false,
      isDeleteYear: false,
      isShow: false,
      formItem: {
        input: "",
      },
      handleEdit: {
        show: false,
        form: {}
      },
      isShowMajorModal:false,
      newMajorName:""
    };
  },
  methods: {
    submitSureNew(){
      const major_name=this.newMajorName;
      const academy_id = this.$store.getters.getNowUserAcademyId;
      this.$http.post('https://nbjzj.xin/signin/major/add',{
        academy_id,
        major_name
      }).then(res=>{
        console.log(res);
      }).catch(error=>{
        console.log(error);
      })
    },
    submitSureUpdate(){
      const academy_id = this.$store.getters.getNowUserAcademyId;
      const major_name=this.formItem.name;
      const major_id=this.handleEdit.form.name;
      console.log(academy_id+" "+major_name+" "+major_id);
      this.$http.put('https://nbjzj.xin/signin/major/'+major_id,{
        academy_id,
        major_name,
        major_id
      }).then(res=>{
        console.log(res);
        if(res.status){
          this.$Message.success("添加成功");
        }else{
          this.$Message.error("添加失败");
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    deleteMajor() {
      this.isDelete = true;
    },
    sureDelte() {
      console.log(this.handleEdit.form.name);
      const major_id=this.handleEdit.form.name;
      this.$http.delete('https://nbjzj.xin/signin/major/'+major_id,{
        major_id
      }).then(res=>{
        console.log(res);
      }).catch(error=>{
        console.log(error);
      })
    },
    notDo() {
      this.isDelete = false;
    },
    deleteYear() {
      this.isDeleteYear = true;
      console.log("1");
    },
    notDoYear() {
      this.isDeleteYear = false;
    },
    onEditName (row, index) {
      this.$set(this.handleEdit, 'show', true)
      this.$set(this.handleEdit, 'form', {
        name: row.major_id,
        $index: index
      })
    },
  },
  mounted() {
    console.log(this.$store.getters.getNowUserAcademyName);
    const academy_name = this.$store.getters.getNowUserAcademyName;
    const information = JSON.stringify({
      academy_name
    });
    this.$http
      .get("https://nbjzj.xin/signin/major/all", {
        information
      })
      .then(res => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          this.majorList.push(res.data[i]);
        }
        
        console.log(this.majorList);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
table.hovertable {
  width: 90%;
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  border-width: 1px;
  border-color: #e7e3e3;
  border-collapse: collapse;
}
table.hovertable th {
  color: rgb(138, 136, 136);
  background-color: #f3f3f3d3;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #f0eded;
}
table.hovertable td {
  text-align: center;
  border-width: 1px;
  padding: 8px;
  border: 1px solid rgb(214, 214, 214);
  border-color: #ececec;
}
table.hovertable tr:hover {
  background: rgb(247, 252, 253);
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-modal {
  top: 0;
}
</style>


