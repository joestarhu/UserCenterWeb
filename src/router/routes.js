
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/account', component: () => import('pages/AccountManager.vue') },
      { path: '/org', component: () => import('pages/OrgManager.vue') },
      { path: '/role', component: () => import('pages/RoleManager.vue') },
      { path: '/app', component: () => import('pages/AppManager.vue') },
      { path: '/org_user', component: () => import('pages/OrgUserManager.vue') },
      { path: '/org_app', component: () => import('pages/OrgAppManager.vue') },
      { path: '/org_role', component: () => import('pages/OrgRoleManager.vue') },
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
