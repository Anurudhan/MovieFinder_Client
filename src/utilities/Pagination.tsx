import { ChevronLeft, ChevronRight } from "lucide-react";
import type PaginationProps from "../interface/PaginationProps";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center items-center mt-8 gap-1">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`}
        >
          <ChevronLeft size={18} />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              currentPage === page 
                ? 'bg-blue-600 text-white font-medium' 
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  };

  export default Pagination;