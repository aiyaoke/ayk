export default [
  {
    path: "/system",
    component: _ =>
      import(/* webpackChunkName: "system" */ "@/pages/Layout"),
    children: [
      {
        path: "/system/status",
        meta: {
          name: "状态",
          icon: "icon-chanpinzonglan"
        },
        component: _ =>
          import(/* webpackChunkName: "status" */ "@/pages/Status")
      },
      {
        path: "/system/chart",
        meta: {
          name: "图表",
          icon: "icon-tubiao1"
        },
        component: _ =>
          import(/* webpackChunkName: "chart" */ "@/pages/Chart")
      },
      {
        path: "/system/reset",
        meta: {
          name: "恢复出厂设置",
          icon: "icon-shezhi"
        }
      },
      {
        path: "/system/alarm",
        component: _ =>
          import(/* webpackChunkName: "Alarm" */ "@/pages/Alarm"),
        meta: {
          name: "报警",
          icon: "icon-lingdang"
        },
        redirect: "/system/alarm/search",
        children: [
          {
            path: "/system/alarm/search",
            code: 'U',
            meta: {
              name: "报警查询"
            },
            component: _ =>
              import(
                /* webpackChunkName: "AlarmSearch" */ "@/pages/Alarm/AlarmSearch"
              )
          },
          {
            path: "/system/alarm/config",
            code: 'V',
            meta: {
              name: "报警配置"
            },
            component: _ =>
              import(
                /* webpackChunkName: "AlarmConfig" */ "@/pages/Alarm/AlarmConfig"
              )
          }
        ]
      }
    ]
  }
];
