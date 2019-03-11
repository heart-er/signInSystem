<template>
  <div class="createStudentAccount">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="新建学生账号" v-if="tab0">
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
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">专业班级</span>
                    <Select
                      :style="{marginLeft:'6px',width:'200px'}"
                      v-model="information.class"
                      placeholder="请选择班级"
                      filterable
                    >
                      <Option
                        v-for="item in information.classList"
                        :value="item.class_id"
                        :key="item.class_id"
                      >{{ item.class_name }}</Option>
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
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">政治面貌</span>
                    <Select v-model="information.department" style="width:200px;">
                      <Option
                        v-for="item in information.nationList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">银行卡号</span>
                    <Input v-model="information.bankCard" style="width: 200px;margin-left:0.1em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">民族</span>
                    <Input v-model="information.Nationality" style="width: 200px;margin-left:2em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">家庭住址</span>
                    <Input v-model="information.address" style="width: 200px;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <Button type="primary" @click="createStudent">提交</Button>
                  </div>
                </div>
                <div class="rightTeacherInformation" :style="{marginLeft:'2em'}">
                  <div>
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">学号</span>
                    <Input v-model="information.ID" style="width: 200px;margin-left:2em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">密码</span>
                    <Input v-model="information.password" style="width: 200px;margin-left:2em;"/>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">入学日期</span>
                    <DatePicker
                      v-model="information.schoolDataTime"
                      type="date"
                      :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                      style="width: 200px"
                    ></DatePicker>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">学生类型</span>
                    <Select v-model="information.studentProperty" style="width:200px;">
                      <Option
                        v-for="item in information.student"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div :style="{marginTop:'1.5em'}">
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">身份证号</span>
                    <Input v-model="information.IDCard" style="width: 200px;"/>
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
                    <span :style="{fontSize:'15px',margin:'1em 1em'}">寝室号</span>
                    <Input v-model="information.bedroom" style="width: 200px;margin-left:1em;"/>
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
  name: "createStudentAccount",
  data() {
    return {
      tab0: true,
      value: "",
      information: {
        schoolDataTime: "",
        name: "",
        academy: "",
        class: "",
        classList: [],
        cityList: [
          {
            value: "网络工程",
            label: "网络工程"
          }
        ],
        nationList: [
          {
            value: "预备党员",
            label: "预备党员"
          },
          {
            value: "共青团员",
            label: "共青团员"
          },
          {
            value: "群众",
            label: "群众"
          }
        ],
        department: "",
        Nationality: "",
        getSex: "",
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
        contact: "",
        bankCard: "",
        student: [
          {
            value: "本科",
            label: "本科"
          },
          {
            value: "专升本",
            label: "专升本"
          },
          {
            value: "单考单招",
            label: "单考单招"
          },
          {
            value: "中美合作",
            label: "中美合作"
          }
        ],
        studentProperty: "",
        ID: "",
        password: "",
        IDCard: "",
        birth: "",
        bedroom: "",
        address: "",
        getImageName: ""
      }
    };
  },
  methods: {
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
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    createStudent() {
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
      const political_status = this.information.department;
      const phone = this.information.contact;
      const password = this.$md5(this.information.password);
      const id_card = this.information.IDCard;
      const hometown = this.information.address;
      const gender = this.information.getSex;
      const ethnic = this.information.Nationality;
      const education = this.information.studentProperty;
      const create_time = new Date(
        this.information.schoolDataTime
      ).toLocaleString();
      const class_id = this.information.class;
      const card_number = this.information.bankCard;
      const birthday = new Date(this.information.birth).toLocaleString();
      const bedroom_number = this.information.bedroom;
      const image = this.getImageName;
      console.log(
        user_name +
          " " +
          user_number +
          " " +
          political_status +
          " " +
          phone +
          " " +
          password +
          " " +
          id_card +
          " " +
          hometown +
          " " +
          gender +
          " "
      );
      console.log(
        ethnic +
          " " +
          education +
          " " +
          create_time +
          " " +
          class_id +
          " " +
          card_number +
          " " +
          birthday +
          " " +
          bedroom_number +
          " " +
          image
      );

      this.$http
        .post("https://nbjzj.xin/signin/user/addStudent", {
          user_name: user_name,
          user_number: user_number,
          political_status: political_status,
          phone: phone,
          password: password,
          id_card: id_card,
          hometown: hometown,
          gender: gender,
          ethnic: ethnic,
          education: education,
          create_time: create_time,
          class_id: class_id,
          card_number: card_number,
          birthday: birthday,
          bedroom_number: bedroom_number,
          image: image
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

      // 检测身份证格式是否正确
      // if(!this.$options.methods.checkIdentityCard(IDCard)){
      //   console.log("身份证格式错误")
      // }else{
      //   return;
      // }
    },
    checkIdentityCard(usercard) {
      var check = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!check.test(usercard)) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    const academy_name = this.$store.getters.getNowUserAcademyName;
    this.$http
      .get("https://nbjzj.xin/signin/class/all", {
        academy_name
      })
      .then(res => {
        this.information.classList = res.data;
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


