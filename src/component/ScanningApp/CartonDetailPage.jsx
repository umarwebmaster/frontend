import React, {useState} from "react";


export default function CartonDetailPage(activeOrder){

    const [loading, setLoading] = useState(false)


    return(
        <>
        <h5>carton Detail of : {activeOrder}</h5>
        <section className="Datasection">

                        <div id="hidden-icons">
                    {loading && <div id="loading-icon"> <span id="loading-bar"></span></div>}
                    </div>
                <table>
                    <thead>
                        <tr>
                            <th width='200rem'>Number</th>
                            <th width='150rem'>SRL Number</th>
                            <th width='130rem'>From</th>
                            <th width='100rem'>To</th>
                            <th width='100rem'>QTY</th>
                            <th width='100rem'>Created Date</th>
                            <th width='500rem'>Detail</th>
                            <th width=''>Delete</th>

                        </tr>
                    </thead>
                    
                    <tbody>
                        {sortedMainData.map((entry, index) => {
                            
                                return (
                                    <tr  key={entry._id} id={entry._id}>    
                                    <td>{entry.index}.</td>
                                    <td>{entry.SRLNumber}</td>
                                    <td>{entry.From}</td>
                                    <td>{entry.To}</td>
                                    <td>{entry.TotalQTY}</td>
                                    <td>{(entry.CreatedAt).toString().slice(0,4)+'-'+(entry.CreatedAt).toString().slice(4,6)+'-'+(entry.CreatedAt).toString().slice(6,8)}</td>
                                    <td>{entry.Detail}</td>
                                    <td><button className="deleteEntry" id={entry._id} onClick={(e) => deleteEntireRow(entry.OrderNumber, e)} value='Delete'>Delete</button></td>
                                    {/* <button onSubmit={deleteEntry()}>Delete</button> */}
                                </tr>

);
                        })}

                    </tbody>
                    
                    {/* <tfoot>
                        <tr className="grand-total-row">
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{TotalQtyOfTO}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot> */}
                </table>
            </section>
        </>
    )
}