import { Box, CircularProgress, Card } from "@mui/material"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { useState, useEffect } from "react";

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import Jump from 'react-reveal/Jump';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

import { useLocation, useNavigate } from 'react-router-dom';
import useQuery from "../Hooks/useQuery";

const smallerLogo = "https://imgur.com/q6ZPcqB.png";

const Loading = () => {
  const [counter,setCounter] = useState(0);
  useEffect(() => {
    const addCounter = () => setInterval(() => setCounter(counter+1), 2500);
    addCounter();
    return () => clearInterval(addCounter);
  }, [counter])
  return (
    <Box sx={{width: "800px", height: "400px", margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <CircularProgress size={150}/>
      <Jump spy={counter}>
        <div style={{marginTop: 48, fontSize: "24px"}}>Loading...</div>
      </Jump>
    </Box>
  )
} 

const CmingTitleStepper = ({title,stepsContent,content}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const steps = stepsContent;
    const [show,setShow] = useState(false);
    useEffect(() => {
        const handleStickyShow = () => {
            if(window.scrollY > 300){
                setShow(true);
            }
            else setShow(false);
        }
        document.addEventListener('scroll',handleStickyShow);
        return () => document.removeEventListener('scroll',handleStickyShow);
    })
    const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
          color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
          color: '#784af4',
          zIndex: 1,
          fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        },
    }));
      
    function QontoStepIcon(props) {
        const { active, completed, className } = props;
      
        return (
          <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
              <Check className="QontoStepIcon-completedIcon" />
            ) : (
              <div className="QontoStepIcon-circle" />
            )}
          </QontoStepIconRoot>
        );
    }
      
    QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
    };
      
    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
    }));
      
    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;
      
        return (
          <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            <img style={{borderRadius: "50%", width: 45, height: 45, filter: active ? "" : "grayscale(100%)"}} src="https://imgur.com/Aj12lP8.png"/>
          </ColorlibStepIconRoot>
        );
    }
      
    ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
    };
      
    const CMingStepper= () => {
      const queryStr = useQuery();
      const step = queryStr.step;
      const [activeStep, setActiveStep] = useState(step !== undefined ? step : 0);
    
      const handleStep = (step) => () => {
        setActiveStep(step);
      };

      const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(steps.length,4),
        slidesToScroll: 4,
        dots: true
      };
    
      return (
        <Box sx={{ width: '90%', margin: "auto"}}>
            <Stepper alternativeLabel={true} nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={false}>
                  <StepButton onClick={() => {
                      handleStep(index);
                      navigate({pathname: location.pathname, search: `?step=${index}`})
                    }
                  }>
                      <StepLabel StepIconComponent={ColorlibStepIcon}><div style={{fontSize: '18px'}}>{label}</div></StepLabel>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
        </Box>
      );
    }

    return (
        <div id="Body">
            <div style={{margin: 48, textAlign: "center"}}>
                <div className="eachPageTitle">{title}</div>
            </div>
            <CMingStepper/>
            {
                show ? <StickyHeader header={
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                        <img style={{margin: 'auto', cursor: "pointer"}} onClick={() => navigate("/")} src={smallerLogo}/>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CMingStepper/>
                    </AccordionDetails>
                  </Accordion>
                }></StickyHeader> : <></>
            }
        </div>
    )
}

export { Loading, CmingTitleStepper }