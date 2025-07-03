import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCustomer() {
    // let customer = "";
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [storeId, setStoreId] = useState("");
    const [storeList, setStoreList] = useState([]);
    const nav = useNavigate();
    const location = useLocation();
    const addressId = location.state?.addressId;

    // store 목록 받아오기
    useEffect(() => {
        fetch("http://localhost/storeList/1")
        .then(res => res.json())
        .then(data => setStoreList(data.content))
        .catch(err => console.error(err));
    }, []);

    function addCustomer() {
    // 필수값 확인
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !storeId) {
            alert("모든 필수사항을 입력해주세요");
            return;
        }

        fetch("http://localhost/customer", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "storeId": storeId,
                "addressId": addressId,
                "active": 1
            })
        })
        .then((res)=>{
            if(res.ok) { // 200
                alert(firstName+" "+lastName+"입력성공");
                nav("/Customer");
            } else { // 300, 400, 500...
                alert("입력실패");
            }
        })
    }
  return (
    <div>
        <h1>AddCustomer</h1>
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
            First Name: <input type="text" onChange={(e)=>{
                setFirstName(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            Last Name: <input type="text" onChange={(e)=>{
                setLastName(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            Email: <input type="text" onChange={(e)=>{
                setEmail(e.target.value);
            }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            <select
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                className="w-full px-4 py-2 border rounded"
            >
                <option value="">Store 선택</option>
                {storeList.map(store => (
                    <option key={store.storeId} value={store.storeId}>
                    {store.storeId} - {store.addressEntity.address}
                    </option>
                ))}
            </select>
            <br />
            <button onClick={addCustomer} className="bg-gray-300 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-lg transition">입력</button>
        </div>
    </div>
  )
}
