import React from "react";

interface SaveButtonProps {
  handleSave: () => void;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  handleSave,
  loading = false,
  disabled = false,
  text = "Save Settings",
}) => {
  return (
    <div className="flex justify-end">
      <button
        className={`glass-button px-8 py-3 text-white hover:text-pink-400 font-semibold transition-all duration-300 group ${
          disabled || loading
            ? "text-gray-400 cursor-not-allowed"
            : "text-white hover:text-pink-400"
        }`}
        onClick={handleSave}
        disabled={disabled || loading}
      >
        <i
          className={`bx bx-save mr-2 group-hover:scale-110 transition-transform duration-300 ${
            loading ? "bx-loader-alt animate-spin" : "bx-save"
          }`}
        ></i>
        {loading ? "Saving..." : text}
      </button>
    </div>
  );
};

export default SaveButton;
