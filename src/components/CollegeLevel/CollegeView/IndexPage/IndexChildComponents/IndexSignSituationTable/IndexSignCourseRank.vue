<template>
    <div class="IndexSignCourseRank">
        <div class="rankTitle">
            <img src="@/assets/u100.png">
            <span id="smallTitle">课程签到情况排名</span>
        </div>
        <div class="signRate">
            <table class="table">
                <thead>
                    <tr>
                        <th>班级</th>
                        <th>签到率</th>
                        <th>总人数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>网络181</td>
                        <td>98%</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>网络181</td>
                        <td>98%</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>网络181</td>
                        <td>98%</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>网络181</td>
                        <td>98%</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>网络181</td>
                        <td>98%</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>网络181</td>
                        <td>98%</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>网络181</td>
                        <td>98%</td>
                        <td>40</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  name: "IndexSignCourseRank"
};
</script>
<style scoped>
.rankTitle {
  margin: 8px 10px;
}
#smallTitle {
  font-size: 15px;
  margin-left: 6px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
hr {
  width: 100%;
}
th,
td {
  width: 30%;
  text-align: center;
}
tr {
  border-bottom: 1px solid rgb(240, 235, 235);
  height: 35px;
}
</style>


