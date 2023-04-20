import express from "express";
import stackOverFlowController from "./controllers/stackoverflowController.js";

const app = express();
/**
 * Get wikipedia controller
 * 
 * @access Public
 * @returns {string} - html
 */

app.get("/", async (req, res) =>{
    const query = req.query.q; // para elgir la palabra q quieres usar 
    const {title,question,votes,date,user} = await stackOverFlowController.getContent(query);
    // const data = await stackOverFlowController.getContent(query);
    // res.send (data);
    res.send(`
        <h1>${title}</h1>,
        <div>${question}</div>,
        <div>${votes}</div>,
        <div>${date}</div>,
        <div>${user}</div>,
        
    `);

});

app.listen(3999,() =>{
    console.log("server started on port 3999");
});
