const AddressCard = ({address})=>{
    
    return (
        <div>
            <div className="space-y-3 text-sm text-left p-5 mt-3">
                <p className="font-semibold">Address: {address?.streetAddress+", "+address?.city}</p>
                <div className="space-y-1">
                    <p className="font-semibold">Phone Number</p>
                    <p>{address?.mobile}</p>
                </div>
            </div>
        </div>
    )
}
export default AddressCard