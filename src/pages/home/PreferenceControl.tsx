import { RotateCcw, Save } from "lucide-react";
import React from "react";
import { ButtonProps } from "../../types/article";

const PreferenceControl = ({
  savedPreferences,
  isSaving,
  resetPreferences,
  isResetting,
}: ButtonProps) => {
  return (
    <div className="flex space-x-2 md:flex-col gap-2 mb-4">
      <button
        onClick={savedPreferences}
        disabled={isSaving}
        className={`
          px-4 py-2 bg-blue-600 text-white rounded w-full
          hover:bg-blue-700 transition-all duration-200
          flex items-center justify-center min-w-[120px]
          disabled:bg-blue-400 disabled:cursor-not-allowed
        `}
      >
        {isSaving ? (
          <>
            <Save className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </>
        )}
      </button>
      <button
        onClick={resetPreferences}
        disabled={isResetting}
        className={`
          px-4 py-2 bg-gray-600 text-white rounded w-full 
          hover:bg-gray-700 transition-all duration-200
          flex items-center justify-center min-w-[120px]
          disabled:bg-gray-400 disabled:cursor-not-allowed
        `}
      >
        {isResetting ? (
          <>
            <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
            Resetting...
          </>
        ) : (
          <>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </>
        )}
      </button>
    </div>
  );
};

export default PreferenceControl;
