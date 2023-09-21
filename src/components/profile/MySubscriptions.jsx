import NothingToWatch from "../nothingToWatch";


const MySubscriptions = () => {
    return (
        <div>
            <h2 className="pageTitle font-bold pb-8 mb-9 border-b-[1px] text-3xl border-b-[hsla(0,0%,48%,.2)]">My Subscriptions</h2>
            <div className="grid place-items-center">
                <NothingToWatch message={'No Active Subscription'} />
            </div>
        </div>
    )
}

export default MySubscriptions;