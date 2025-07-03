import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CityOne() {
  const { cityId } = useParams();  // URL 파라미터 받아오기
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    // cityId를 사용해서 API 호출
    fetch("http://localhost/cityOne/"+cityId)
      .then(res => res.json())
      .then(data => {
        setCityData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [cityId]);

  if (loading) return <div>로딩중...</div>;
  if (!cityData) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">City 상세 정보</h1>
      <p><strong>City ID:</strong> {cityData.cityId}</p>
      <p><strong>City 이름:</strong> {cityData.city}</p>
      <p><strong>마지막 업데이트:</strong> {cityData.lastUpdate}</p>
      <p><strong>Country:</strong> <Link to={`/CountryOne/${cityData.countryEntity.countryId}`} className="hover:bg-gray-200">{cityData.countryEntity.country}</Link></p>
      <button onClick={() => nav("/AddAddress", { state: { cityId: cityData.cityId } })} className="bg-gray-300 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-lg transition">
        이 도시에 Address 추가
      </button>
    </div>
  );
}
