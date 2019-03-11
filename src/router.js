import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router= new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      redirect:'/College'
    },
    {
      path:'/login',
      component:()=>import('./components/login/login'),
      // beforeEnter:(to,from,next)=>{
      //   const nickname=localStorage.getItem('user_name');
      //   if(nickname) next('/College');
      //   else next();
      // }
    },
    {
      path:'/College',
      component:()=>import('./components/CollegeLevel/college'),
      redirect:'/College/CollegeIndex',
      children:[
        {
          path:'/College/CollegeIndex',
          component:()=>import('./components/CollegeLevel/CollegeView/IndexPage/CollegeIndex')
        },
        {
          path:'/MessageCenter',
          component:()=>import('./components/CollegeLevel/CollegeView/messageCenter/messageCenter')
        },
        {
          path:'/College/PeopleSetting',
          component:()=>import('./components/CollegeLevel/CollegeView/IndexPage/PeopleSetting')
        },
        {
          path:'/College/AddMeeting',
          component:()=>import('./components/CollegeLevel/CollegeView/IndexPage/AddMeeting')
        },
        {
          path:'/College/MeetDetail',
          component:()=>import('./components/CollegeLevel/CollegeView/IndexPage/MeetDetail')
        },
        {
          path:'/College/meetingSign',
          component:()=>import('./components/CollegeLevel/CollegeView/meetingSign/meetingSign')
        },
        {
          path:'/college/ImportCourse',
          component:()=>import('./components/CollegeLevel/CollegeView/ImportCourse/importCourse')
        },
        {
          path:'/college/CourseDetails',
          component:()=>import('./components/CollegeLevel/CollegeView/CourseView/courseDetails')
        },
        {
          path:'/college/CreateTeacherAccount',
          component:()=>import('./components/CollegeLevel/CollegeView/EntryInformation/createTeacherAccount')
        },
        {
          path:'/college/CreateStudentAccount',
          component:()=>import('./components/CollegeLevel/CollegeView/EntryInformation/createStudentAccount')
        },
        {
          path:'/college/setting',
          component:()=>import('./components/CollegeLevel/CollegeView/setting/setting')
        }
      ]
    }
  ]
})

// router.beforeEach((to,from,next)=>{
//   const nickname=localStorage.getItem('user_name');
//   if(!nickname && to.path!=='/login') next('/login');
//   else next();
// })

export default router;