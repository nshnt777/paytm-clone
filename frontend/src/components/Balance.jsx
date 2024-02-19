function Balance({value}){
    return(
        <div className="flex m-4">
            <div className="font-bold text-lg">
                Your Balance:-
            </div>
            <div className="font-sesmibold ml-4 text-lg">
                Rs. {value}
            </div>
        </div>
    )
}

export default Balance