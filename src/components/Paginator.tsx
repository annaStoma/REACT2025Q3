import '../styles/Paginator.scss';

interface PaginatorProps {
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

function Paginator({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}: PaginatorProps) {
  if (totalPosts === 0) return null;

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxVisiblePages = 10;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            « First (1)
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹ Prev
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next ›
          </button>
        </li>
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last ({totalPages}) »
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Paginator;
