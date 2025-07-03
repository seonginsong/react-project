import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddressOne() {
  const { addressId } = useParams();  // URL 파라미터 받아오기
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    // addressId를 사용해서 API 호출
    fetch("http://localhost/addressOne/"+addressId)
      .then(res => res.json())
      .then(data => {
        setAddressData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [addressId]);

  if (loading) return <div>로딩중...</div>;
  if (!addressData) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Address 상세 정보</h1>
      <p><strong>Address ID:</strong> {addressData.addressId}</p>
      <p><strong>Address:</strong> {addressData.address}</p>
      <p><strong>Address2:</strong> {addressData.address2}</p>
      <p><strong>District:</strong> {addressData.district}</p>
      <p><strong>Phone:</strong> {addressData.phone}</p>
      <p><strong>Postal Code:</strong> {addressData.postalCode}</p>
      <p><strong>Country:</strong> <Link to={`/CountryOne/${addressData.cityEntity.countryEntity.countryId}`} className="hover:bg-gray-200">{addressData.cityEntity.countryEntity.country}</Link></p>
      <p><strong>City:</strong> <Link to={`/CityOne/${addressData.cityEntity.cityId}`} className="hover:bg-gray-200">{addressData.cityEntity.city}</Link></p>
      <p><strong>마지막 업데이트:</strong> {addressData.lastUpdate}</p>
      <button onClick={() => nav("/AddCustomer", { state: { addressId: addressData.addressId } })} className="bg-gray-300 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-lg transition">
        이 주소에 고객 추가
      </button>
    </div>
  );
}
