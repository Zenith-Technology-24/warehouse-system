import { j as jsxRuntimeExports, L as Link } from "./index-BwJeGL0w.js";
const secondaryButtonClassname = "rounded-lg font-lato border-2 border-aaa text-aaa p-3";
const SecondaryButton = ({
  //Green Button
  onClick,
  text
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: secondaryButtonClassname,
      onClick,
      children: text
    }
  );
};
const LinkSecondaryButton = ({
  //Green Button
  onClick = () => {
  },
  text,
  to,
  replace = false
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, replace, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick, text }) });
};
export {
  LinkSecondaryButton as L
};
