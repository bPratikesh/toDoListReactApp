import { Check } from "lucide-react";
import React from "react";

const Checkbox = ({ label, checked, onChange, id }) => {
  return (
    <label className="flex gap-4 items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`shrink-0 size-6 flex items-center justify-center border-2 border-gray-400 rounded-md 
            ${checked ? "bg-primary border-none" : "bg-transparent"}`}
      >
        {checked && <Check className="text-black size-4" />}
      </div>
      <span
        className={`flex-1 w-full ${checked ? "line-through text-gray-400" : "text-white"}`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
