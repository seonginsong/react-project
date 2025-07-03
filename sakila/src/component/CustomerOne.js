import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CustomerOne() {
  const { customerId } = useParams();  // URL 파라미터 받아오기
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // customerId를 사용해서 API 호출
    fetch("http://localhost/customerOne/"+customerId)
      .then(res => res.json())
      .then(data => {
        setCustomerData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) return <div>로딩중...</div>;
  if (!customerData) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Customer 상세 정보</h1>
      <p><strong>Customer ID:</strong> {customerData.customerId}</p>
      <p><strong>Customer 이름:</strong> {customerData.firstName} {customerData.lastName}</p>
      <p><strong>email:</strong> {customerData.email}</p>
      <p><strong>Country:</strong> <Link to={`/CountryOne/${customerData.addressEntity.cityEntity.countryEntity.countryId}`} className="hover:bg-gray-200">{customerData.addressEntity.cityEntity.countryEntity.country}</Link></p>
      <p><strong>City:</strong> <Link to={`/CityOne/${customerData.addressEntity.cityEntity.cityId}`} className="hover:bg-gray-200">{customerData.addressEntity.cityEntity.city}</Link></p>
      <p><strong>Customer Address:</strong> <Link to={`/AddressOne/${customerData.addressEntity.addressId}`} className="hover:bg-gray-200">{customerData.addressEntity.address}</Link></p>
      <p><strong>Store Address:</strong> <Link to={`/AddressOne/${customerData.storeEntity.addressEntity.addressId}`} className="hover:bg-gray-200">{customerData.storeEntity.addressEntity.address}</Link></p>
      <p><strong>마지막 업데이트:</strong> {customerData.lastUpdate}</p>
      
    </div>
  );
}
