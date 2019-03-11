<template>
    <div class="SigningCourse">
        <div class="panel">
            <Tabs size="small">
                <TabPane label="正在签到会议">标签一的内容</TabPane>
                <TabPane label="待签到会议">标签二的内容</TabPane>
            </Tabs>
            <span class="more">
                更多
            </span>
        </div>
        
    </div>
</template>
<script>
export default {
  name: "SigningCourse"
};
</script>
<style scoped>
.SigningCourse {
  min-width: 500px;
  max-width: 600px;
  width: 50%;
  height: 300px;
  border: 1px solid rgb(201, 198, 198);
}

.panel {
  position: relative;
  width: auto;
}
.more {
  width: 100px;
  position: absolute;
  margin: -65px 31em;
  color: rgb(42, 144, 212);
  cursor: pointer;
}
@media screen and (min-width: 1450px) {
  .more {
    position: absolute;
    margin: -65px 33rem;
  }
}
</style>


