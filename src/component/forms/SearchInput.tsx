import { Search } from "lucide-react";
import React from "react";


type SearchInputProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search news..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        {...props}
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
    </div>
  );
};

export default SearchInput;
