import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function CountryOne() {
    const { countryId } = useParams();  // URL 파라미터 받아오기
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

  useEffect(() => {
    // countryId를 사용해서 API 호출
    fetch("http://localhost/countryOne/"+countryId)
      .then(res => res.json())
      .then(data => {
        setCountryData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [countryId]);

  if (loading) return <div>로딩중...</div>;
  if (!countryData) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Country 상세 정보</h1>
      <p><strong>Country ID:</strong> {countryData.countryId}</p>
      <p><strong>Country 이름:</strong> {countryData.country}</p>
      <p><strong>마지막 업데이트:</strong> {countryData.lastUpdate}</p>
      <button onClick={() => nav("/AddCity", { state: { countryId: countryData.countryId } })} className="bg-gray-300 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-lg transition">
        이 나라에 City 추가
      </button>
    </div>
  );
}
