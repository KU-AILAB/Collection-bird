import React from 'react'
import styles from "./page.module.css";
import { ImMenu } from 'react-icons/im';
import { CgMenuGridR } from 'react-icons/cg';
import { IoLocationSharp, IoSearch } from 'react-icons/io5';
import SocialCard from './card';

const Main = () => {
  return (
    <div className={styles.mineContainer}>
              {/* Search Section */}
              <section id="top" className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <div className={styles.searchBar}>
                    <span className={styles.categorySelector}>All Categories</span>
                    <div className={styles.searchBar1}>
                      <input type="text" placeholder="Search by species name or location..." className={styles.searchInput}/>
                      <span style={{padding:'8px 14px 6px 6px'}}><IoSearch fontSize={18} /></span>
                    </div>
                  </div>
                  <div className={styles.observationCount}>
                    <p>Observations: <span style={{fontWeight:"600", color:"#1e3a8a"}}>2,277,659</span></p>
                    <div className={styles.viewButtons}>
                      <span className={styles.viewButton}><ImMenu color="#1e3a8a" fontSize={21} /></span>
                      <span className={styles.viewButton}><CgMenuGridR color="#1e3a8a" fontSize={21} /></span>
                      <span className={styles.viewButton}><IoLocationSharp color="#1e3a8a" fontSize={21} /></span>
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