import { Card, CircularProgress, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import instance from "../axios";
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import { Loading } from "./GeneralBody";

export default () => {
    const [articleContent, setArticleContent] = useState([]);
    const [loaded,setLoaded] = useState(false);
    useEffect(() => {
        const handleDataFetch = async() => {
            await instance.get("/api/getChronology").then((res) => {
                setArticleContent(res.data);
                setLoaded(true);
            })
        }
        handleDataFetch();
    }, [])
    const DateAndContent = ({text}) => {
        let dateIdx = text.lastIndexOf("日") === -1 ? text.lastIndexOf("月") : text.lastIndexOf("日");
        if(text === "1月16日邊緣生日趴網聚" || text === "5月5日向郭三泰借2500元，約定7月15日還2688元"){
            dateIdx = text.indexOf("日");
        }
        if(text === "12月16還清拖欠郭三泰1088元並封鎖"){
            text = "12月16日還清拖欠郭三泰1088元並封鎖";
            dateIdx = text.indexOf("日");
        }
        const date = text.slice(0,dateIdx+1);
        const content = text.slice(dateIdx+1);
        return (
            <Fade left cascade>
                <Grid container spacing={2}>
                    <Grid item lg={3}>
                        <Fade down cascade>
                            {date === "" ? <></> : <Card style={{margin: "8px 0px", padding: "8px 0px", background: "#DE3163", color: "#FFF"}}>{date}</Card>}
                        </Fade>
                    </Grid>
                    <Grid item lg={9}>
                        <Fade down cascade>
                            {content === "" ? <></> : <Card style={{margin: "8px 0px", padding: "8px 0px"}}>{content}</Card>}
                        </Fade>
                    </Grid>
                </Grid>
            </Fade>
        )
    }
    return (
        <div>
            <div className="eachPageTitle">大事年表</div>
            <hr></hr>
            { loaded ? <Bounce up>
                <Card sx={{width: "800px", margin: 'auto', marginTop: "48px"}}>   
                    <div style={{margin: 32, textAlign: "center"}}>
                        {articleContent.map((e,i) =>  e.match(/\d+\年{0,1}\：{1}/) 
                        ?   <Bounce left cascade>
                                <Card sx={{margin: "12px 0px", padding: "12px 0px", background: "#AD1546", fontSize: "20px", color: "#F7F9FA"}} key={i}>
                                    {e}
                                </Card>
                            </Bounce> 
                        :   <DateAndContent text={e}/>)}
                    </div>  
                </Card>
            </Bounce> : <Loading/>}
        </div>
    )
}