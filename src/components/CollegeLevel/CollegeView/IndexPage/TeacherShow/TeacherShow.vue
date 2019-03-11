<template>
  <div class="TeacherShow">
    <div class="firstHeader" :style="{display:'flex',justifyContent:'space-between'}">
      <div class="buttonGroup">
        <!-- <Button type="default">添加</Button>
        <Button type="default" :style="{marginLeft:'0.4em'}">删除</Button> -->
      </div>
    </div>
    <div class="tableData">
      <Table border :style="{marginTop:'1em'}" ref="selection" :columns="columns4" :data="data1"></Table>
      <Page :total="10" :style="{marginTop:'1em'}" show-elevator/>
    </div>
  </div>
</template>
<script>
export default {
  name: "TeacherShow",
  data() {
    return {
      majorList: [],
      courseList: [],
      columns4: [
        {
          title: "工号",
          key: "user_number"
        },
        {
          title: "姓名",
          key: "user_name"
        },
        {
          title: "性别",
          key: "gender"
        },
        {
          title: "职称",
          key: "title"
        },
        {
          title: "状态",
          key: "isdelete",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                //数据库1是已处理，0是未处理
                props: {
                  type: "primary",
                  value: params.isdelete=='false' //控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                  marginRight: "5px"
                },
              })
            ]);
          }
        },
        {
          title: "启用时间",
          key: "create_time"
        }
      ],
      data1: []
    };
  },
  mounted() {
    const academy_id = this.$store.getters.getNowUserAcademyId;
    this.$http
      .get("https://nbjzj.xin/signin/user/teacher/academy_id/" + academy_id, {
        academy_id
      })
      .then(res => {
        console.log(res);
        if (res.status == "200") {
          this.data1 = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

