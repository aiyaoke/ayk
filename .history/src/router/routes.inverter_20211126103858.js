export default [
  {
    path: "/inverter",
    component: _ => import("@/App"),
    redirect: "/inverterIndex",
    children: [
      {
        path: "/inverterIndex",
        component: _ =>
          import(
            /* webpackChunkName: "inverterIndex" */ "@/pages/Index"
          )
      },
     
    ]
  }
];
