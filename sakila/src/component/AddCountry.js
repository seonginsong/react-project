import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCountry() {
    // let country = "";
    const [country, setCountry] = useState("");
    const nav = useNavigate();

    function addCountry() {
        if (!country.trim()) {
            alert("모든 필수사항을 입력해주세요");
            return;
        }

        fetch("http://localhost/country", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"country": country})
        })
        .then((res)=>{
            if(res.ok) { // 200
                alert(country+"입력성공");
                nav("/Country");
            } else { // 300, 400, 500...
                alert("입력실패");
            }
        })
    }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
        <h1>AddCountry</h1>
        <div>
            country: <input type="text" onChange={(e)=>{
                setCountry(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>
            <br />
            <button onClick={addCountry} className="bg-gray-300 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-lg transition">입력</button>
        </div>
    </div>
  )
}
