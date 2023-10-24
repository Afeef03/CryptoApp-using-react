import React, { useEffect, useState } from 'react'
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const UpToTopButton = () => {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        if (window.scrollY) {
            setScroll(true);

        }

    }, [])

    const goTop = () => {
        window.scrollTo({
            top: '0',
            behavior: 'smooth'
        })
    }
    return (
        <div>
            <button className='top-btn' onClick={() => goTop()} >
                <BsFillArrowUpCircleFill />
            </button>
        </div>
    )
}

export default UpToTopButton
