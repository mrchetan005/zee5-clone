import NothingToWatch from "../nothingToWatch";


const MyTransactions = () => {
    return (
        <div>
            <h2 className="pageTitle font-bold pb-8 mb-9 border-b-[1px] text-3xl border-b-[hsla(0,0%,48%,.2)]">My Transactions</h2>
            <div className="grid place-items-center">
                <NothingToWatch message={'No Transactions'} />
            </div>
        </div>
    )
}

export default MyTransactions;