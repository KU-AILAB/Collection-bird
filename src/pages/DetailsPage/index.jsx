import Footer from "../../layout/Footer/footer"
import Button from "../MainPage/Button"
import { IoIosArrowBack } from "react-icons/io"

export default function DetailPage() {

  return (
    <div style={{height: 'calc(100vh - 145px)', overflowY:'auto', marginTop:'91px'}}>
      <div className="pb-4 px-[90px] flex flex-col">

        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className='min-w-[120px] h-[38px] flex items-center justify-center gap-2 pe-[10px] bg-[#758C80] text-white rounded-md'>
              <IoIosArrowBack fontSize={24}/>
              <span className='flex items-center'>기록하기</span>
          </div>
          <div className="ml-auto flex gap-4">
            <Button/>
            <Button/>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-4 flex md:flex-row gap-8 flex justify-center">
          <div className="left w-3/8 flex">
            <img width={'450px'} style={{height: "280px", borderRadius:'8px'}} src="https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg" alt="" />
          </div>

          <div className="right w-4/8 text-left">
            <span className="font-[600] text-[19px] text-blue-900">관찰정보</span>
            <hr />
            <div className="flex gap-[18px] my-[12px] text-[14px]">
              <span className="text-[17px] font-[600]">관찰정보</span>
              <div className="grid">
                <span>경기 파주시 문발동</span>
                <span>도로명 경기도 파주시 직지길 84</span>
              </div>
            </div>
            <div className="flex gap-[18px] my-[12px] text-[14px]">
              <span className="text-[17px] font-[600]">관찰정보</span>
              <div className="grid">
                <span>강수량 0mm | 습도 73% | 풍속 10.3m/s</span>
              </div>
            </div>

            <div className="flex gap-[18px] my-[12px] text-[14px]">
              <span className="text-[17px] font-[600]">관찰정보</span>
              <div className="grid">
              <span>{'동물계 Animalia > 척삭동물문 Chordata > 조강 Aves'}</span>
              <span>{'Passeriformes > 지빠귀과 Turdidae > 지빠귀속 Turdus'}</span>
              <span className="my-3 text-red-600 text-[11px]">관심대상 적색목록</span>
              </div>
            </div>

            <div style={{marginLeft: "85px"}} className="flex gap-2 snap-start text-[11px] my-4">
              <button className="w-1/2 rounded-sm bg-white border-gray-500 py-1">환경부 국립생물자원관</button>
              <button className="w-1/2 rounded-sm bg-white border-gray-500 py-1">위키피디아 정보</button>
            </div>
          </div>
        </main>

        <div className="py-4 px-[70px]">
          <div className="flex gap-10">
            <button className="w-1/2 rounded-sm bg-[#758C80] text-white color-white border-gray-500 py-1">위키피디아 정보</button>
            <button className="w-1/2 rounded-sm border-gray-500 bg-[#E3EBE7] py-1">위키피디아 정보</button>
          </div>
          <div className="mt-4 flex">
            <textarea
              className="flex-1 bg-white p-3 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="댓글을 입력하세요"
              rows={3}
            />
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  )
}
