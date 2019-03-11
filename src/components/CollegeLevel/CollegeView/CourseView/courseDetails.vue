<template>
  <div class="courseDetails">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="课程明细" v-if="tab0">
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
            <div class="timeRange">
              <span :style="{fontSize:'18px',fontWeight:'bold'}">时间范围 :</span>
              <Row :style="{marginTop:'-2px',display:'flex'}">
                <Col span="12">
                  <DatePicker
                    v-model="startTime"
                    type="date"
                    :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                    placeholder="起始时间"
                    style="width: 200px"
                  ></DatePicker>
                </Col>
                <span :style="{fontWeight:'bold',fontSize:'18px',color:'#D3D3D3'}">-</span>
                <Col span="12" :style="{marginLeft:'15px'}">
                  <DatePicker
                    v-model="endTime"
                    @on-change="getNowRateDate"
                    type="date"
                    :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                    placeholder="结束时间"
                    style="width: 200px"
                  ></DatePicker>
                </Col>
              </Row>
            </div>
            <div class="filterInformation">
              <span :style="{fontSize:'18px',fontWeight:'bold'}">筛选条件 :</span>
              <Row>
                <Col span="12" style="padding-right:10px">
                  <Select v-model="model11" filterable>
                    <Option
                      v-for="item in cityList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span="12">
                  <Select v-model="model12" filterable multiple>
                    <Option
                      v-for="item in cityList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <div class="detailsInformationTable">
              <Table border :columns="columns1" :data="data1"></Table>
            </div>
            <div :style="{marginTop:'2em'}">
              <Button type="primary">导出表格</Button>
            </div>
          </Content>
        </TabPane>
      </Tabs>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  name: "courseDetails",
  data() {
    return {
      tab0: true,
      rate_of_ask_for_leave: "",
      rate_of_attendance: "",
      rate_of_attendance_highest_class_name: "",
      rate_of_attendance_lowest_class_name: "",
      rate_of_leave_early: "",
      startTime: "",
      endTime: "",
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        }
      ],
      model11: "",
      model12: [],
      columns1: [
        {
          title: "班级",
          key: "className",
          align: "center"
        },
        {
          title: "到课率",
          key: "attendRate",
          align: "center"
        },
        {
          title: "早退率",
          key: "EarlyRetreatRate",
          align: "center"
        },
        {
          title: "请假率",
          key: "LeaveRate",
          align: "center"
        },
        {
          title: "班级人数",
          key: "classPeopleNumber",
          align: "center"
        }
      ],
      data1: [
        {
          className: "网络181",
          attendRate: "",
          EarlyRetreatRate: "",
          LeaveRate: "",
          classPeopleNumber: ""
        },
        {
          className: "网络182",
          attendRate: "",
          EarlyRetreatRate: "",
          LeaveRate: "",
          courseTeacher: "",
          classPeopleNumber: ""
        }
      ]
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    getNowRateDate() {
      const academy_id = localStorage.getItem("academy_id");
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
      const start_time = new Date(this.startTime).toLocaleString();
      const end_time = new Date(this.endTime).toLocaleString();
      this.$http
        .put(`https://nbjzj.xin/signin/sign/academy/${academy_id}`, {
          academy_id,
          start_time,
          end_time
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
          this.$Message.error("获取相关数据失败!");
        });
    }
  },
  mounted() {
    const academy_id = localStorage.getItem("academy_id");
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


