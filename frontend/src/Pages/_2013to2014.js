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
                        return "https://home.gamer.com.tw/artwork.php?sn=5110470";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5111472";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5110470";
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
            <CmingTitleStepper title={"2013～2014：從軍篇"} stepsContent={['成功嶺入伍，怒噴台大','安岱輔導長，狗才當兵']}/>
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