import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import instance from './../axios';
import { Loading } from "./GeneralBody";
import Fade from "react-reveal/Fade"
export default () => {
    const [articleContent,setArticleContent] = useState([]);
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        const handleDataFetch = async() => {
            await instance.get("/api/getText", {params: {url: "https://home.gamer.com.tw/artwork.php?sn=5106282"}}).then((res) => {
                setArticleContent(res.data);
                setLoaded(true);
            }).catch()
        }
        handleDataFetch();
    }, [])
    return (
        <>
            <div style={{margin: 48, textAlign: "center"}}>
                <div className="eachPageTitle">序篇</div>
            </div>
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