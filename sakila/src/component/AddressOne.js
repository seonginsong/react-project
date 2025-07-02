import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AddressOne() {
  const { addressId } = useParams();  // URL 파라미터 받아오기
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <p><strong>Address 이름:</strong> {addressData.address}</p>
      <p><strong>Address2 이름:</strong> {addressData.address2}</p>
      <p><strong>Country:</strong> <Link to={`/CountryOne/${addressData.cityEntity.countryEntity.countryId}`}>{addressData.cityEntity.countryEntity.country}</Link></p>
      <p><strong>City:</strong> <Link to={`/CityOne/${addressData.cityEntity.cityId}`}>{addressData.cityEntity.city}</Link></p>
      <p><strong>마지막 업데이트:</strong> {addressData.lastUpdate}</p>
      
    </div>
  );
}
