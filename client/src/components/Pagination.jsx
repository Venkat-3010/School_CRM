const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <footer className="flex justify-center items-center">
      <ul className="list-style-none flex gap-8 fixed bottom-6">
        <li>
          <button
            onClick={handlePrevious}
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-blue-100 dark:text-black dark:hover:bg-blue-700 dark:hover:text-black ${
              currentPage === 1
                ? "text-black cursor-not-allowed"
                : "text-black hover:bg-blue-100 dark:text-black dark:hover:bg-blue-700"
            }`}
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`relative block rounded px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-blue-100 dark:text-black dark:hover:bg-blue-700 dark:hover:text-black ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNext}
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-blue-600 transition-all duration-300 hover:bg-blue-100 dark:text-black dark:hover:bg-blue-700 dark:hover:text-black ${
              currentPage === totalPages
                ? "text-black cursor-not-allowed"
                : "text-black hover:bg-blue-100 dark:text-black dark:hover:bg-blue-700"
            }`}
            aria-label="Next"
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </footer>
  );
};

export default Pagination;
