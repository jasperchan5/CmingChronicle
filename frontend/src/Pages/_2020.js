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
                        return "https://home.gamer.com.tw/artwork.php?sn=5137638";
                    case 1:
                        return "https://home.gamer.com.tw/artwork.php?sn=5138589";
                    case 2:
                        return "https://home.gamer.com.tw/artwork.php?sn=5139455";
                    case 3:
                        return "https://home.gamer.com.tw/artwork.php?sn=5140278";
                    default:
                        return "https://home.gamer.com.tw/artwork.php?sn=5137638";
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
                <div className="eachPageTitle">2020</div>
            </div>
            <CmingTitleStepper title={""} stepsContent={[
                '決戰大潤發：砍班事件',
                '爽花錢拖債，對簿公堂：郭三泰事件',
                '恐怖情人大暴走',
                '小翠兒坎坷狗生謝幕'
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