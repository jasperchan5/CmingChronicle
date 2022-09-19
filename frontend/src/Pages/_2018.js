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
                        return "https://home.gamer.com.tw/artwork.php?sn=5129641";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5130536";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5131422";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5132389";
                    case 4:
                        return "https://home.gamer.com.tw/artwork.php?sn=5133282";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5129641";
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
                <div className="eachPageTitle">2018</div>
            </div>
            <CmingTitleStepper title={""} stepsContent={[
                '女友忍無可忍，分手大作戰',
                '一波三折，再入營做白工',
                '態度擺爛，永豐金資遣',
                '祖孫對峙，樹屋爭奪戰',
                '窮爸爸總監'
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