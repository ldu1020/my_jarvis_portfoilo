/** @format */

import { Button, Checkbox, Paper, TextField } from '@material-ui/core';
import React, { useRef } from 'react';
import styles from './get_start_main.module.css';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PieChartIcon from '@material-ui/icons/PieChart';
import AddIcon from '@material-ui/icons/Add';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

const GetStartMain = () => {
  const whatDoneRef = useRef<HTMLDivElement | null>(null);
  const toDoRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className={styles.root}>
      <h1>도움말</h1>
      <nav className={styles.nav}>
        <h5>목차</h5>
        <button
          onClick={() => {
            toDoRef.current && toDoRef.current.scrollIntoView();
          }}>
          할 일 목록
        </button>
        <button
          onClick={() => {
            whatDoneRef.current && whatDoneRef.current.scrollIntoView();
          }}>
          한 일 목록
        </button>
      </nav>

      <Paper className={styles.paper} ref={toDoRef}>
        <h2 className={styles.title}>
          <PlaylistAddCheckIcon className={styles.titleIcon} /> 할 일 목록
        </h2>
        <h3 className={styles.subTitle}>#토픽 리스트</h3>
        <ul>
          <li>
            <Button className={styles.topicBtn}>
              <AddIcon />
              Topic
            </Button>
            을 누름으로써 주제를 추가할 수 있습니다.
          </li>
          <li>작성된 주제는 다음날이 되어도 사라지지 않습니다.</li>
        </ul>
        <h3 className={styles.subTitle}>#하위목록</h3>
        <ul>
          <li>
            <TextField
              className={styles.textField}
              label='언제까지'
              type='time'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ readOnly: true }}
            />
            의 시간설정은 옵션(선택사항)이며 설정 할 시 남은시간이 표시되고
            설정하지 않거나 시간 도달 시 남은시간은 표시되지 않습니다.
          </li>
          <li>
            <Checkbox
              icon={<AlarmOnIcon className={styles.icon} />}
              size='small'
              checkedIcon={<AlarmOnIcon className={styles.icon} />}
            />
            는 시간설정 시 에만 동작하며 시간설정을 하지않고 체크할 시 약 1초
            뒤에 자동으로 체크됩니다.
          </li>
          <li>하위 체크리스트는 다음날이 되면 사라집니다.</li>
        </ul>
        <h3 className={styles.subTitle}>#그래프 및 달성지표</h3>
        <ul>
          <li>
            달성률을 보여주는 원형그래프는 토픽에 상관없이 전체 하위 목록을
            조회합니다.
          </li>
          <li>
            달성률 데이터는 날짜별로 저장되어 전날대비 달성률 분석에 쓰입니다.
          </li>
        </ul>
      </Paper>
      <Paper className={styles.paper} ref={whatDoneRef}>
        <h2 className={styles.title}>
          <PieChartIcon className={styles.titleIcon} />한 일 목록
        </h2>
        <h3 className={styles.subTitle}>#시간</h3>
        <ul>
          <li>
            입력되는 시간은
            <span className={styles.strong}> 카테고리 별 합산</span>으로 나누어
            집니다.
          </li>
          <li>
            가장 할애한 시간이 많은 3가지가 퍼센트에이지(%)로 표시가 되지만
            그래프에 마우스를 올리면 카테고리 별 할애 시간을 볼 수 있습니다.
          </li>
        </ul>
        <h3 className={styles.subTitle}>#카테고리</h3>
        <ul>
          <li>
            페이지에 동작이 일어날때마다 그래프의 색상은
            <span className={styles.strong}> 랜덤배치</span> 되지만 하단의
            나만의 카테고리 란에 자신의 색깔을
            <span className={styles.strong}> 커스텀하여</span>하여 등록 할 수
            있습니다.
          </li>
          <li>
            등록된 카테고리는 동일한 카테고리명이 쓰이는 모든 곳에 적용되어 이후
            페이지에 동작이 일어나도 변하지 않습니다.
          </li>
          <li>
            히루가 지나면 한 일 목록은 모두 사라지지만 커스텀 화 된 카테고리의
            정보와 그 카테고리 별 할애시간 데이터는 저장되어 이후 수행분석 란에
            데이터로 쓰입니다.
          </li>
        </ul>
        <h3 className={styles.subTitle}>#수행분석</h3>
        <ul>
          <li>
            수행분석 란 에서는 원하는 날짜만큼의 데이터를 조회 해 볼 수 있지만
            데이터가 없는 날은 조회되지 않습니다.
          </li>
          <li>
            전체목록 조회는 해당 기간동안 카테고리별 할애시간을 총량이 높은
            순서대로 보여주고
          </li>
          <li>
            각 항목 조회는 해당 기간동안 날짜 순으로 해당 항목의 할애시간을
            보여줍니다.
          </li>
        </ul>
      </Paper>
    </section>
  );
};

export default GetStartMain;
