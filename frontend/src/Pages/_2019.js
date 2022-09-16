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
            <div style={{margin: 48, textAlign: "center"}}>
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