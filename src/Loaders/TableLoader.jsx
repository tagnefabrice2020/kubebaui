import React from "react"
import ContentLoader from "react-content-loader"

const TableLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={739}
            height={500}
            viewBox="0 0 739 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            {/* <circle cx="1456" cy="323" r="12" /> */}
            <rect x="1" y="5" rx="1" ry="1" width="700" height="30" />
            <rect x="1" y="45" rx="1" ry="1" width="650" height="30" />
            <rect x="1" y="85" rx="1" ry="1" width="600" height="30" />
            <rect x="1" y="125" rx="1" ry="1" width="500" height="30" />
            {/* <circle cx="1456" cy="386" r="12" /> */}
        </ContentLoader>
    )
}

export default TableLoader