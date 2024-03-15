import React from "react";
export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline
            ? "border border-yellow-50 bg-transparent"
            : "bg-yellow-200  hover:bg-yellow-500  "
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-black ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    </div>
  );
}
