import { CmingTitleStepper, Loading } from "./GeneralBody"
import { useEffect, useState } from 'react';
import { Card } from "@mui/material";
import instance from "../axios";
import useQuery from "../Hooks/useQuery";
import { useLocation } from "react-router-dom";
import Fade from 'react-reveal/Fade';

export default () => {
    const queryStr = useQuery();
    const step = queryStr.step;
    const location = useLocation();
    const [articleContent, setArticleContent] = useState([]);
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(false);
        const handleDataFetch = async() => {
            const url = () => {
                switch (step) {
                    case 0:
                        return "https://home.gamer.com.tw/artwork.php?sn=5106902";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5107872";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5108693";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5109541";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5106902";
                }
            }
            await instance.get("/api/getText", {params: {url: url()}}).then((res) => {
                setArticleContent(res.data);
                setLoaded(true);
            }).catch()
        }
        handleDataFetch();
    }, [location])
    return (
        <>
            <CmingTitleStepper title={"──　2007～2013：大學篇　──"} stepsContent={['連番打擊，沉迷末日預言', '網遊耍白，惹人厭惡', '仇視西醫，爺爺枉死','躲兵役到報考預官']}/>
            {
                loaded ? 
                    <Card sx={{width: "800px", margin: 'auto', marginTop: "48px"}}>
                        <div style={{margin: 32}}>
                            {articleContent.map((e,i) => <Fade left cascade><div key={i} style={{margin: "8px 0px"}}>{e}</div></Fade> )}
                        </div>
                    </Card> 
                    :   <Loading/>
            }
        </>
    )
}