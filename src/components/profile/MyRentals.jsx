import NothingToWatch from "../nothingToWatch";

const MyRentals = () => {
    return (
        <div>
            <h2 className="pageTitle font-bold pb-8 mb-9 border-b-[1px] text-3xl border-b-[hsla(0,0%,48%,.2)]">My Rentals</h2>
            <div className="grid place-items-center">
                <NothingToWatch message={'You have not rented any content yet'} message2={'Rent from our ZEEPLEX Collection and start watching'} />
            </div>
        </div>
    )
}

export default MyRentals;