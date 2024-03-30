export const adminMenu = [
  {
    //Quản lý hệ thống
    name: "Sản phẩm",
    menus: [
      {
        name: "Tất cả sản phẩm",
        link: "/system/product",
      },
      {
        name: "Nhập hàng",
        link: "/system/user-redux",
      },
      {
        name: "Danh mục",
        link: "/system/category",
      },
      {
        name: "Thương hiệu",
        link: "/system/brand",
      },
      {
        name: "Khuyễn mãi",
        link: "/system/manage-promotion",
      },
    ],
  },
  {
    name: "Bài viết",
    menus: [
      {
        name: "Tất cả bài viết",
        link: "/system/post",
      },
      {
        name: "Chủ đề ",
        link: "/system/topic",
      },
      {
        name: "Trang đơn",
        link: "/system/page",
      },
    ],
  },

  {
    name: "Quản lý bán hàng",
    menus: [
      {
        name: "Tất cả đơn hàng",
        link: "/system/all-orders",
      },
      {
        name: "Xuất hàng",
        link: "/system/order-export",
      },
    ],
  },
  {
    name: "Khách hàng",
    menus: [
      {
        name: "Quản lý khách hàng",
        link: "/system/Customer",
      },
    ],
  },
  {
    name: "Liên hệ",
    menus: [
      {
        name: "Quản lý liên hệ",
        link: "/system/contract",
      },
    ],
  },
  {
    name: "Giao diện",
    menus: [
      {
        name: "Menu",
        link: "/system/menu",
      },
      {
        name: "Banner",
        link: "/system/banner",
      },
    ],
  },
  {
    name: "Hệ thống",
    menus: [
      {
        name: "Thành viên",
        link: "/system/manager-member",
      },
      {
        name: "Cấu hình",
        link: "/system/manager-config",
      },
    ],
  },
];
export const doctorMenu = [
  {
    //Quản lý user

    name: "menu.doctor.schedule",
    menus: [
      { name: "menu.doctor.manager-schedule", link: "/doctor/manage-schedule" },
      { name: "menu.doctor.manager-patient", link: "/doctor/manage-patient" },
    ],
  },
];
