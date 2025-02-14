import React from "react";

type Props = {
  error: string;
};

const ErrorSpinner = ({ error }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
        {error}
      </div>
    </div>
  );
};

export default ErrorSpinner;
