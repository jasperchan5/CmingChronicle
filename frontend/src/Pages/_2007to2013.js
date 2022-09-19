import { CmingTitleStepper, Loading } from "./GeneralBody"
import { useEffect, useState } from 'react';
import { Card, Button } from "@mui/material";
import instance from "../axios";
import useQuery from "../Hooks/useQuery";
import { useLocation } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import useParseUrl from "../Hooks/useParseUrl";

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
                            {articleContent.map((e,i) => 
                                <Fade key={i} left cascade>
                                    {e.href === "" ? 
                                        <Card sx={{background: "#20232550", margin: "12px 0px"}}><div key={i} style={{padding: "12px"}}>{e.text}</div></Card> : 
                                            e.href.indexOf("imgur") !== -1 ? 
                                            <Card sx={{padding: "12px"}}>
                                                <img width={"100%"} style={{margin: "12px 0px"}} src={useParseUrl(e.href)["https://ref.gamer.com.tw/redir.php?url"]}/>
                                            </Card> : 
                                        <Button sx={{fontSize: "16px", padding: "12px", margin: "12px 0px", border: "1px solid #20232550"}} onClick={() => window.location.href = e.href}>{e.text}</Button>
                                    }
                                </Fade> 
                            )}
                        </div>
                    </Card> 
                    :   <Loading/>
            }
        </>
    )
}