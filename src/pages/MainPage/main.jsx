import React from 'react'
import styles from "./page.module.css";
import { IoSearch } from 'react-icons/io5';
import SocialCard from './card';
import Button from './Button';
import { CiEdit } from 'react-icons/ci';

const Main = () => {
  return (
    <div className={styles.mineContainer}>
              {/* Search Section */}
              {/* <section id="top" className={styles.searchSection}>
                <div className="flex justify-between px-[20px]">
                  <div className="buttons flex gap-5">
                  <div className="all flex gap-3">
                    <Button label="전체" />
                    <Button label="식물" />
                    <Button label="동물" />
                    <Button label="곤충" />
                    <Button label="기타" />
                  </div>
                    <div className={styles.searchBar1}>
                      <span style={{padding:'8px 6px 6px 14px'}}><IoSearch fontSize={18} color='#758C80'  /></span>
                      <input type="text" placeholder="원하는 생물의 이름을 입력해주세요." className={styles.searchInput}/>
                    </div>
                  </div>
                  <div className='min-w-[120px] h-[38px] flex items-center justify-center gap-2 px-[18px] bg-[#758C80] text-white rounded-md'>
                      <CiEdit fontSize={24}/>
                      <span className='flex items-center'>기록하기</span>
                  </div>
                </div>
              </section> */}
              <section id="top" className={styles.searchSection}>
                {/* ✅ 고정 폭 컨테이너 추가 */}
                <div className={styles.searchContainer}>
                  <div className="flex justify-between w-full">
                    <div className="buttons flex gap-5">
                      <div className="all flex gap-3">
                        <Button label="전체" />
                        <Button label="식물" />
                        <Button label="동물" />
                        <Button label="곤충" />
                        <Button label="기타" />
                      </div>
                      <div className={styles.searchBar1}>
                        <span style={{ padding: '8px 6px 6px 14px' }}>
                          <IoSearch fontSize={18} color='#758C80' />
                        </span>
                        <input type="text" placeholder="원하는 생물의 이름을 입력해주세요." className={styles.searchInput} />
                      </div>
                    </div>

                    <div className='min-w-[120px] h-[38px] flex items-center justify-center gap-2 px-[18px] bg-[#758C80] text-white rounded-md'>
                      <CiEdit fontSize={24} />
                      <span className='flex items-center'>기록하기</span>
                    </div>
                  </div>
                </div>
              </section>
        
              {/* Observation Grid */}
              <main className={styles.main}>
                <div className={styles.observationGrid}>
                { [...Array(13)].map((_) => <SocialCard key={_}/>)}
                  </div>
              </main>
            </div>
  )
}

export default Main