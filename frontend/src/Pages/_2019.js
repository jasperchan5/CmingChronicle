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
                        return "https://home.gamer.com.tw/artwork.php?sn=5134114";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5134994";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5135806";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5136722";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5134114";
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
                <div className="eachPageTitle">2019</div>
            </div>
            <CmingTitleStepper title={""} stepsContent={[
                'Gap Year：吃喝玩樂+筆戰港人+職訓躲教召，一事無成',
                '被害妄想惡化：唐吉軻德大戰千面人',
                '賭博唐氏錄：put慘賠和秦浩事件',
                '常客變奧客：大鬧饗食/威尼斯/168/全真'
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