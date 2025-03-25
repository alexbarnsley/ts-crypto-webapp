import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="px-4 py-2 bg-slate-700 rounded-md cursor-pointer" {...props}>
      {props.children}
    </button>
  );
}