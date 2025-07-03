import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function City() {
    const [cityList, setCityList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    
    // 화면 렌더링과 비동기로 실행
    useEffect(() => {
        fetch(`http://localhost/cityList/${pageNumber}`)
        .then(function(res){return res.json();})
        .then(function(data){setCityList(data.content); setTotalPages(data.totalPages);}) // data 는 객체{}타입이고, data.content가 
    }, [pageNumber]);


    return (
        <div className="relative overflow-x-auto h-120 overflow-y-auto block">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            city id
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            city
                        </th>
                    </tr>
                </thead>
                <tbody className="h-[600px] overflow-y-auto align-top">
                    {
                        cityList.map((c)=>(
                            <tr key={c.cityId} className="bg-white text-left border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{c.cityId}</th>
                                <td className="px-6 py-4 text-left"><Link to={`/CityOne/${c.cityId}`}>{c.city}</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
            <button className="px-4 py-2 bg-white-200 rounded hover:bg-gray-300" onClick={()=>{setPageNumber(1)}}>처음</button>
            <button onClick={()=>setPageNumber(pageNumber - 1)} className="px-4 py-2 bg-white-200 rounded hover:bg-gray-300" disabled={pageNumber <= 1}>이전</button>
            {pageNumber}
            {pageNumber < totalPages && (
            <button className="px-4 py-2 bg-white-200 rounded hover:bg-gray-300" onClick={()=>{setPageNumber(pageNumber + 1)}} >다음</button>
            )}
            <button className="px-4 py-2 bg-white-200 rounded hover:bg-gray-300" onClick={()=>{setPageNumber(totalPages)}}>마지막</button>
        </div>
    )
}
