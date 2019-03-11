<template>
    <div class="CollegeIndex">
        <Breadcrumb :style="{margin: '15px 0'}">
           <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                <TabPane label="首页" v-if="tab0">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <IndexWatchData />
                        <div class="ColleageIndexSignCourse">
                          <IndexSigningMeet />
                        </div>
                        <div class="ColleageIndexSignIngSituation">
                          <IndexSignSituation />
                        </div>
                    </Content> 
                </TabPane>
            </Tabs>
        </Breadcrumb>
    </div>
</template>
<script>
import IndexWatchData from './IndexChildComponents/IndexWatchData'
import IndexSigningMeet from './IndexChildComponents/IndexSigningMeet'
import IndexSignSituation from './IndexChildComponents/IndexSignSituation'
export default {
  name: "CollegeIndex",
  data() {
    return {
      tab0: true,
      tab1: true,
      tab2: true
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    }
  },
  components:{
    IndexWatchData,
    IndexSigningMeet,
    IndexSignSituation
  }
};
</script>
<style scoped>
.ColleageIndexSignCourse{
 
  margin-top: 3em;
}
</style>


