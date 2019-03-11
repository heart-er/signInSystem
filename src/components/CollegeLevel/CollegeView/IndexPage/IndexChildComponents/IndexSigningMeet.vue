<template>
    <div class="IndexSigningMeet">
        <div class="IndexSigningMeetLeft">
            <SigningCourse />
            <div class="signMeet">
                <SigningMeet />
            </div>
        </div>
    </div>
</template>
<script>
import SigningCourse from './IndexSignMeet/SigningCourse'
import SigningMeet from './IndexSignMeet/SigningMeet'
export default {
    name:'IndexSigningMeet',
    components:{
        SigningCourse,
        SigningMeet
    }
}
</script>
<style scoped>
.IndexSigningMeetLeft{
    display: flex;
}
.signMeet{
    margin-left: 2em;
}
</style>


