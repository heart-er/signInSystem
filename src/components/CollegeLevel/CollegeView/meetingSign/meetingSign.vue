<template>
  <div class="meetingSign">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="会议签到" v-if="tab0">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div class="courseDetailInformation">
              <div class="anCourseDetail">
                <div :style="{marginTop:'1em'}">
                  <div>{{rate_of_ask_for_leave}}%</div>
                  <div>请假率</div>
                </div>
              </div>
              <div class="anCourseDetail">
                <div :style="{marginTop:'1em'}">
                  <div>{{rate_of_attendance}}%</div>
                  <div>到课率</div>
                </div>
              </div>
              <div class="anCourseDetail">
                <div :style="{marginTop:'1em'}">
                  <div>{{rate_of_attendance_highest_class_name}}</div>
                  <div>请假率最高班级</div>
                </div>
              </div>
              <div class="anCourseDetail">
                <div :style="{marginTop:'1em'}">
                  <div>{{rate_of_attendance_lowest_class_name}}</div>
                  <div>请假率最低班级</div>
                </div>
              </div>
              <div class="anCourseDetail">
                <div :style="{marginTop:'1em'}">
                  <div>{{rate_of_leave_early}}%</div>
                  <div>早退率</div>
                </div>
              </div>
            </div>
            <div :style="{width:'400px',display:'flex',marginTop:'3em'}">
              <span :style="{color:'red'}">*</span>
              <Select
                :style="{marginLeft:'6px'}"
                @on-change="getClassName"
                v-model="chooseClass"
                placeholder="请选择班级"
                filterable
              >
                <Option
                  v-for="item in classList"
                  :value="item.class_id"
                  :key="item.class_id"
                >{{ item.class_name }}</Option>
              </Select>
            </div>
            <div class="classInformation" :style="{marginTop:'1.5em'}">
              <h2>{{NowClassName}}签到情况明细</h2>
              <div class="timeRange">
                <span :style="{fontSize:'18px',fontWeight:'bold'}">时间范围:</span>
                <Row :style="{marginTop:'-2px',display:'flex'}">
                  <Col span="12">
                    <DatePicker
                      type="date"
                      :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                      placeholder="起始时间"
                      style="width: 200px"
                      v-model="startTime"
                    ></DatePicker>
                  </Col>
                  <span :style="{fontWeight:'bold',fontSize:'18px',color:'#D3D3D3'}">-</span>
                  <Col span="12" :style="{marginLeft:'15px'}">
                    <DatePicker
                      type="date"
                      @on-change="getNowClassName"
                      v-model="endTime"
                      :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                      placeholder="结束时间"
                      style="width: 200px"
                    ></DatePicker>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="tableClassSignMeetInformation">
              <Table border :columns="columns1" :data="data1"></Table>
            </div>
            <!-- <div :style="{marginTop:'2em'}">
              <Button type="primary">导出表格</Button>
            </div> -->
          </Content>
        </TabPane>
      </Tabs>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  name: "meetingSign",
  data() {
    return {
      tab0: true,
      NowClassName:"",
      rate_of_ask_for_leave: "",
      rate_of_attendance: "",
      rate_of_attendance_highest_class_name: "",
      rate_of_attendance_lowest_class_name: "",
      rate_of_leave_early: "",
      startTime: "",
      endTime: "",
      columns1: [
        {
          title: "课程",
          key: "course_name",
          align: "center"
        },
        {
          title: "到课率",
          key: "rate_of_attendance",
          align: "center"
        },
        {
          title: "早退率",
          key: "rate_of_leave_early",
          align: "center"
        },
        {
          title: "请假率",
          key: "rate_of_ask_for_leave",
          align: "center"
        },
        {
          title: "授课教师",
          key: "teacher_name",
          align: "center"
        },
        {
          title: "教室",
          key: "address",
          align: "center"
        }
      ],
      data1: [],
      classList: [],
      chooseClass: ""
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    getClassName() {
      const class_id = this.chooseClass;
      this.$http
        .put(`https://nbjzj.xin/signin/sign/class/${class_id}`, {
          class_id
        })
        .then(res => {
          console.log(res);
          //获得表格数据
          this.data1 = res.data.course_list;
          this.NowClassName=res.data.class_name;
        })
        .catch(error => {
          this.$Message.error("获取相关数据失败!");
        });
    },
    getNowClassName() {
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
      const class_id = this.chooseClass;
      const start_time = new Date(this.startTime).toLocaleString();
      const end_time = new Date(this.endTime).toLocaleString();
      if (class_id) {
        this.$http
          .put(`https://nbjzj.xin/signin/sign/class/${class_id}`, {
            class_id,
            start_time,
            end_time
          })
          .then(res => {
            this.data1 = [];
            this.data1 = res.data.course_list;
          })
          .catch(error => {
            this.$Message.error("获取相关数据失败!");
          });
      } else {
        return;
      }
    }
  },
  mounted() {
    const academy_name = this.$store.getters.getNowUserAcademyName;

    const academy_id = localStorage.getItem("academy_id");
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
      .put("https://nbjzj.xin/signin/sign/academy/" + academy_id, {
        academy_id
      })
      .then(res => {
        console.log(res);
        this.rate_of_ask_for_leave = res.data.rate_of_ask_for_leave;
        this.rate_of_attendance = res.data.rate_of_attendance;
        if (res.data.rate_of_attendance_highest_class_name == null) {
          this.rate_of_attendance_highest_class_name = "无";
        } else {
          this.rate_of_attendance_highest_class_name =
            res.data.rate_of_attendance_highest_class_name;
        }
        if (res.data.rate_of_attendance_lowest_class_name == null) {
          this.rate_of_attendance_lowest_class_name = "无";
        } else {
          this.rate_of_attendance_lowest_class_name =
            res.data.rate_of_attendance_lowest_class_name;
        }
        this.rate_of_leave_early = res.data.rate_of_leave_early;
      })
      .catch(error => {
        this.$Message.error("获取相关数据失败");
      });
  }
};
</script>
<style scoped>
.classInformation {
  display: flex;
  justify-content: space-between;
}
.timeRange {
  display: flex;
}
.tableClassSignMeetInformation {
  margin-top: 2em;
}
.courseDetailInformation {
  display: flex;
}
.anCourseDetail {
  width: 30%;
  height: 70px;
  text-align: center;
  border: 1px solid rgb(218, 210, 210);
  margin-left: 1em;
}
.timeRange {
  display: flex;
  margin: 2em 0.5em;
  justify-content: flex-start;
}
.filterInformation {
  display: flex;
  margin: 2em 0.5em;
}
td {
  text-align: center;
}
</style>


