<template>
    <div class="messageCenter">
        <Breadcrumb :style="{margin: '15px 0'}">
           <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                <TabPane label="消息中心" v-if="tab0">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <div class="downLoadMessage">
                            <div :style="{display:'flex',justifyContent:'space-between',cursor:'pointer'}">
                                <p :style="{color:'#87CEFA'}">2018年8月各学院签到情况报告</p>
                                <span>2018年8月</span>
                            </div>
                            <Divider />
                            <div :style="{display:'flex',justifyContent:'space-between',cursor:'pointer'}">
                                <p :style="{color:'#87CEFA'}">2018年8月各学院签到情况报告</p>
                                <span>2018年8月</span>
                            </div>
                            <Divider />
                            <div :style="{display:'flex',justifyContent:'space-between',cursor:'pointer'}">
                                <p :style="{color:'#87CEFA'}">2018年8月各学院签到情况报告</p>
                                <span>2018年8月</span>
                            </div>
                            <Divider />
                            <div :style="{display:'flex',justifyContent:'space-between',cursor:'pointer'}">
                                <p :style="{color:'#87CEFA'}">2018年8月各学院签到情况报告</p>
                                <span>2018年8月</span>
                            </div>
                            <Divider />
                        </div>
                        <div >
                            <Page :total="1" show-elevator />
                        </div>
                    </Content> 
                </TabPane>
            </Tabs>
        </Breadcrumb>
    </div>
</template>
<script>
export default {
  name: "messageCenter",
  data() {
    return {
      tab0: true
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    }
  }
};
</script>


