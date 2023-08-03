import { useId, type MouseEvent, type ReactNode } from "react";

interface TextAreaInputProps {
  children: ReactNode[] | ReactNode;
  rows: number;
  name: string;
  placeholder: string;
  label: string;
}

function TextAreaInput({
  children,
  label,
  rows,
  name,
  placeholder,
}: TextAreaInputProps) {
  const id = useId();

  const handleClickOutsideButtons = (event: MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = event;
    const textArea = currentTarget.previousSibling as HTMLTextAreaElement;

    if (!textArea) return;

    textArea.focus();
  };

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="overflow-hidden border border-gray-400 rounded focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500">
        <textarea
          id={id}
          rows={rows}
          name={name}
          placeholder={placeholder}
          className="w-full text-sm align-top border-none rounded resize-none focus:ring-0"
        ></textarea>
        <div
          onClick={handleClickOutsideButtons}
          className="flex items-center gap-2 px-3 py-2 bg-white hover:cursor-text"
        >
          {Array.isArray(children) ? <>{...children}</> : <>{children}</>}
        </div>
      </div>
    </>
  );
}

export default TextAreaInput;
