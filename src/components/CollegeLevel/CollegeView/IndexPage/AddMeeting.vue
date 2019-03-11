<template>
  <div class="AddMeeting">
    <Breadcrumb :style="{margin: '15px 0'}">
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="添加会议" v-if="tab0">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div class="writeInformation" :style="{display:'flex',flexDirection:'column'}">
              <div class="fLine" :style="{display:'flex'}">
                <div>
                  <span :style="{color:'red',fontSize:'22px'}">*</span>会议名称：
                  <Input :style="{width:'300px'}" v-model="meetingName"/>
                </div>
                <div :style="{marginLeft:'8em'}">
                  <span :style="{color:'red',fontSize:'22px'}">*</span>会议时间：
                  <DatePicker
                    v-model="startTime"
                    type="date"
                    placeholder="Select date"
                    style="width: 300px"
                  ></DatePicker>
                </div>
              </div>
              <div class="SLine" :style="{display:'flex',marginTop:'1em'}">
                <div>
                  <span :style="{color:'red',fontSize:'22px'}">*</span>会议地点：
                  <Input :style="{width:'300px'}" v-model="address"/>
                </div>
                <div :style="{marginLeft:'8em'}">
                  <span :style="{color:'red',fontSize:'22px'}">*</span>主讲人：
                  <Input :style="{width:'300px',marginLeft:'1em'}" v-model="speaker"/>
                </div>
              </div>
              <div class="TLine" :style="{display:'flex',marginTop:'1em'}">
                <div>
                  <span :style="{color:'red',fontSize:'22px'}">*</span>主办方：
                  <Input :style="{width:'300px',marginLeft:'1em'}" v-model="organizer"/>
                </div>
              </div>
              <div class="FLine" :style="{marginTop:'1em'}">
                <div style="height:100px;width:600px">
                  <span :style="{color:'red',fontSize:'22px'}">*</span>参会班级
                  <Row style="background:#eee;padding:20px">
                    <Col span="11">
                      <Card :bordered="false">
                        <p slot="title">{{classListLength}}项可选</p>
                        <CheckboxGroup v-model="getClassList" @on-change="changeClassList">
                          <div v-for="(item,index) in classList">
                            <Checkbox :label="item.class_name">{{item.class_name}}</Checkbox>
                          </div>
                        </CheckboxGroup>
                      </Card>
                    </Col>
                    <Col span="11" offset="2">
                      <Card shadow>
                        <p slot="title">{{getClassListLength}}项已选</p>
                        <div v-for="item in getClassList" :style="{marginTop:'1em'}">
                          {{item}}
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="btnGroup" :style="{marginTop:'7em'}">
                <Button type="primary" :style="{marginLeft:'1em'}" @click="sureAddMeeting">确认</Button>
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
  name: "AddMeeting",
  data() {
    return {
      meetingName: "",
      startTime: "",
      address: "",
      speaker: "",
      organizer: "",
      tab0: true,
      split1: 0.5,
      classList: [],
      getClassList: [],
      classListLength:"",
      getClassListLength:""
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    changeClassList(data) {
      this.getClassListLength=data.length;
    },
    sureAddMeeting(){
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
        const address=this.address;
        const meeting_name=this.meetingName;
        const organizer=this.organizer;
        const speaker=this.speaker;
        const start_time=new Date(this.startTime).toLocaleString();
        const class_name=this.getClassList.toString();
        this.$http.post('https://nbjzj.xin/signin/meeting/add',{
            address,
            meeting_name,
            organizer,
            speaker,
            start_time,
            class_name
        }).then(res=>{
            console.log(res);
            if(res.status=='200'){
                this.$Message.success("添加会议成功");
            }else{
                this.$Message.error("添加会议失败");
            }
        }).catch(error=>{
            console.log(error);
            this.$Message.error("添加会议失败");
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
        this.classListLength=res.data.length;
        this.getClassListLength=0;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>



