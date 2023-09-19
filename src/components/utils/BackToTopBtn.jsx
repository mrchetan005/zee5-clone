import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

const BackToTopBtn = () => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const toggleVisibility = () => {
            const { scrollTop, clientHeight } = document.documentElement;
            if (scrollTop >= clientHeight) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, []);

    return (
        <div title='Back to Top' onClick={handleClick} className={`fixed bottom-6 right-6 z-[1000] border-[1px] border-[#8230C6] bg-[#8230C6cf] hover:bg-[#8230C683] rounded-lg ${visible ? '' : 'hidden'}`}>
            <IconButton color='inherit'>
                <KeyboardArrowUpIcon />
            </IconButton>
        </div>
    )
}

export default BackToTopBtn;