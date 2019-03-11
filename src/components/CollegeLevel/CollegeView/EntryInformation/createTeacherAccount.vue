<template>
  <div class="createTeacherAccount">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="教师账号开设" v-if="tab0">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div class="WriteTeacherInformation">
              <div class="teacherPhotoInformation">
                <div class="photo">
                  <!-- 图片 -->
                </div>
                <div class="uploadPhoto" :style="{marginTop:'1em'}">
                  <!-- 上传按钮 -->
                  <div class="file">
                    选择文件
                    <input id="file" type="file" @change="getFile">
                  </div>
                </div>
              </div>
              <div class="teacherInformation">
                <!-- 老师信息 -->
                <div class="leftTeacherInformation">
                  <div>
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">姓名</span>
                    <Input v-model="information.name" style="width: 200px;margin-left:2em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">密码</span>
                    <Input v-model="information.password" style="width: 200px;margin-left:2em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">学历</span>
                    <Select v-model="information.getEducation" style="width:200px;margin-left:2em;">
                      <Option
                        v-for="education in information.educations"
                        :value="education.title"
                        :key="education.title"
                      >{{ education.title }}</Option>
                    </Select>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">所在学院</span>
                    <Select v-model="information.getAcademy_id" style="width:200px">
                      <Option
                        v-for="depart in information.department"
                        :value="depart.academy_id"
                        :key="depart.academy_id"
                      >{{ depart.academy_name }}</Option>
                    </Select>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">性别</span>
                    <Select v-model="information.getSex" style="width:200px;margin-left:2em;">
                      <Option
                        v-for="item in information.sexs"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">联系方式</span>
                    <Input v-model="information.contact" style="width: 200px;margin-left:0.1em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <Button type="primary" @click="createTeacherAccount">提交</Button>
                  </div>
                </div>
                <div class="rightTeacherInformation" :style="{marginLeft:'2em'}">
                  <div>
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">工号</span>
                    <Input v-model="information.ID" style="width: 200px;margin-left:1em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">职称</span>
                    <Input
                      v-model="information.professional"
                      style="width: 200px;margin-left:1em;"
                    />
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">入职日期</span>
                    <DatePicker
                    v-model="information.startTime"
                      type="date"
                      :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                      style="width: 200px"
                    ></DatePicker>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">身份证号</span>
                    <Input v-model="information.IDCard" style="width: 200px;margin-left:0.1em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">出生日期</span>
                    <DatePicker
                      v-model="information.birth" 
                      type="date"
                      :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                      style="width: 200px"
                    ></DatePicker>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">银行卡号</span>
                    <Input v-model="information.bankCard" style="width: 200px;margin-left:0.1em;"/>
                  </div>
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
  name: "createTeacherAccount",
  data() {
    return {
      tab0: true,
      value: "",
      getImageName: "",
      information: {
        startTime:"",
        getEducation: "",
        educations: [
          {
            title: "博士"
          },
          {
            title: "硕士"
          },
          {
            title: "学士"
          },
          {
            title: "专科"
          }
        ],
        name: "",
        password: "",
        department: [],
        getAcademy_id: "",
        sexs: [
          {
            value: "男",
            label: "男"
          },
          {
            value: "女",
            label: "女"
          }
        ],
        getSex: "",
        contact: "",
        bankCard: "",
        ID: "",
        professional: "",
        education: "",
        IDCard: "",
        birth: "",
        cityList: [
          {
            value: "网络工程",
            label: "网络工程"
          }
        ]
      }
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    getFile(e) {
      console.log(e.srcElement.files[0]);

      var preview = document.querySelector(".photo");
      var oFile = document.querySelector("#file");

      /*base64编码*/
      var file = oFile.files[0];
      var readImage = new FileReader();
      var that = this;
      readImage.onload = function() {
        /*编码*/
        that.getImageName = readImage.result;
        console.log(that.getImageName);
      };
      readImage.readAsDataURL(file);

      var url = window.URL.createObjectURL(oFile.files[0]);
      // 创建预览图片
      var img = new Image();
      img.src = url;
      img.style.width = "100%";
      img.style.height = "100%";
      // 插入预览图片

      preview.appendChild(img);
    },
    createTeacherAccount() {
      Date.prototype.toLocaleString = function() {
        return (
          this.getFullYear() +
          "-" +
          (this.getMonth() + 1) +
          "-" +
          this.getDate() +
          " " +
          this.getHours() +
          ":" +
          this.getMinutes()
        );
      };
      const user_name = this.information.name;
      const user_number = this.information.ID;
      const title = this.information.professional;
      const phone = this.information.contact;
      const password = this.$md5(this.information.password);
      const image = this.getImageName;
      const id_card = this.information.IDCard;
      const gender = this.information.getSex;
      const education = this.information.getEducation;
      const create_time = new Date(
        this.information.startTime
      ).toLocaleString();
      const card_number = this.information.bankCard;
      const birthday = new Date(this.information.birth).toLocaleString();
      const academy_id = this.information.getAcademy_id;

      this.$http
        .post("https://nbjzj.xin/signin/user/addTeacher", {
          user_name,
          user_number,
          title,
          phone,
          password,
          image,
          id_card,
          gender,
          education,
          create_time,
          card_number,
          birthday,
          academy_id
        })
        .then(res => {
          console.log(res);
          if (res.status == "200") {
            this.$Message.success("创建学生账号成功");
          } else {
            this.$Message.error("创建学生账号失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    const academy_name = this.$store.getters.getNowUserAcademyName;
    this.$http
      .get("https://nbjzj.xin/signin/academy/all", {
        academy_name
      })
      .then(res => {
        // this.classList = res.data;
        this.information.department = res.data;
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.photo {
  width: 80px;
  height: 100px;
  border: 1px solid rgb(226, 226, 226);
}

.teacherInformation {
  display: flex;
}
.WriteTeacherInformation {
  display: flex;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>


