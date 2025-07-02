import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customer() {
    const [customerList, setCustomerList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    
    // 화면 렌더링과 비동기로 실행
    useEffect(() => {
        fetch(`http://localhost/customerList/${pageNumber}`)
        .then(function(res){return res.json();})
        .then(function(data){setCustomerList(data.content); setTotalPages(data.totalPages);}) // data 는 객체{}타입이고, data.content가 
    }, [pageNumber]);


    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            customer id
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            customer
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customerList.map((c)=>(
                            <tr key={c.customerId} className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{c.customerId}</th>
                                <td className="px-6 py-4 text-center"><Link to={`/CustomerOne/${c.customerId}`}>{c.firstName} {c.lastName}</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
            <button onClick={()=>setPageNumber(pageNumber - 1)} className="px-4 py-2 bg-white-200 rounded hover:bg-gray-300" disabled={pageNumber <= 1}>이전</button>
            {pageNumber < totalPages && (
            <button onClick={()=>{setPageNumber(pageNumber + 1)}} >다음</button>
            )}
        </div>
    )
}
