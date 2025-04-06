import { FaClock, FaCloud, FaRegUserCircle, FaShareAlt } from "react-icons/fa"
import { CiCircleChevRight } from "react-icons/ci"
import { IoLocationSharp } from "react-icons/io5"
import { GrLayer } from "react-icons/gr"
import Map from "./map"
import Footer from "../../layout/Footer/footer"

export default function DetailPage() {

  const nextImage = () => {
    console.log(1)
  }

  const prevImage = () => {
    console.log(1)
  }


  return (
    <div style={{height: 'calc(100vh - 145px)', overflowY:'auto'}}>
      <div className="pb-4 px-[90px] flex flex-col">

        {/* Bird Information Header */}
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-900 text-white rounded-full p-2">
              <span>🐦</span>
            </div>
            <div className="bg-blue-700 text-white rounded-full p-2">
              <span>🌍</span>
            </div>
            <h1 className="text-2xl font-bold">노랑지빠귀</h1>
            <span className="text-gray-500 italic">Turdus naumanni</span>
          </div>
          <div className="ml-auto flex gap-4">
            <div onClick={prevImage} className="text-gray-500 flex items-center gap-1">
              <CiCircleChevRight style={{transform: 'rotate(180deg)'}} size={24} />
              <span> 이전</span>
            </div>
            <div onClick={nextImage} className="text-gray-500 flex items-center gap-1">
              <span> 다음</span>
              <CiCircleChevRight size={24} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-4 flex md:flex-row gap-8">
          <div className="left w-5/8">
            <img width={'740px'} src="https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg" alt="" />
          
          <div className="py-6">
            <div className="flex items-center">
              <div className="relative mr-3">
                <img className="w-10 h-10 rounded-full" src="https://dnwm9zq2dr65n.cloudfront.net/production/profile/2024/10/10/crop/profile_1010071258813_50115_981_crop.jpg" alt="User avatar" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-start">구진영</h3>
                <p className="text-sm text-gray-500">2025년 4월 4일 오전 1:22</p>
              </div>
            </div>

            {/* Interaction buttons */}
            <div className="flex gap-5 items-center space-x-4 py-[50px] border-b border-gray-100">
              <div className="flex items-center text-gray-600 hover:text-gray-900">
                <FaRegUserCircle size={18} className="mr-1" />
                <span>공감 55</span>
              </div>

              <div className="flex items-center text-gray-600 hover:text-gray-900">
                <GrLayer size={18} className="mr-1" />
                <span>모아보기 0</span>
              </div>

              <div className="flex items-center text-gray-600 hover:text-gray-900">
                <FaShareAlt size={18} className="mr-1" />
                <span>공유</span>
              </div>
            </div>

            <div className="mt-4 flex">
              <textarea
                className="flex-1 bg-white p-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="댓글을 입력하세요"
                rows={2}
              />
              <button className="ml-2 px-2 rounded-none bg-gray-100 hover:bg-gray-200 text-gray-800 bg-white p-3 border border-gray-200 h-20">게시</button>
            </div>
        </div>

          </div>


          <div className="right w-3/8 text-left">
            <span className="font-[600] text-blue-900">관찰정보</span>
            <hr />
            <div className="flex gap-[10px] my-[12px] text-[14px]">
              <span className="mt-1 text-[17px]"><IoLocationSharp/></span>
              <div className="grid">
                <span className="font-[600]">위치</span>
                <span>경기 파주시 문발동</span>
                <span>도로명 경기도 파주시 직지길 84</span>
              </div>
            </div>
            <div className="flex gap-[10px] my-[12px] text-[14px]">
              <span className="mt-1 text-[17px]"><IoLocationSharp/></span>
              <div className="grid">
                <span className="font-[600]">고도</span>
                <span>정보가 없습니다.</span>
              </div>
            </div>
            <div className="flex gap-[10px] my-[12px] text-[14px]">
              <span className="mt-1 text-[16px]"><FaCloud/></span>
              <div className="grid">
                <span className="font-[600]">날씨</span>
                <span>구름 | 기온 3.6℃ | 강수량 0mm | 습도 73% | 풍속 10.3m/s</span>
              </div>
            </div>
            <div className="flex gap-[10px] my-[12px] text-[14px]">
              <span className="mt-1 text-[16px]"><FaClock /></span>
              <div className="grid">
                <span className="font-[600]">관찰시각</span>
                <span>2025년 3월 20일 오전 9시</span>
              </div>
            </div>

            <div className="flex w-[350px] my-6 border-grey-500 h-[210px]">
              <Map/>
            </div>
            
            <span className="font-[600] text-blue-900">생태정보</span>
            <hr />

            <div className="grid text-[14px]">
              <span className="font-[600]">분류체계</span>
              <span>{'동물계 Animalia > 척삭동물문 Chordata > 조강 Aves > 참새목'}</span>
              <span>{'Passeriformes > 지빠귀과 Turdidae > 지빠귀속 Turdus'}</span>
              <span className="my-4 text-red-600">관심대상(LC) IUCN적색목록3.1(2017)</span>
            </div>

            <div className="flex gap-2 text-[11px] my-4">
              <button className="w-1/2 rounded-none bg-gray-300 py-1">환경부 국립생물자원관</button>
              <button className="w-1/2 rounded-none bg-gray-300 py-1">위키피디아 정보</button>
            </div>

            <span className="font-[600]">관련 이미지</span>

            <div className="flex gap-1 cursor-pointer">
              <div className="w-1/2">
                <img className="w-full h-[185px]" src="https://live.staticflickr.com/65535/54259310626_c8648a2c81.jpg" alt="" />
              </div>
              <div className="grid grid-flow-col grid-rows-2 gap-1">
                <img  className="w-[92px] h-[90px]" src="https://live.staticflickr.com/65535/53629450923_83ae0541ff.jpg" alt="" />
                <img  className="w-[92px] h-[90px]" src="https://live.staticflickr.com/65535/53629450923_83ae0541ff.jpg" alt="" />
                <img  className="w-[92px] h-[90px]" src="https://live.staticflickr.com/65535/53629450923_83ae0541ff.jpg" alt="" />
                <img  className="w-[92px] h-[90px]" src="https://live.staticflickr.com/65535/53629450923_83ae0541ff.jpg" alt="" />
              </div>
            </div>

          </div>
        </main>

      </div>
      <Footer/>
    </div>
  )
}
