import { Button } from "@mui/material";


const BuyButton = () => {
    return (
        <>
            <Button className='h-[2.2rem] w-28 flex flex-row-reverse items-center gap-1'
                sx={{
                    backgroundColor: '#8230c6',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '7px',
                    color: 'white',
                    transition: 'all 0.3s ease-in',
                    '&:hover': {
                        backgroundColor: '#5c1695',
                    },
                }}
                color="inherit">
                <span className="pt-[4px]">
                    BUY PLAN
                </span>
                <img className="w-5" src="/assets/icons/crown.svg" alt="" />
            </Button>
        </>
    )
}

export default BuyButton;