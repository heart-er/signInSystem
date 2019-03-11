<template>
    <div class="IndexWatchData">
        <div class="leftInformation">
            <div class="left">
                <div v-for="left in leftLefts" class="leftChildrenInformation">
                   <div class="content" @click="goPath(left.path)">
                        <img :src="left.img"><span class="leftTitle">{{left.title}}</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div v-for="right in leftRights" class="rightChildrenInformation">
                    <div class="content" @click="goPath(right.path)">
                        <img :src="right.img"><span class="leftTitle">{{right.title}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="rightInformation">
            <div class="data" v-for="right in rightData">
                <div class="rightContent"  style="text-align:center">
                    <span>{{right.number}}</span><br>
                    <span>{{right.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "IndexWatchData",
  data() {
    return {
      leftLefts: [
        {
          img: require("@/assets/u47.png"),
          title: "会议签到",
          path:'/College/meetingSign'
        },
        {
          img: require("@/assets/u47.png"),
          title: "新增学生",
          path:'/college/CreateStudentAccount'
        }
      ],
      leftRights: [
        {
          img: require("@/assets/u47.png"),
          title: "新增会议",
          path:'/college/AddMeeting'
        },
        {
          img: require("@/assets/u47.png"),
          title: "新增课程",
          path:'/college/ImportCourse'
        }
      ],
      rightData: [
        {
          title: "学生总人数",
          number: 27362
        },
        {
          title: "教师总人数",
          number: 27362
        },
        {
          title: "课程总数",
          number: 27362
        },
        {
          title: "平均签到率",
          number: 27362
        },
        {
          title: "逃课率最高课程",
          number: '计算机组成'
        },
        {
          title: "逃课率最高班级",
          number: '网络182'
        }
      ]
    };
  },
  methods:{
    goPath(path){
      this.$router.push(path);
    }
  }
};
</script>
<style scoped>
.IndexWatchData{
    display: flex;
}
.leftTitle {
  vertical-align: 45%;
  margin-left: 6px;
}
.leftInformation {
  display: flex;
  flex: 1;
}
.left {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.leftChildrenInformation {
  margin-top: 1em;
  border: 1px solid rgb(194, 189, 189);
  cursor: pointer;
  height: 56px;
}
.leftChildrenInformation:first-child{
  margin-top: 0px;
}
.content {
  margin: 5px 15px;
}
.right {
  margin-left: 1em;
  flex: 1;
}
.rightChildrenInformation {
  margin-top: 1em;
  border: 1px solid rgb(194, 189, 189);
  cursor: pointer;
    height: 56px;
}
.rightChildrenInformation:first-child{
  margin-top: 0px;
}
.rightInformation{
    display: flex;
    flex: 2;
}
.data{
    flex: 1;
    border: 1px solid rgb(194, 189, 189);
    margin-left: 2em;
    align-items: center;
    justify-content: center;
}
.rightContent{
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>


