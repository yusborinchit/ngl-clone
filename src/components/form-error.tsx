import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  error: string;
}

function FormError({ error }: FormErrorProps) {
  return (
    <div
      role="alert"
      className="flex items-center gap-4 p-4 text-red-500 bg-red-100 border border-red-300 rounded"
    >
      <AlertCircle width={32} height={32} />
      <div className="flex flex-col gap-1">
        <strong className="text-sm font-semibold">
          Oops! Something go wrong
        </strong>
        <p className="text-xs">{error}</p>
      </div>
    </div>
  );
}

export default FormError;
