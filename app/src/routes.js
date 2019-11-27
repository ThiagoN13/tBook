import mainPage from './pages/main'
import aboutPage from './pages/about'
import feedbackPage from './pages/feedback'
import languagePage from './pages/language'
import profilePage from './pages/profile'
import messagePage from './pages/message'
import loginPage from './pages/login'
import postPage from './pages/post'
import signUp from './pages/signup'

export default [
  {
    path: '/',
    component: loginPage,
  },
  {
    path: '/main',
    component: mainPage,
  },
  {
    path: '/signup',
    component: signUp,
  },
  {
    path: '/profile/',
    component: profilePage
  },
  {
    path: '/language/',
    component: languagePage
  },
  {
    path: '/feedback/',
    component: feedbackPage
  },
  {
    path: '/about/',
    component: aboutPage
  },
  {
    path: '/message/',
    component: messagePage
  },
  {
    path: '/post/',
    component: postPage
  }
]
