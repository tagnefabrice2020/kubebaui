import React , {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'
import { fetchApi, GET } from '../../requests'
import TableLoader from '../../Loaders/TableLoader'
import Pagination from '../../components/Pagination/Pagination'
import { toast } from 'react-toastify'

const Documents = (props) => {
    const [documents, setDocuments] = useState([])
    const [initialDocuments, setInititalDocuments] = useState()
    const [totalItems, setTotalItems] = useState()
    const [initialTotalItems, setInitialTotalItems] = useState()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchLoading, setLoadingSearch] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    useEffect(() => {
        async function getDocuments (){
            try {
                setLoading(true)
                const results = search !== "" ? await fetchApi(GET, `/auth/admins/identity_proofs/${search}/search?page=${currentPage}&per_page=${itemsPerPage}`) : await fetchApi(GET, `/auth/admins/get_all_proofs?page=${currentPage}&per_page=${itemsPerPage}`)
                setDocuments(results.data.data.data)
                setInititalDocuments(results.data.data.data)
                setTotalItems(results.data.data.total)
                setInitialTotalItems(results.data.data.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if(!error.response) {
                    toast.error('Ooops, check your internet connection!')
                } else if (error.response.status === 500) {
                    toast.error(error.response.message)
                } 
            }
        } 
        getDocuments()
    }, [search, currentPage, itemsPerPage])

    const handlePageChange = (page) => {
        setDocuments([])
        setLoading(true)
        setCurrentPage(page)
    }

    const handleSearch = async (event) => {
        const value = event.currentTarget.value
        setSearch(value)
        if (value.length >= 2) { 
            setLoading(true)
            setLoadingSearch(true)
            try {
                const results = await fetchApi(GET, `/auth/admins/identity_proofs/${value}/search?page=${currentPage}&per_page=${itemsPerPage}`)
                setTotalItems(results.data.data.total)
                setDocuments(results.data.data.data)
                setLoading(false)
                setLoadingSearch(false)
            } catch (error) {
                setLoadingSearch(false)
            } 
        } else if (value.length === 0) {
            setDocuments(initialDocuments)   
            setTotalItems(initialTotalItems) 
        }
    }


    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
            <div className="main-content" id="main-content">
                <BurgerBar logo={props.logo}/>
                <div className="container card-container shippement-container">
                    <div className="tile is-ancestor is-horizontal">
                        <div className="tile m-t-20 is-6 is-flex-direction-column">
                            {/* <!-- Heading --> */}
                            <h2 className="title is-12 page-title" style={{fontSize: '25px'}}>Documents</h2>
                        </div>
                        <div className="tile m-t-20 is-flex-direction-row-reverse">
                            {/* <!-- Form search --> */}
                            <div className="is-10">
                                <form method="get" action="">
                                    <p className={`control has-icons-right ${searchLoading === true && 'is-loading'}`}>
                                        <input type="text" name="search" value={search} onChange={(event) => handleSearch(event)} className="input is-small is-rounded" />
                                        <span className="icon is-small is-right">
                                            {!searchLoading && <i className="fa fa-search"></i>}
                                        </span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                        <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                            {loading && <TableLoader />}
                            { !loading && <table className="table" style={{width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th><abbr title="number">#</abbr></th>
                                        <th>Type</th>
                                        <th>Document owner</th>
                                        <th>Status</th>
                                        <th>Created at</th>
                                        <th>Upadated at</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th><abbr title="number">#</abbr></th>
                                        <th>Type</th>
                                        <th>Document owner</th>
                                        <th>Status</th>
                                        <th>Created at</th>
                                        <th>Upadated at</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {documents.map(document => 
                                    <tr key={document.id}>
                                        <th>{document.id}</th>
                                        <td><span>passport</span></td>
                                        <td>{document.users.first_name} {document.users.last_name}</td>
                                        <td><span></span></td>
                                        <td>Saturday 09, Jul 2021</td>
                                        <td>Saturday 09, Jul 2021</td>
                                        <th><span><i className="fas fa-eye"></i></span></th>
                                    </tr>
                                    )}
                                </tbody>
                            </table> }                    
                        </div>
                    </div>
                    <br/>
                    {!loading && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handlePageChange} />}
                </div>
                </div>
            </div>
        )
}

export default Documents