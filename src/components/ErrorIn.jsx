import React from 'react'

const ErrorIn = () => {
    return (
        <section className='container mt-5 p-5'>
        
            <div className="alert alert-danger p-5" role="alert">
                <h1 className="alert-heading">Error!</h1>
                <p className='fw-500px'>Oops! Something went wrong. We couldn't fetch the data at the moment. Please try again later..</p>
                <hr/>
                    <p className="mb-0 fw-500px"> If the issue persists or you need immediate assistance, feel free to contact our support team for help. We're here to assist you.</p>
            </div>
        </section>
    )
}

export default ErrorIn
