const express  = require('express');
const {performance} = require('perf_hooks');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

let urls = []

app.get('/api/websites', (req, res) => {

    res.json(urls);

});
app.get('/api/websites/:id', (req, res) => {

    let id = Number(req.params.id);
    let url = urls.find(website => website.id === id);

    if (!url) {
        return res.json({ error: "id not found" });
    }

    res.json([url]);

});

app.post('/api/websites', async(req, res) => {

    if (req.body.url != null)
    {

        if (!isValidURL(req.body.url)) {
            return res.status(400).json({
            error: "Please enter a valid URL."
        });
        }

        let responseStatus = await checkWebsite(req.body.url);
        let textUrl;
     
        textUrl = {
            id: urls.length,
            url: req.body.url,
            HTTPstatus: responseStatus.status,
            responseTime: responseStatus.responseTime,
            isOnline: responseStatus.isUp
        };     

        urls.push(textUrl);
    
    }

    res.send(urls);
});

app.delete('/api/websites/:id', (req, res) => {

    let id = Number(req.params.id); 
    urls = urls.filter(website => website.id !== id);

    res.send(urls);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

async function checkWebsite(url){
    let response;
    let finalTime;

    try
    {
        let start = performance.now()
        response = await fetch(url);
        finalTime = performance.now() - start;

    }catch(error){
        return{status: null, responseTime:"Request Failed", isUp:false};
    }
    
    return {status: response.status, responseTime: finalTime, isUp: response.status >= 200 && response.status < 400};
}

function isValidURL(textUrl) {

    try {
        const parsedURL = new URL(textUrl);

        return parsedURL.protocol === 'http:' ||
               parsedURL.protocol === 'https:';
    } catch (error) {
        return false;
    }

}