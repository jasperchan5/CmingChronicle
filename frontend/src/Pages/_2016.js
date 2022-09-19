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
                        return "https://home.gamer.com.tw/artwork.php?sn=5115102";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5119147";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5120131";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5121003";
                    case 4:
                        return "https://home.gamer.com.tw/artwork.php?sn=5121850";
                    case 5:
                        return "https://home.gamer.com.tw/artwork.php?sn=5122690";
                    case 6:
                        return "https://home.gamer.com.tw/artwork.php?sn=5124362";
                    case 7:
                        return "https://home.gamer.com.tw/artwork.php?sn=5125319";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5115102";
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
                <div className="eachPageTitle">2016：小霸主篇</div>
            </div>
            <CmingTitleStepper title={""} stepsContent={[
                '轉戰FB場外，小霸主揚名',
                '自作多情：蔓蔓事件和燈節事件',
                '大眾證性騷擾離職，留下爛攤',
                '借錢亂花：李仁豪事件和警方約談事件',
                '混亂8月開端：011事件（上）',
                '混亂8月：011（下）+ 何姿萱 + 王怡 + 挨打事件',
                '拖欠學貸',
                '合菜事件'
                ]}
            />
            {
                loaded ? 
                <Card sx={{width: "800px", margin: 'auto', marginTop: "48px"}}>
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