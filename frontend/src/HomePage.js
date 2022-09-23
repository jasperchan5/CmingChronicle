import { Card } from "@mui/material"
import { useState, useEffect } from "react"
import Slider from 'react-slick'
import { IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useWindowSize from './Hooks/useWindowSize';

export default () => {
    const { windowWidth } = useWindowSize();
    const [lgVideos,setLgVideos] = useState([
        <iframe style={{display: "block", margin: "auto"}} width="800" height="500" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        <iframe style={{display: "block", margin: "auto"}} width="800" height="500" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        <iframe style={{display: "block", margin: "auto"}} width="800" height="500" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
    ]);
    const [smVideos,setSmVideos] = useState([
        <iframe style={{display: "block", margin: "auto"}} width="280" height="200" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        <iframe style={{display: "block", margin: "auto"}} width="280" height="200" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        <iframe style={{display: "block", margin: "auto"}} width="280" height="200" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
    ]);
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    }
    return (
        <div>    
            <Card className="contentCard">
                <div style={{margin: 32, textAlign: "center"}}>
                    <div>本網站旨在記錄散戶中的霸主──王希銘之事蹟。</div>
                </div>
            </Card>
            <Card className="contentCard">
                <div style={{margin: 32, textAlign: "center"}}>
                    <div>霸主經典影片回顧</div>
                </div>
            </Card>
            { windowWidth > 1200 ?
                <Card sx={{margin: "24px auto", padding: "36px", width: "1200px", height: "500px"}}>
                    <Slider {...setting}>
                        {lgVideos.map((e,i) => <div style={{display: "flex", justifyContent: "center"}} key={i}>{e}</div>)}
                    </Slider>
                </Card>
                : 
                <Card sx={{margin: "24px auto", width: "100%", height: "300px"}}>
                    <Slider {...setting}>
                        {smVideos.map((e,i) => <div style={{display: "flex", justifyContent: "center"}} key={i}>{e}</div>)}
                    </Slider>
                </Card>
            }
        </div>
    )
}