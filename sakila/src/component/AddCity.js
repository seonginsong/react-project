import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCity() {
    // let city = "";
    const [city, setCity] = useState("");
    const nav = useNavigate();
    const location = useLocation();
    const countryId = location.state?.countryId;

    function addCity() {
        if (!city.trim()) {
            alert("모든 필수사항을 입력해주세요");
            return;
        }

        fetch("http://localhost/city", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "city": city,
                "countryId": countryId
            })
        })
        .then((res)=>{
            if(res.ok) { // 200
                alert(city+"입력성공");
                nav("/City");
            } else { // 300, 400, 500...
                alert("입력실패");
            }
        })
    }
  return (
    <div className="max-w-xl mx-auto mt-10 p-2 border rounded-xl shadow bg-white">
        <h1>AddCity</h1>
        <div>
            city: <input type="text" onChange={(e)=>{
                setCity(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>
            
            <br />
            <button onClick={addCity} className="bg-gray-300 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-lg transition">입력</button>
        </div>
    </div>
  )
}
