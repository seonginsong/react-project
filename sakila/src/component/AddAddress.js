import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddAddress() {
    // let address = "";
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [district, setDistrict] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const nav = useNavigate();
    const location = useLocation();
    const cityId = location.state?.cityId;

    function addAddress() {
    // 필수값 확인
    if (!address.trim() || !district.trim() || !phone.trim() || !postalCode.trim()) {
        alert("모든 필수사항을 입력해주세요");
        return;
    }

    // address2는 없으면 null 처리
    const data = {
        address,
        address2: address2.trim() === "" ? null : address2,
        district,
        phone,
        postalCode,
        cityId
    };

        fetch("http://localhost/address", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then((res)=>{
            if(res.ok) { // 200
                alert(address+"입력성공");
                nav("/Address");
            } else { // 300, 400, 500...
                alert("입력실패");
            }
        })
    }
  return (
    <div>
        <h1>AddAddress</h1>
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
            address: <input type="text" onChange={(e)=>{
                setAddress(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            address2(선택): <input type="text" onChange={(e)=>{
                setAddress2(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            district: <input type="text" onChange={(e)=>{
                setDistrict(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            phone: <input type="text" onChange={(e)=>{
                setPhone(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            postal code: <input type="text" onChange={(e)=>{
                setPostalCode(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>
            
            <br />
            <button onClick={addAddress} className="bg-gray-300 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-lg transition">입력</button>
        </div>
    </div>
  )
}
