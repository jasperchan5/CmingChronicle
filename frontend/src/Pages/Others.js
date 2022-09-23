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
                        return "https://home.gamer.com.tw/artwork.php?sn=5141116";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5141942";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5151654";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5161073";
                    case 4:
                        return "https://home.gamer.com.tw/artwork.php?sn=5206547";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5141116";
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
                <div className="eachPageTitle">其他</div>
            </div>
            <CmingTitleStepper title={""} stepsContent={[
                '特輯（1）-Yahoo奇摩知識＋問答集',
                '特輯（2）-騷擾訊息集',
                '特輯（3）-對女友潑髒水集',
                '特輯（4）-自稱交往期間喊單身/徵女友/約浪漫集',
                '特輯（5）-退休俸花費試算'
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