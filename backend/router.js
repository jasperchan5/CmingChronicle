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
    $('#article_content').find("div").each((_,e) =>{
        let toPush = {text: $(e).text(), href: ""};
        $(e).find("a").each((_,f) => toPush = {text: $(f).text(), href: $(f).attr("href")});
        if(toPush !== {text: '', href: ''}){
            response.push(toPush);
        }
    })
    // console.log(response);
    res.status(200).send(response);
})

router.get("/getChronology", async(_,res) => {
    const pageHTML = await axios.get("https://home.gamer.com.tw/artwork.php?sn=5106299").then();
    const $ = cheerio.load(pageHTML.data)
    let response = []
    $('#article_content').find("div").each((i,e) =>{
        let toPush = "";
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