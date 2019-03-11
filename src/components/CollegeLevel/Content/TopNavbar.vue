<template>
        <header>
            <Menu mode="horizontal" theme="primary">
                <div class="layout-nav">
                    <MenuItem name="1">
                        <img src="~@/assets/logo.png" class="ivu-icon ivu-icon-ios-hand-outline" style="font-size:50px;" alt="">
                        签到系统
                    </MenuItem>
                </div>
                <div class="layout-rightNav" >
                    <!-- <MenuItem name="2">
                        <Input suffix="ios-search" @keyup.enter.native="searchClass" v-model="searchClassName"  placeholder="输入班级搜索相关信息" style="width: auto" />
                    </MenuItem> -->
                    <MenuItem name="2">
                        <div class="infor" v-if="getInforNumber>0">
                            <!-- 显示通知数字 -->
                            <span id="inforNumber">{{getInforNumber}}</span>
                        </div>
                        <Icon type="ios-mail-outline" size="40" />
                        <span @click="GoMessageCenter">消息中心</span>
                    </MenuItem>
                    <MenuItem name="3" >
                        <span v-if="username" @mouseover="onMouseOver" 
                        >
                            {{username}} 欢迎你
                        </span>
                        <span v-if="!username">
                            登录用户
                        </span>
                    </MenuItem>
                    <div class="hoverLogin"  @mouseover="onMouseOver" @mouseout="onMouseOut" v-if="isShow"
                        style="position:absolute;width:100px;background:#CCCCCC;height:30px;margin:60px 160px;text-align:center;color:white"
                    >
                        <div class="width:60px;height:20px;margin-left:30px;">
                            <div style="margin-top:-15px" class="logOut" @click="logOut">
                                退出
                            </div>
                        </div>
                    </div>
                </div>
                
            </Menu>
        </header>
</template>
<script>
export default {
  name: "Topnavbar",
  data() {
    return {
      getInforNumber: 15,
      username: "",
      isShow: false,
      searchClassName:"",
    };
  },
  methods: {
    GoMessageCenter() {
      this.$router.push("/MessageCenter");
    },
    onMouseOver() {
      this.isShow = true;
    },
    onMouseOut() {
      this.isShow = false;
    },
    logOut(){
        this.$http.post('https://nbjzj.xin/signin/login/logout',{
            withCredentials:'true'
        }).then(res=>{
            console.log(res)
            if(res.status=='200'){
                localStorage.setItem("user_name","");
                this.$Message.success("登出成功!");
                this.$router.push('/login');
            }
        }).catch(error=>{
            console.log(error);
            this.$Message.success("请重新登录!");
        })
    }
  },
  mounted() {
    this.username = localStorage.getItem("user_name");
  }
};
</script>
<style scoped>
header {
  height: 62px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-left: 20px;
}
.layout-rightNav {
  width: 400px;
  margin: 0 auto;
  margin-right: 0px;
}
.infor {
  width: 26px;
  height: 16px;
  background: red;
  position: absolute;
  border-radius: 5px;
  margin: 10px 20px;
  border: 1px solid white;
}
#inforNumber {
  position: absolute;
  margin-top: -23px;
}
.goUpdatePassword:hover {
  text-decoration: underline;
  cursor: pointer;
}
.logOut:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>


