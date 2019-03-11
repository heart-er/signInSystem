<template>
  <div class="importCourse">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="导入课程" v-if="tab0">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div class="searchCourse">
              <Input search enter-button placeholder="输入相关关键词..."/>
            </div>
            <div class="addCourse">
              <div class="addCourseTitle">
                <h2 id="addTitle">课程添加</h2>
              </div>
              <div class="courseMain">
                <div class="selectGroup">
                  <Select
                    v-model="classID"
                    :style="{marginLeft:'20px'}"
                    placeholder="请选择班级"
                    clearable
                  >
                    <Option
                      v-for="item in classList"
                      :value="item.class_id"
                      :key="item.class_id"
                    >{{ item.class_name }}</Option>
                  </Select>
                  <Input placeholder="请输入课程" v-model="inputCourse" :style="{marginLeft:'20px',marginRight:'20px'}" />
                  <Select
                    v-model="teacherID"
                    :style="{marginLeft:'20px'}"
                    placeholder="请选择授课教师"
                    clearable
                  >
                    <Option
                      v-for="item in teacherList"
                      :value="item.user_id"
                      :key="item.user_id"
                    >{{ item.user_name }}</Option>
                  </Select>
                  <Input placeholder="请输入授课地点" v-model="address" :style="{marginLeft:'20px',marginRight:'20px'}" />
                </div>
                <div class="subInformation">
                  <Button :style="{width:'20%'}" type="primary" @click="submitCourse">提交</Button>
                </div>
              </div>
            </div>
          </Content>
        </TabPane>
      </Tabs>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  name: "importCourse",
  data() {
    return {
      tab0: true,
      tab1: true,
      tab2: true,
      classList: [],
      inputCourse: "",
      teacherList:[],
      cityList: [],
      address: "",
      classID: "",
      courseName: "",
      teacherID: "",
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    submitCourse(){
      const address=this.address;
      const class_id=this.classID;
      const course_name=this.inputCourse;
      const teacher_id=this.teacherID;
      this.$http.post('https://nbjzj.xin/signin/course/add',{
        address,
        class_id,
        course_name,
        teacher_id
      }).then(res=>{
        console.log(res);
        if(res.status=='200'){
          this.$Message.success("添加成功");
        }
      }).catch(error=>{
        this.$Message.success("添加失败");
        console.log(error);
      })
    }
  },
  mounted() {
    const academy_name = this.$store.getters.getNowUserAcademyName;
    this.$http
      .get("https://nbjzj.xin/signin/class/all", {
        academy_name
      })
      .then(res => {
        this.classList = res.data;
      })
      .catch(error => {
        console.log(error);
      });

    this.$http
      .get("https://nbjzj.xin/signin/user/all", {
        academy_name
      })
      .then(res => {
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].identity=='TEACHER'){
            this.teacherList.push(res.data[i]);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.searchCourse {
  width: 300px;
  float: right;
}
@media only screen and (max-width: 600px) {
  .searchCourse {
    display: none;
  }
}
.addCourse {
  width: 95%;
  height: 180px;
  border: 1px solid rgb(235, 232, 232);
  margin: 50px 50px;
  flex-flow: column;
}
.courseMain {
  text-align: center;
}
.addCourseTitle {
  margin-left: 20px;
  margin-top: 1em;
}
.selectGroup {
  display: flex;
  margin-top: 1em;
}
.chooseSelect {
  margin: 0 auto;
}
.subInformation {
  margin-top: 2em;
}
button[type="button"] {
  margin-left: 10px;
}
</style>


