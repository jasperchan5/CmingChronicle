import { Card } from "@mui/material"
import { useState, useEffect } from "react"
import Slider from 'react-slick'
import { IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default () => {
    const [videos,setVideos] = useState([
        <iframe style={{display: "block", margin: "auto"}} width="800" height="500" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        <iframe style={{display: "block", margin: "auto"}} width="800" height="500" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        <iframe style={{display: "block", margin: "auto"}} width="800" height="500" src="https://www.youtube.com/embed/chSIZNF35-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
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
            <Card sx={{width: "800px", margin: 'auto', marginTop: "48px"}}>
                <div style={{margin: 32, textAlign: "center"}}>
                    <div>本網站旨在記錄散戶中的霸主──王希銘之事蹟。</div>
                </div>
            </Card>
            <Card sx={{width: "800px", margin: 'auto', marginTop: "48px"}}>
                <div style={{margin: 32, textAlign: "center"}}>
                    <div>霸主經典影片回顧</div>
                </div>
            </Card>
            <Card sx={{margin: "24px auto", padding: "36px", width: "1200px", height: "500px"}}>
                <Slider {...setting}>
                    {videos.map((e,i) => <div style={{display: "flex", justifyContent: "center"}} key={i}>{e}</div>)}
                </Slider>
            </Card>
        </div>
    )
}