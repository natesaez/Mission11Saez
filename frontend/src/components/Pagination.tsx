interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, onPageChange,onPageSizeChange}:PaginationProps) => {
    return (
    <>
        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
            <button className="btn btn-secondary" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) => (
                <button 
                        key={i + 1}
                        className={`btn ${currentPage === i + 1 ? 'btn-dark' : 'btn-outline-dark'}`} 
                        onClick={() => onPageChange(i + 1)} 
                        disabled={currentPage === i + 1}
                    >
                    {i + 1}
                </button>
            ))}
            <button
                className="btn btn-secondary"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}>Next
            </button>
        </div>
        <div className="text-center mt-3">
            <label className="me-2">
                Results per page:
            </label>
            <select
                className="form-select d-inline w-auto"
                    value={pageSize}
                    onChange={(p) => {
                    onPageSizeChange(Number(p.target.value));
                    onPageChange(1);
                }}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
            </select>
        </div>
    </>
    );
}

export default Pagination