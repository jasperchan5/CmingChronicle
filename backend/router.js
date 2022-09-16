import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const router = express.Router();

router.get("/getText", async(req,res) => {
    const url = req.query.url;
    // const browser = await puppeteer.launch({ headless: false }); 
    // const page = await browser.newPage(); 
    // await page.goto(url); 
    // const pageHTML = await page.content();
    // const $ = cheerio.load(pageHTML);
    const pageHTML = await axios.get(url).then();
    const $ = cheerio.load(pageHTML.data);
    let response = []
    $('#article_content').find("div").each((i,e) =>{
        let toPush = "";
        if($(e).find("a")){
            console.log($(e).text());
            $(e).find("a").each((_,e) => toPush = $(e).attr("href"));
            response.push(toPush);
        }
        else{
            let toPush = $(e).text();
            while(toPush.indexOf("(") !== -1){
                toPush = toPush.replace("(","（")
            }
            while(toPush.indexOf(")") !== -1){
                toPush = toPush.replace(")","）")
            }
            response.push(toPush);
        }
    })

    res.status(200).send(response);
})

router.get("/getChronology", async(_,res) => {
    const pageHTML = await axios.get("https://home.gamer.com.tw/artwork.php?sn=5106299").then();
    const $ = cheerio.load(pageHTML.data)
    let response = []
    $('#article_content').find("div").each((i,e) =>{
        if(i > 1){
            toPush = $(e).text();
            while(toPush.indexOf("(") !== -1){
                toPush = toPush.replace("(","（")
            }
            while(toPush.indexOf(")") !== -1){
                toPush = toPush.replace(")","）")
            }
        }
        response.push(toPush);
    })
    res.status(200).send(response);
})

export default router;