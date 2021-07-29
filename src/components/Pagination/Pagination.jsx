import React from "react"

const Pagination = ({currentPage, onPageChange, itemsPerPage, length }) => {
    const pagesCount = Math.ceil(length / itemsPerPage)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <button className="pagination-previous" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 ? true : false }>Previous</button>
            <button className="pagination-next" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pagesCount ? true : false}>Next page</button>
            <ul className="pagination-list">
                {pages.map(page => 
                    <li key={page}>
                        <button onClick={() => onPageChange(page)} className={"pagination-link" + (currentPage === page ? " is-current": " ")} aria-label="Goto page 1">{page}</button>
                    </li>
                )}
            
            </ul>
        </nav>
    )
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage
    return items.slice(start, start + itemsPerPage)
}

export default Pagination