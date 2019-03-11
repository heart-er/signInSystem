<template>
    <div class="Login">
        <img id="image" src="../../assets/lgBackground.jpg">
        <div class="login" id="box">
            <h2 class="title">签到管理系统登录界面</h2>
            <div class="loginContent" style="margin-top:3em;">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" style="width:300px;">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit" long>登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="loadingTask" v-show="showLoading">
            <Row>
                <Col class="demo-spin-col" >
                    <Spin fix>
                        <Icon type="ios-loading" size=60 class="load"></Icon>
                        <div>Loading</div>
                    </Spin>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      showLoading:false,
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      const user_number=this.formInline.user;
      const password=this.$md5(this.formInline.password);
      this.$http.post('https://nbjzj.xin/signin/login/dologin',{
        user_number,
        password
      }).then(res=>{
        console.log(res);
        if(res.status=='200'){
          localStorage.setItem("user_name",res.data.user_name);
          localStorage.setItem('academy_id',res.data.academy_name);
          this.$store.dispatch('loginGetUserId',res.data.user_id);
          this.$store.dispatch('loginGetAcademyName',res.data.academy_name);
          this.$store.dispatch('loginGetAcademyId',res.data.academy_id);
          this.showLoading=true;
          setTimeout(()=>{
             this.$Message.success("登录成功!");
            this.$router.push('/College');
          },1000)
        }else{
          this.showLoading=true;
          setTimeout(()=>{
              this.$Message.error("账号或密码错误!");
              this.showLoading=false;
          },1000)
        }

      }).catch(error=>{
        console.log(error);
        
          this.showLoading=true;
          setTimeout(()=>{
             this.$Message.error("账号或密码错误!");
             this.showLoading=false;
          },1000)
      })
      
    }
  }
};
</script>

<style scoped>
.load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loadingTask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  margin-top: 360px;
}
#image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(5px);
}
.loginContent {
  margin: 20px;
}
#box {
  text-align: center !important;
  padding: 30px;
  width: 400px;
  height: 300px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  top: 20%;
  bottom: 0;
  margin: 0 auto;
}
.title {
  word-break: break-word;
  font-weight: inherit;
  vertical-align: middle;
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
}
.button.is-primary {
  background-color: #666161;
  border-color: transparent;
  color: #fff;
  width: 100px;
  height: 40px;
  font-size: 21px;
  margin-top: 1.5em;
}
.button.is-primary:hover,
.button.is-primary.is-hovered {
  background-color: #333636;
  border-color: transparent;
  color: #fff;
}
.button.is-primary:focus,
.button.is-primary.is-focused {
  border-color: transparent;
  color: #fff;
}
</style>

