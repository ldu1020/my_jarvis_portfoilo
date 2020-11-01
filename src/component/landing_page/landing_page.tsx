/** @format */

import { Button } from '@material-ui/core';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FunctionInfo from './funtion_info';
import styles from './landing_page.module.css';

const LandingPage = () => {
  const history = useHistory();
  const [LoginButotn_Y, setPerY] = useState(false);
  useLayoutEffect(() => {
    function handleScrollChange() {
      window.addEventListener('scroll', () => {
        let rect = LoginButotn_Ref.current?.getBoundingClientRect();
        rect && rect.y <= 0 ? setPerY(true) : setPerY(false);
      });
    }
    handleScrollChange();

    return () => {
      window.removeEventListener('scroll', handleScrollChange);
    };
  }, []);
  let LoginButotn_Ref = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.body}>
      <section className={styles.banner}>
        <div className={styles.textZone}>
          <div className={styles.text1}>
            <h5>
              <span className={styles.text1_accent}>자포자기</span>
              하기전에
            </h5>
            <h5>
              <span className={styles.text1_accent2}> 지피지기</span>
              [知己知彼]
            </h5>
          </div>
          <p className={styles.text2}>성장을 위한 나만의 비서</p>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>My Jarvis</h1>
            <div className={styles.buttonWrapper}>
              <Button
                className={styles.button}
                ref={LoginButotn_Ref}
                onClick={() => {
                  history.push('/login');
                }}>
                시작하기
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.imageZone}></div>
      </section>
      <section>
        <FunctionInfo checked={LoginButotn_Y} />
      </section>
      {LoginButotn_Y && (
        <Button
          className={`${styles.button} ${styles.Btn_Y}`}
          onClick={() => {
            history.push('/login');
          }}>
          시작하기
        </Button>
      )}
    </div>
  );
};

export default LandingPage;
