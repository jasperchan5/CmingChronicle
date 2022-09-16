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
                        return "https://home.gamer.com.tw/artwork.php?sn=5167842";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5172719";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5309459";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5352863";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5167842";
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
                <div className="eachPageTitle">2021</div>
            </div>
            <CmingTitleStepper title={""} stepsContent={[
                '自取其辱：戀愛公社社友反擊',
                '朽木不可雕：網路賣煙與戶外進食事件',
                '暴虎馮河，慘遭處刑：賣菸訴訟後續',
                '訴訟連敗，告黑粉徒勞無功'
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