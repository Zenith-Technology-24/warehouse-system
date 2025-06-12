import { u as useToast, j as jsxRuntimeExports, s as siteConfig, N as NavLink, r as reactExports, a as useNavigate, b as useLocation, O as Outlet } from "./index-BwJeGL0w.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { s as session } from "./authApi-C5_1U8LT.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { a as apiService } from "./axios-DSoLq97m.js";
import "./utils-QRJGL1kX.js";
const Sidebar = ({ isOpen }) => {
  const { showToast } = useToast();
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => session()
  });
  const handleLogout = () => {
    localStorage.removeItem("user");
    showToast(
      "Logged Out Successfully!",
      "",
      "success"
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-screen sticky top-0 overflow-hidden transition-all shadow-lg duration-300 !z-10 ${isOpen ? "w-64 flex-none" : "w-20"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col items-center justify-center duration-300`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center px-3 pt-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: siteConfig.logo, alt: "Vite Logo" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "w-full text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 px-3 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NavLink,
        {
          to: "/",
          className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" }) }),
            isOpen && "Dashboard"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NavLink,
        {
          to: "/inventory",
          className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 0.5, stroke: "currentColor", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M5.616 21q-.672 0-1.144-.472T4 19.385V8.263q-.43-.178-.715-.577Q3 7.286 3 6.769V4.615q0-.67.472-1.143Q3.944 3 4.616 3h14.769q.67 0 1.143.472q.472.472.472 1.144v2.153q0 .517-.285.916q-.284.4-.715.578v11.122q0 .67-.472 1.143q-.472.472-1.143.472zM5 8.385v10.904q0 .307.221.509T5.77 20h12.616q.269 0 .442-.173t.173-.442v-11zm-.385-1h14.77q.269 0 .442-.173T20 6.769V4.616q0-.27-.173-.443T19.384 4H4.616q-.27 0-.443.173T4 4.616v2.153q0 .27.173.442q.173.173.443.173m4.769 5.482h5.23V12h-5.23zM12 14.192" }) }),
            isOpen && "Inventory"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NavLink,
        {
          to: "/receipt",
          className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 0, stroke: "currentColor", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M3 5.25A2.25 2.25 0 0 1 5.25 3h9.5A2.25 2.25 0 0 1 17 5.25V14h4v3.75A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75zM17 19.5h.75a1.75 1.75 0 0 0 1.75-1.75V15.5H17zM5.25 4.5a.75.75 0 0 0-.75.75v12.5c0 .966.784 1.75 1.75 1.75h9.25V5.25a.75.75 0 0 0-.75-.75zm2 2.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zm-.75 4.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75M7.25 15a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z" }) }),
            isOpen && "Receipt"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NavLink,
        {
          to: "/issuance",
          className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01" })
            ] }) }),
            isOpen && "Issuance"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NavLink,
        {
          to: "/return-of-items",
          className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", d: "M20.198 3.002H3.802c-.75 0-1.126 0-1.386.177a1 1 0 0 0-.31.338c-.153.273-.116.64-.041 1.376c.125 1.228.187 1.842.513 2.28c.163.22.369.403.606.54c.476.277 1.102.277 2.355.277h12.922c1.253 0 1.879 0 2.355-.277c.237-.137.443-.32.606-.54c.326-.438.388-1.052.513-2.28c.075-.736.112-1.103-.04-1.376a1 1 0 0 0-.311-.338c-.26-.177-.636-.177-1.386-.177m-10.198 8h4m.539 4.976l2.727-.053c1.086-.02 3.237.247 3.237 2.503c0 2.34-2.249 2.57-3.262 2.57H8.05c-2.128 0-5.048-.472-5.048-4.488V7.997m11.536 7.981a.77.77 0 0 1 .232-.538l1.714-1.454m-1.946 1.992a.77.77 0 0 0 .234.579l1.712 1.414m4.495-9.974v5.028", color: "currentColor" }) }),
            isOpen && "Return of Items"
          ]
        }
      ) }),
      data?.user?.roles[0].name === "superadmin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          NavLink,
          {
            to: "/manage-users",
            className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", d: "M17.928 19.634h2.138a1.165 1.165 0 0 0 1.116-1.555a6.85 6.85 0 0 0-6.117-3.95m0-2.759a3.664 3.664 0 0 0 3.665-3.664a3.664 3.664 0 0 0-3.665-3.674m-1.04 16.795a1.908 1.908 0 0 0 1.537-3.035a8.03 8.03 0 0 0-6.222-3.196a8.03 8.03 0 0 0-6.222 3.197a1.909 1.909 0 0 0 1.536 3.034zM9.34 11.485a4.16 4.16 0 0 0 4.15-4.161a4.151 4.151 0 0 0-8.302 0a4.16 4.16 0 0 0 4.151 4.16" }) }),
              isOpen && "Manage Users"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          NavLink,
          {
            to: "/activity-logs",
            className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m-.007 4.648a.75.75 0 0 0-1.493.102v6l.007.102a.75.75 0 0 0 .743.648h4l.102-.007A.75.75 0 0 0 15.25 12H12V6.75z" }) }),
              isOpen && "Activity Logs"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NavLink,
        {
          to: "/settings",
          state: data,
          className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" })
            ] }),
            isOpen && "Account Settings"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NavLink,
        {
          to: "/l",
          onClick: () => handleLogout(),
          className: ({ isActive }) => `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? "bg-aaa text-white hover:text-white" : "hover:bg-aaa hover:text-white"} block`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: `${isOpen ? "size-5" : "size-6 m-auto"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" }) }),
            isOpen && "Log Out"
          ]
        }
      ) })
    ] }) })
  ] }) });
};
const Clock = () => {
  const [currentTime, setCurrentTime] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const formattedTime = currentTime.toLocaleTimeString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-medium text-lg text-aaa opacity-80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z", clipRule: "evenodd" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formattedTime })
  ] });
};
const fetchNotifications = async ({ userId }) => {
  const { data } = await apiService.get(`/notification/${userId}`);
  return data;
};
const readNotification = async (id) => {
  const { data } = await apiService.put(`/notification/${id}`);
  return data;
};
const deleteNotification = async (id) => {
  const { data } = await apiService.delete(`/notification/delete/${id}`);
  return data;
};
const deleteAllNotification = async (userId) => {
  const { data } = await apiService.delete(`/notification/delete-all/${userId}`);
  return data;
};
const NotificationDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useToast();
  const { data: auth } = useQuery({
    queryKey: ["session"],
    queryFn: () => session()
  });
  const { data: notifications, refetch: refetchNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications({ userId: auth?.user?.id }),
    enabled: !!auth
  });
  reactExports.useEffect(() => {
    if (auth?.user?.id) {
      refetchNotifications();
    }
  }, [location.pathname]);
  const read = useMutation({
    mutationFn: (id) => {
      return readNotification(id);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const _delete = useMutation({
    mutationFn: (id) => {
      return deleteNotification(id);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const deleteAll = useMutation({
    mutationFn: (userId) => {
      return deleteAllNotification(userId);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const [open, setOpen] = reactExports.useState(false);
  const dropdownRef = reactExports.useRef(null);
  const checkTitle = (notification) => {
    if (notification.title === "Low Stock Alert") navigate("/inventory/view", { state: { id: notification?.dataId } });
    else if (notification.title === "Issuance Validity Reminder") navigate("/issuance/view", { state: { id: notification?.dataId } });
    else navigate("/receipt/view", { state: { id: notification?.dataId } });
    read.mutate(notification.id);
    setOpen(false);
    refetchNotifications();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row gap-3 h-full m-auto items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setOpen(!open), className: "relative cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "m-auto", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "none", stroke: "gray", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" }) }),
      notifications?.filter((n) => !n.read).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0 rounded-full", children: notifications.filter((n) => !n.read).length })
    ] }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: dropdownRef, className: "absolute z-10 top-full right-0 mt-2 w-[400px] bg-white rounded-xl shadow-lg p-4 border border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2 text-gray-600", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            onClick: () => {
              deleteAll.mutate(notifications[0].userId);
              refetchNotifications();
            },
            className: "text-xs mb-2 text-gray-600 cursor-pointer hover:underline",
            children: "Clear All"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-[300px] overflow-y-auto space-y-2 text-sm text-gray-600", children: notifications.length > 0 ? notifications.map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { onClick: () => checkTitle(notification), className: `hover:bg-gray-100 p-2 rounded flex justify-between items-center cursor-pointer ${notification.read ? "opacity-50" : "opacity-100"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "m-auto", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "none", stroke: "gray", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-500", children: notification.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: notification.message })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onClick: (e) => {
              e.stopPropagation();
              _delete.mutate(notification.id);
              refetchNotifications();
            },
            className: "rounded-full hover:bg-gray-200 p-1",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" }) })
          }
        )
      ] })) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: `p-2 rounded flex justify-between items-center cursor-pointer`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center m-auto text-xs text-gray-400", children: "No notification was found." }) }) })
    ] })
  ] });
};
const Topbar = ({ toggleSidebar }) => {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => session()
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 text-white bg-white shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[70px] flex items-center justify-between mx-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { onClick: toggleSidebar, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-10 text-black cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationDropdown, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-12 h-12 rounded-full border-4 border-gray-400 overflow-hidden flex items-center justify-center bg-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "white",
          className: "w-10 h-10 scale-100",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              fillRule: "evenodd",
              d: "M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z",
              clipRule: "evenodd"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-aaa font-semibold", children: [
          data?.user?.firstname,
          " ",
          data?.user?.lastname
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm text-right", children: data?.user?.roles?.[0].name })
      ] })
    ] })
  ] }) });
};
const Pagelayout = () => {
  const [isOpen, setIsOpen] = reactExports.useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { isOpen, toggleSidebar }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Topbar, { isOpen, toggleSidebar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "p-6 w-full space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
};
export {
  Pagelayout as default
};
