<template>
    <div class="peopleSetting">
        <Breadcrumb :style="{margin: '15px 0'}">
           <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                <TabPane label="人员配置" v-if="tab0">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <Tabs type="card">
                            <TabPane label="按教师显示">
                               <TeacherShow/>
                            </TabPane>
                            <TabPane label="按学生显示">
                                <StudentShow />
                            </TabPane>
                        </Tabs>
                    </Content> 
                </TabPane>
            </Tabs>
        </Breadcrumb>
        
    </div>
</template>
<script>
import TeacherShow from './TeacherShow/TeacherShow'
import StudentShow from './StudentShow/StudentShow'
export default {
  name: "peopleSetting",
  data(){
      return{
           tab0: true,
      }
  },
  methods:{
      handleTabRemove(name) {
      this["tab" + name] = false;
    }
  },
  components:{
      StudentShow,
      TeacherShow
  }
};
</script>


