import { r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
const DropdownWithNew = ({
  _index,
  id,
  setFieldValue,
  placeholder,
  name,
  fetchNames,
  forUpdate,
  setSelectedValue,
  data,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [searchTerm, setSearchTerm] = reactExports.useState(data);
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const dropdownRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (data) {
      setSelectedOption({ id: null, name: data });
      setSearchTerm(data);
    }
  }, [data]);
  reactExports.useEffect(() => {
    if (forUpdate) {
      setSelectedOption({ id: forUpdate.id, name: forUpdate.product_name });
      setSearchTerm(forUpdate.product_name);
    }
  }, [forUpdate]);
  const { data: options } = useQuery({
    queryKey: [`${name}-list`],
    queryFn: () => fetchNames()
  });
  const filteredOptions = options?.filter(
    (option) => option?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.name);
    setIsOpen(false);
    setFieldValue(name, option?.name);
    if (setSelectedValue) {
      setSelectedValue(option);
    }
    if (id) {
      setFieldValue(id, option?.id);
    }
  };
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsOpen(false);
      setSelectedOption({ id: null, name: searchTerm });
      setFieldValue(name, searchTerm);
      if (setSelectedValue) {
        setSelectedValue({ id: null, name: searchTerm });
      }
      if (id) {
        setFieldValue(id, "");
      }
    }
  };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col w-full", ref: containerRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name, children: () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-transparent h-12 border border-gray-300 rounded-lg p-2 flex justify-between items-center cursor-pointer",
          onClick: () => setIsOpen(!isOpen),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-1 ${!selectedOption?.name ? "text-gray-400" : "text-black"}`, children: selectedOption?.name || placeholder }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: `w-5 h-5 transition-transform text-gray-400 ${isOpen && disabled === false ? "transform rotate-180" : ""}`,
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
      isOpen && disabled === false && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            onKeyDown: handleEnterPress,
            placeholder: " Search...",
            className: "w-full p-2 border-b border-gray-300 outline-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { ref: dropdownRef, className: "max-h-60 overflow-y-auto", children: filteredOptions?.length > 0 ? filteredOptions.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "li",
          {
            className: "p-2 hover:bg-gray-200 cursor-pointer ml-2",
            onClick: () => handleOptionClick(option),
            children: option.name
          },
          index
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "p-2 text-gray-400", children: "No options found" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name, component: "div" }) })
  ] }) });
};
export {
  DropdownWithNew as D
};
