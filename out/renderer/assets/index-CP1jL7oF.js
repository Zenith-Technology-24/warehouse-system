import { a as useNavigate, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { a as create$3, c as create$6, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { L as LinkSecondaryButton } from "./LinkSecondaryButton-LxANXQwB.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { c as createUser } from "./usersApi-BU81reWI.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const CreateUser = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formRef = reactExports.useRef();
  const [currentType, setCurrentType] = reactExports.useState("password");
  const [confirmType, setConfirmType] = reactExports.useState("password");
  const createUserMutation = useMutation({
    mutationFn: (values) => createUser(values),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      showToast(
        "User Created Successfully!",
        "New user has been added to the system.",
        "success"
      );
      navigate("/manage-users", { replace: true });
    }
  });
  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };
  const validationSchema = create$3().shape({
    firstname: create$6().required("First name is required"),
    lastname: create$6().required("Last name is required"),
    password: create$6().required("Current password is required"),
    confirm_password: create$6().required("Confirm password is required"),
    username: create$6().required("Username is required"),
    role: create$6().required("Role is required")
  });
  const initialValues = {
    firstname: "",
    lastname: "",
    password: "",
    confirm_password: "",
    username: "",
    role: "admin"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Create Users", description: "Manage Users" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LinkSecondaryButton, { to: "..", text: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { text: "Save", onClick: handleSave })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full h-full justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Formik,
      {
        innerRef: formRef,
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: (values, {}) => {
          createUserMutation.mutate(values);
        },
        children: ({ setFieldValue, values }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "firs_tname", children: "First Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "firstname",
                placeholder: "First Name",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "firstname", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "size", children: "Last Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "lastname",
                placeholder: "Last Name",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "lastname", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "firs_tname", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "role",
                placeholder: "Role",
                disabled: true,
                className: "bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "role", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "firs_tname", children: "Username" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "username",
                placeholder: "Username",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "username", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col p-1 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  as: "input",
                  type: currentType,
                  name: "password",
                  placeholder: "Password",
                  className: "bg-transparent h-12 border border-gray-300 p-4 pr-10 rounded-md w-full"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "password", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col p-1 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "confirm_password", children: "Confirm Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  as: "input",
                  type: confirmType,
                  name: "confirm_password",
                  placeholder: "Confirm Password",
                  className: "bg-transparent h-12 border border-gray-300 p-4 pr-10 rounded-md w-full"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "confirm_password", component: "div" }) })
          ] })
        ] }) })
      }
    ) })
  ] });
};
export {
  CreateUser as default
};
