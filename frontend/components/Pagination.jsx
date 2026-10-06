import Styles from "./Pagination.module.css"
import Link from "next/link"

function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)


    const styleLinkLeft = {
        opacity: currentPage === 1 ? 0.5 : 1,
        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
    }

    const styleLinkRight = {
        opacity: currentPage === totalPages ? 0.5 : 1,
        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
    }




    return (
        <nav className={Styles.navContainer}>
            <div className={Styles.paginationContainer}>
                <Link
                    href={`/clientes?page=${currentPage - 1}`}
                    style={styleLinkLeft}
                    aria-disabled={currentPage === 1}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </Link>

                {pages.map(page => (
                    <Link
                        key={page}
                        href={`/clientes?page=${page}`}
                        className={currentPage === page ? Styles.isActive : ""}
                    >
                        {page}
                    </Link>
                ))}

                <Link
                    href={`/clientes?page=${currentPage + 1}`}
                    style={styleLinkRight } 
                    aria-disabled={currentPage === totalPages}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                    </svg>
                </Link>

            </div>
        </nav>
    )
}

export default Pagination;