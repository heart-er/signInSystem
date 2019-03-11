<template>
    <div class="college">
        <Layout>
            <TopNavbar/>
            <LeftNavbar/>
        </Layout>
    </div>
</template>
<script>
import TopNavbar from './Content/TopNavbar'
import LeftNavbar from './Content/leftNavbar'
export default {
  name: "college",
  components:{
      TopNavbar,
      LeftNavbar
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-left: 20px;
}
.layout-rightNav{
    width: 120px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>


