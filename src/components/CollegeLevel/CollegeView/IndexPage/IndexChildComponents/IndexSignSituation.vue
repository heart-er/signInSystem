<template>
    <div class="IndexSignIngSituation">
        <div class="leftSituation">
            <IndexSignCourseRank />
        </div>
        <div class="rightSituation">
            <IndexSignTrend />
        </div>
    </div>
</template>
<script>
import IndexSignCourseRank from "./IndexSignSituationTable/IndexSignCourseRank";
import IndexSignTrend from "./IndexSignSituationTable/IndexSignTrend";
export default {
  name: "IndexSignIngSituation",
  components: {
    IndexSignCourseRank,
    IndexSignTrend
  }
};
</script>
<style scoped>
.IndexSignIngSituation {
  display: flex;
}
.leftSituation {
  margin-top: 3em;
  min-width: 500px;
  max-width: 600px;
  width: 50%;
  border: 1px solid rgb(201, 198, 198);
  height: auto;
}
.rightSituation {
  margin-left: 2em;
  margin-top: 3em;
  min-width: 500px;
  max-width: 600px;
  width: 50%;
  border: 1px solid rgb(201, 198, 198);
  height: auto;
}
</style>


