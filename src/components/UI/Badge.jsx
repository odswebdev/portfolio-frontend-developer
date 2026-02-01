// src/components/UI/Badge.jsx
const Badge = ({ 
    children, 
    variant = 'default', 
    onClose, 
    className = '' 
  }) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      category: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
      subcategory: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      featured: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      tech: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs',
    //  tech-large: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-lg',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
  
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
        {children}
        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-2 text-current hover:text-opacity-75 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  };
  
  export default Badge;