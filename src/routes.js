import HomePage from './Page/HomePage'
import ListPage from './Page/ListPage'
import AdminPage from './Page/AdminPage'
import CreatePage from './Page/CreatePage'
import EditPage from './Page/EditPage'
import ShowPage from './Page/ShowPage'

const routers = [
  {
    path:'/',
    component: HomePage
  },
  {
    path:'/blogs',
    component: ListPage
  },
  {
    path:'/Admin',
    component: AdminPage
  },
  {
    path:'/blogs/create',
    component: CreatePage
  },
  {
    path:'/blogs/:id/edit',
    component: EditPage
  },
  {
    path:'/blogs/:id',
    component: ShowPage
  },
]

export default routers;