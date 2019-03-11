<template>
    <div class="SigningMeet">
        <div class="panel">
            <Tabs size="small">
                <TabPane label="正在签到课程">标签一的内容</TabPane>
                <TabPane label="待签到课程">标签二的内容</TabPane>
                
            </Tabs>
            <span class="more">
                更多
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name:'SigningMeet'
}
</script>
<style scoped>
.SigningMeet {
  min-width:600px;
  width:50%;
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
  margin: -65px 30em;
  color: rgb(42, 144, 212);
  cursor: pointer;
}
@media screen and (min-width:1450px) {
  .more{
    position: absolute;
    margin: -65px 35rem;
  }
}
</style>
