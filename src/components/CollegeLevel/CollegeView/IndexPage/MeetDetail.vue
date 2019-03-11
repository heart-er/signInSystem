<template>
  <div class="MeetDetail">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="人员配置" v-if="tab0">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div
            v-if="DataLength==false"
              class="meetDetails"
              :style="{margin:'0 auto',marginTop:'2em',borderRadius:'15px',width:'800px',height:'400px',background:'#CCCCCC'}"
            >
              <div :style="{margin:'180px 190px',position:'absolute'}">
                <h1>当前无会议记录,请先添加会议</h1>
                <div :style="{margin:'2em 7em'}">
                  <Button type="default" :style="{width:'200px',height:'40px',fontSize:'18px'}">添加会议</Button>
                </div>
              </div>
            </div>

            <div v-if="DataLength==true">
              <div
              class="btnGroup"
              :style="{display:'flex',justifyContent:'space-between'}"
            >
              <div>
                <Button type="primary" @click="goAddMeeting">添加会议</Button>
                <!-- <Button type="default" :style="{marginLeft:'1em'}">删除</Button>
                <Button type="default" :style="{marginLeft:'1em'}">修改</Button>-->
              </div>
              <!-- <div>
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
              </div>-->
            </div>
            <div class="tableData" :style="{marginTop:'1.5em'}">
              <Table border ref="selection" :columns="columns4" :data="MeetingClassList"></Table>
              <Page :total="2" :style="{marginTop:'1em'}" show-elevator/>
            </div>
            <!-- 模态框 -->
            <Modal v-model="isShowModel" title="查看未到名单">
              <Button type="primary">下载</Button>
              <Table :style="{marginTop:'1em'}" border :columns="columns5" :data="colmns1"></Table>
            </Modal>
            </div>
          </Content>
        </TabPane>
      </Tabs>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  name: "MeetDetail",
  data() {
    return {
      tab0: true,
      isShowModel: false,
      columns4: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: "会议名称",
          key: "meeting_name"
        },
        {
          title: "参会班级",
          key: "class_name"
        },
        {
          title: "参会人数",
          key: "student_number"
        },
        {
          title: "请假人数",
          key: "meeting_name"
        },
        {
          title: "会议时间",
          key: "start_time"
        },
        {
          title: "地点",
          key: "address"
        },
        {
          title: "组织者",
          key: "organizer"
        },
        {
          title: "讲师",
          key: "speaker"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.isShowModel = true;
                    }
                  }
                },
                "查看详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      console.log(params.row.meeting_id);
                      const meeting_id = params.row.meeting_id;
                      this.$http
                        .delete(
                          "https://nbjzj.xin/signin/meeting/" + meeting_id,
                          {
                            meeting_id
                          }
                        )
                        .then(res => {
                          console.log(res);
                          if (res.status == "200") {
                            this.remove(params.index);
                            this.$Messsage.success("删除成功");
                          } else {
                            this.$Messsage.error("删除失败");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          this.$Messsage.error("删除失败");
                        });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      DataLength: false,
      MeetingClassList: [],
      columns5: [
        {
          title: "学号",
          key: "user_number"
        },
        {
          title: "姓名",
          key: "user_name"
        },
        {
          title: "班级",
          key: "class_name"
        }
      ],
      colmns1: [
        {
          user_number: 15401200101,
          user_name: "徐雅婷",
          class_name: "网络152"
        },
        {
          user_number: 15401200102,
          user_name: "徐小萌",
          class_name: "网络152"
        }
      ]
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    goAddMeeting() {
      this.$router.push("/college/AddMeeting");
    },
    remove(index) {
      this.MeetingClassList.splice(index, 1);
    }
  },
  mounted() {
    this.$http
      .get("https://nbjzj.xin/signin/meeting/all")
      .then(res => {
        this.MeetingClassList = res.data;
        // this.DataLength = res.data.length;
        if(res.data.length>0){
          this.DataLength=true;
        }else{
          this.DataLength=false;
        }
        console.log(this.DataLength);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

