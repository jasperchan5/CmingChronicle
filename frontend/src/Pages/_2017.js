import { CmingTitleStepper, Loading } from "./GeneralBody"
import { useEffect, useState } from 'react';
import { Card, Button } from "@mui/material";
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
                        return "https://home.gamer.com.tw/artwork.php?sn=5126294";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5127174";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5127978";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5128829";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5126294";
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
            <div style={{margin: "48px 0px", textAlign: "center"}}>
                <div className="eachPageTitle">2017</div>
            </div>
            <CmingTitleStepper title={""} stepsContent={[
                '吃布丁做瑜珈事件',
                '投資/斗內/網拍/貼圖，多方斂財求致富',
                'Lancer 1.6法拍始末',
                '戀情急凍：汞中毒腎衰竭事件'
                ]}
            />
            {
                loaded ? 
                <Card className="contentCard">
                    <div style={{margin: 32}}>
                        {articleContent.map((e,i) => 
                            <Fade key={i} left cascade>
                                {e.href === "" ? <div key={i} style={{margin: "8px 0px"}}>{e.text}</div> : <Button sx={{fontSize: "16px", padding: "12px", margin: "12px 0px", border: "1px solid #20232550"}} onClick={() => window.location.href = e.href}>{e.text}</Button>}
                            </Fade> 
                        )}
                    </div>
                </Card> 
                :   <Loading/>
            }
        </>
    )
}