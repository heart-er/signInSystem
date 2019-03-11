<template>
    <div class="leftNavbar">
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu @on-select="routeTo" theme="light" width="auto" >
                    <Submenu name="1">
                        <template  slot="title">
                            <Icon type="md-clipboard" />
                            会议签到
                        </template>
                        <MenuItem name="/college/AddMeeting">添加会议</MenuItem>
                        <MenuItem name="/college/MeetDetail">会议详情</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-list-box" />
                            课程概况
                        </template>
                        <MenuItem name="/College/meetingSign">签到明细</MenuItem>
                        <MenuItem name="/college/ImportCourse">课程导入</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                         <template slot="title">
                          <Icon type="ios-log-in" />
                        信息录入
                         </template>
                        <MenuItem name="/college/CreateTeacherAccount">创建教师账号</MenuItem>
                        <MenuItem name="/college/CreateStudentAccount">学生信息导入</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template  slot="title">
                        <Icon type="md-settings" />
                            系统设置
                        </template>
                        <MenuItem name="/college/setting">类型配置</MenuItem>
                        <MenuItem name="/college/PeopleSetting">人员配置</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <router-view></router-view>
                </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
  name: "leftNavbar",
  methods: {
    routeTo(e) {
      this.$router.push(e);
    }
  }
};
</script>
<style scoped>
</style>


