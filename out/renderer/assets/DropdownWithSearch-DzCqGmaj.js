import { r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
const DropdownWithSearch = ({
  _index,
  setFieldValue,
  label,
  placeholder,
  name,
  fetchNames,
  forUpdate,
  setSelectedValue,
  formikSelectedValue,
  refetchData,
  onDelete = null,
  onUpdate = null
}) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const dropdownRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (forUpdate) {
      setSelectedOption({ name: forUpdate });
    } else {
      setSelectedOption(null);
    }
  }, [name, formikSelectedValue]);
  const { data: options, refetch } = useQuery({
    queryKey: [`${name}-list`],
    queryFn: () => fetchNames()
  });
  const filteredOptions = options?.filter(
    (option) => option.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setFieldValue(name, option?.name);
    if (setSelectedValue) {
      setSelectedValue(option);
    }
    if (label === "Product") {
      setFieldValue(`inventories[${_index}].quantity`, "0");
      setFieldValue(`inventories[${_index}].total_price`, "0");
      setFieldValue(`inventories[${_index}].price`, Number(option?.price));
    }
  };
  reactExports.useEffect(() => {
    if (refetchData) {
      refetchData(refetch);
    }
  }, [refetchData, refetch]);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full", ref: containerRef, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name, children: () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-transparent h-12 border border-gray-300 rounded-lg p-2 flex justify-between items-center cursor-pointer",
            onClick: () => setIsOpen(!isOpen),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-1 ${selectedOption?.name || formikSelectedValue ? "text-black" : "text-gray-400"}`, children: selectedOption?.name || formikSelectedValue || placeholder }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: `w-5 h-5 transition-transform text-gray-400 ${isOpen ? "transform rotate-180" : ""}`,
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      clipRule: "evenodd"
                    }
                  )
                }
              )
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              placeholder: " Search...",
              className: "w-full p-2 border-b border-gray-300 outline-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { ref: dropdownRef, className: "max-h-60 overflow-y-auto", children: filteredOptions?.length > 0 ? filteredOptions.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "p-2 ml-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer",
              onClick: () => handleOptionClick(option),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-grow", children: option.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  onUpdate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "currentColor",
                      className: "size-4 text-gray-400 hover:text-gray-900",
                      onClick: (e) => {
                        e.stopPropagation();
                        onUpdate(option);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        }
                      )
                    }
                  ),
                  onDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "currentColor",
                      className: "size-4 text-red-300 hover:text-red-500",
                      onClick: (e) => {
                        e.stopPropagation();
                        onDelete(option);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        }
                      )
                    }
                  )
                ] })
              ]
            },
            index
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "p-2 text-gray-400", children: "No options found" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name, component: "div" }) })
    ] })
  ] }, _index);
};
export {
  DropdownWithSearch as D
};
