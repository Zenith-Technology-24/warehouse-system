import { j as jsxRuntimeExports, r as reactExports, u as useToast } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { c as create$6, u as useFormik, a as create$3 } from "./index.esm-DNsBvjPq.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { s as session } from "./authApi-C5_1U8LT.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { a as apiService } from "./axios-DSoLq97m.js";
import "./utils-QRJGL1kX.js";
const SettingsProfile = ({ schema }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "first_name", children: "First Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          name: "first_name",
          value: schema.values.first_name,
          onChange: schema.handleChange,
          type: "text",
          id: "first_name",
          className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
          placeholder: "Enter First Name",
          required: true
        }
      ),
      schema.errors.first_name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-500", children: schema.errors.first_name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "last_name", children: "Last Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          name: "last_name",
          value: schema.values.last_name,
          onChange: schema.handleChange,
          type: "text",
          id: "last_name",
          className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
          placeholder: "Enter Last Name",
          required: true
        }
      ),
      schema.errors.last_name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-500", children: schema.errors.last_name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "username", children: "Username" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          name: "username",
          value: schema.values.username,
          onChange: schema.handleChange,
          type: "text",
          id: "username",
          className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
          placeholder: "Enter Username"
        }
      ),
      schema.errors.username && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-500", children: schema.errors.username })
    ] })
  ] });
};
const SettingsPassword = ({ schema }) => {
  const [currentType, setCurrentType] = reactExports.useState("password");
  const [newType, setNewType] = reactExports.useState("password");
  const [confirmType, setConfirmType] = reactExports.useState("password");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "current_password", children: "Current Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "current_password",
            value: schema.values.current_password,
            onChange: schema.handleChange,
            type: currentType,
            id: "current_password",
            className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md w-full",
            placeholder: "Enter Current Password",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3", children: currentType === "password" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { onClick: () => setCurrentType("text"), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5 text-gray-700 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z", clipRule: "evenodd" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { onClick: () => setCurrentType("password"), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5 text-gray-700 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", clipRule: "evenodd" })
        ] }) })
      ] }),
      schema.errors.current_password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-500", children: schema.errors.current_password })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "new_password", children: "New Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "new_password",
            value: schema.values.new_password,
            onChange: schema.handleChange,
            type: newType,
            id: "new_password",
            className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md w-full",
            placeholder: "Enter New Password",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3", children: newType === "password" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { onClick: () => setNewType("text"), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5 text-gray-700 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z", clipRule: "evenodd" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { onClick: () => setNewType("password"), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5 text-gray-700 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", clipRule: "evenodd" })
        ] }) })
      ] }),
      schema.errors.new_password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-500", children: schema.errors.new_password })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "confirm_password", children: "Confirm Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "confirm_password",
            value: schema.values.confirm_password,
            onChange: schema.handleChange,
            type: confirmType,
            id: "confirm_password",
            className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md w-full",
            placeholder: "Enter Confirm Password",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3", children: confirmType === "password" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { onClick: () => setConfirmType("text"), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5 text-gray-700 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z", clipRule: "evenodd" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { onClick: () => setConfirmType("password"), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5 text-gray-700 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", clipRule: "evenodd" })
        ] }) })
      ] }),
      schema.errors.confirm_password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-500", children: schema.errors.confirm_password })
    ] })
  ] });
};
const updateUser = async (props) => {
  const res = await apiService.put(`/auth/user/update`, {
    firstname: props?.first_name,
    lastname: props?.last_name,
    username: props?.username,
    current_password: props?.current_password,
    password: props?.new_password,
    confirm_password: props?.confirm_password
  });
  return res;
};
const Settings = () => {
  const { showToast } = useToast();
  const [status, setStatus] = reactExports.useState("profile");
  const { data, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: () => session()
  });
  const VALIDATION_SCHEMA = {
    first_name: status === "profile" && create$6().required("First name is required"),
    last_name: status === "profile" && create$6().required("Last name is required"),
    username: status === "profile" && create$6().required("Username is required"),
    current_password: status === "password" && create$6().required("Current password is required"),
    new_password: status === "password" && create$6().required("New password is required"),
    confirm_password: status === "password" && create$6().required("Confirm password is required")
  };
  const schema = useFormik({
    validateOnMount: false,
    initialValues: {
      first_name: data?.user?.firstname,
      last_name: data?.user?.lastname,
      username: data?.user?.username,
      current_password: "",
      new_password: "",
      confirm_password: ""
    },
    validationSchema: create$3(VALIDATION_SCHEMA),
    onSubmit(values) {
      updateProfileMutation.mutate({ ...values, id: data?.user?.id });
    }
  });
  reactExports.useEffect(() => {
    schema.setFieldValue("first_name", data?.user?.firstname);
    schema.setFieldValue("last_name", data?.user?.lastname);
    schema.setFieldValue("username", data?.user?.username);
  }, [data]);
  const updateProfileMutation = useMutation({
    mutationFn: (values) => updateUser(values),
    onError: (error) => {
      console.error(error);
      showToast(
        "User Updated Unsuccessfully!",
        error.response.data.message,
        "error"
      );
    },
    onSuccess: () => {
      showToast(
        "User Updated Successfully!",
        "User profile has been updated to the system.",
        "success"
      );
      refetch();
    }
  });
  const checkIfActive = (value) => {
    return value === status && "border-b-2 border-black";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Settings", description: "Manage your account settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopButtons, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { text: "Save", onClick: schema.handleSubmit }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2 text-center text-lg text-gray-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("profile"), className: `${checkIfActive("profile")} w-24 py-2 cursor-pointer`, children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("password"), className: `${checkIfActive("password")} w-24 py-2 cursor-pointer`, children: "Password" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: status === "profile" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsProfile, { schema }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPassword, { schema }) })
  ] });
};
export {
  Settings as default
};
