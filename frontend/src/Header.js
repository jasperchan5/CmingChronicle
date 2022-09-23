import './App.css';
import { useState } from 'react';
import { Box } from '@mui/system';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuIcon from '@mui/icons-material/Menu';
import { SpeedDialIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';

import useWindowSize from './Hooks/useWindowSize';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const logo = "https://imgur.com/tA3XO20.png";

const pages = ['Products', 'Pricing', 'Blog'];
const articles = [
  { text: <div className='menuText'>序篇</div>, to: "/prologue"},
  { 
    text: <div className='menuText'>2007～2013：大學篇</div>, 
    to: "/2007to2013", 
    subArticles: [
      {text: <div className='menuText'>連番打擊，沉迷末日預言</div>, to: "/2007to2013/part1"},
      {text: <div className='menuText'>網遊耍白，惹人厭惡</div>, to: "/2007to2013/part2"},
      {text: <div className='menuText'>仇視西醫，爺爺枉死</div>, to: "/2007to2013/part3"},
      {text: <div className='menuText'>躲兵役到報考預官</div>, to: "/2007to2013/part4"},
    ]
  },
  { text: <div className='menuText'>2013～2014：從軍篇</div>, to: "/2013to2014"},
  { text: <div className='menuText'>2015：家樂福篇</div>, to: "/2015"},
  { text: <div className='menuText'>2016：小霸主篇</div>, to: "/2016"},
  { text: <div className='menuText'>2017</div>, to: "/2017"},
  { text: <div className='menuText'>2018</div>, to: "/2018"},
  { text: <div className='menuText'>2019</div>, to: "/2019"},
  { text: <div className='menuText'>2020</div>, to: "/2020"},
  { text: <div className='menuText'>2021</div>, to: "/2021"},
  { text: <div className='menuText'>2022</div>, to: "/2022"},
  { text: <div className='menuText'>其他</div>, to: "/others"},
];


export default () => {
  const navigate = useNavigate();
  const { windowWidth } = useWindowSize();
  const LGHeader = () => {
    const Menu = () => {
      return (
        <Box sx={{width: "112px", height: "56px", transform: 'translateZ(0px)', position: 'absolute'}}>
            <SpeedDial
              direction='down'
              ariaLabel="SpeedDial openIcon example"
              sx={{'& .MuiFab-primary': { backgroundColor: '#F7F9FA', '&:hover': {backgroundColor: '#F7F9FA'}}}}
              icon={<SpeedDialIcon sx={{color: "black"}} openIcon={<MenuIcon/>}/>}
            >
                  {articles.map((e,i) => (
                    <SpeedDialAction
                      onClick={() => navigate(e.to)}
                      sx={{width: "288px", height: "32px", borderRadius: "5px", boxShadow: "4px 4px 8px #202325", marginLeft: "244px", marginTop: i === 0 ? "48px" : "12px"}}
                      key={i}
                      icon={e.text}
                      tooltipTitle={""}
                    />
                  ))}
            </SpeedDial>
        </Box>
      )
    }
    return (
      <div id="Header">
        <Box sx={{width: "112px", height: "56px", position: "relative", zIndex: 2}}><Menu/></Box>
        <Box sx={{width: "144px", height: "56px", position: "relative", zIndex: 2}}><Fab variant='extended' sx={{width: "144px", height: "56px" }} className='chronology' onClick={() => navigate("/chronology")}>大事年表</Fab></Box>
        <Box sx={{width: "100%", height: "144px", display: "flex", justifyContent: "center", position: "absolute", zIndex: 1}}><img className='logo' onClick={() => navigate("/")} src={logo}/></Box>
      </div>
    )
  }
  const MDHeader = () => {
    const Menu = () => {
      return (
        <Box sx={{width: "112px", height: "56px", transform: 'translateZ(0px)', position: 'absolute'}}>
            <SpeedDial
              direction='down'
              ariaLabel="SpeedDial openIcon example"
              sx={{'& .MuiFab-primary': { backgroundColor: '#F7F9FA', '&:hover': {backgroundColor: '#F7F9FA'}}}}
              icon={<SpeedDialIcon sx={{color: "black"}} openIcon={<MenuIcon/>}/>}
            >
                  {articles.map((e,i) => (
                    <SpeedDialAction
                      onClick={() => navigate(e.to)}
                      sx={{width: "244px", height: "32px", borderRadius: "5px", boxShadow: "4px 4px 8px #202325", marginLeft: "220px", marginTop: i === 0 ? "48px" : "12px"}}
                      key={i}
                      icon={e.text}
                      tooltipTitle={""}
                    />
                  ))}
            </SpeedDial>
        </Box>
      )
    }
    return (
      <div id="Header">
        <Box sx={{width: "112px", height: "56px", position: "relative", zIndex: 2}}><Menu/></Box>
        <Box sx={{width: "144px", height: "56px", position: "relative", zIndex: 2}}><Fab variant='extended' sx={{width: "144px", height: "56px" }} className='chronology' onClick={() => navigate("/chronology")}>大事年表</Fab></Box>
        <Box sx={{width: "100%", height: "144px", display: "flex", justifyContent: "center", position: "absolute", zIndex: 1}}><img className='logo' onClick={() => navigate("/")} src={logo}/></Box>
      </div>
    )
  }
  const SMHeader = () => {
    const Menu = () => {
      return (
        <Box sx={{width: "112px", height: "56px", transform: 'translateZ(0px)', position: 'absolute'}}>
            <SpeedDial
              direction='down'
              ariaLabel="SpeedDial openIcon example"
              sx={{'& .MuiFab-primary': { backgroundColor: '#F7F9FA', '&:hover': {backgroundColor: '#F7F9FA'}}}}
              icon={<SpeedDialIcon sx={{color: "black"}} openIcon={<MenuIcon/>}/>}
            >
                  {articles.map((e,i) => (
                    <SpeedDialAction
                      onClick={() => navigate(e.to)}
                      sx={{width: "288px", height: "32px", borderRadius: "5px", boxShadow: "10px 10px 30px #202325", marginTop: i === 0 ? "48px" : "12px"}}
                      key={i}
                      icon={e.text}
                      tooltipTitle={""}
                    />
                  ))}
            </SpeedDial>
        </Box>
      )
    }
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <div id="Header">
          <Box sx={{width: "100%", height: "108px", display: "flex", justifyContent: "center", zIndex: 1}}><img className='logo' onClick={() => navigate("/")} src={logo}/></Box>
        </div>
        <Accordion sx={{width: "100%"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className='menuText' style={{margin: "auto"}}>點選以展開 / 收起</div>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{width: "144px", height: "56px", margin: "auto", position: "relative", zIndex: 2}}><Fab variant='extended' sx={{width: "144px", height: "56px", fontSize: "18px", fontFamily: 'Zen Antique, serif', backgroundColor: "#F7F9FA", position: "absolute" }} className='chronology' onClick={() => navigate("/chronology")}>大事年表</Fab></Box>
            <Box sx={{width: "112px", height: "56px", margin: "24px auto", position: "relative", zIndex: 2}}><Menu/></Box>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  }
  return windowWidth > 1368 ? <LGHeader/> : windowWidth > 767 ? <MDHeader/> : <SMHeader/>;
};