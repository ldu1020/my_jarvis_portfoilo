/** @format */

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const colorTipData = [
  {
    title: 'Tip 1',
    description: `나만의 카테고리에 등록되지 않은 카테고리는 색상이 랜덤 배치되며 매 회 변경됩니다`,
    label: 'CustomCategory-Example',
    imgPath:
      'https://res.cloudinary.com/djer7hmlq/image/upload/c_scale,w_300/v1604200895/lqpp9l9iglvxvauxjzne.png',
  },
  {
    title: 'Tip 2',
    description: `등록된 카테고리는 그래프, 수행분석, 한 일 목록 등
    다양한 곳에 적용되니, 꼭 나만의 카테고리를 만들어 보세요`,
    label: 'CustomCategory-Example2',
    imgPath:
      'https://res.cloudinary.com/djer7hmlq/image/upload/c_scale,w_398/v1604200895/mzpgj2nvggt4hxjy1pyk.png',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    title: {
      marginBottom: '3rem',
    },
    header: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      whiteSpace: 'pre-line',
      backgroundColor: theme.palette.background.default,
    },
    img: {
      overflow: 'hidden',
      display: 'block',
      width: '100%',
    },
  })
);

export default function ColorTipStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = colorTipData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography className={classes.title} variant='h6'>
          {colorTipData[activeStep].title}
        </Typography>
        <span>{colorTipData[activeStep].description}</span>
      </Paper>
      <img
        className={classes.img}
        src={colorTipData[activeStep].imgPath}
        alt={colorTipData[activeStep].label}
      />
      <MobileStepper
        steps={maxSteps}
        position='static'
        variant='text'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
