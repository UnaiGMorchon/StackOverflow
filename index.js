import express from "express";
import stackOverFlowController from "./controllers/stackoverflowController.js";

const app = express();
/**
 * Get stackoverflow controller
 * 
 * @access Public
 * @returns {string} - html
 */

app.get("/", async (req, res) =>{
    const query = req.query.q; // para elgir la palabra q quieres usar 
    const {title,question,answers} = await stackOverFlowController.getContent(query);
    // const data = await stackOverFlowController.getContent(query);
    // res.send (data);
    res.send(`
    <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
    <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=5e2d45054eda">
        <h1>${title}</h1>
        <div>${question}</div>
        <div>${question.user}</div>
        <div>${question.votes}</div>
        <div>${question.question}</div>
        <div>${answers.map((answer) => `
            <div>${answer.user}</div>
            <div>${answer.votes}</div>
            <div>${answer.date}</div>
            `).join("")} </div>
    `);

});

app.listen(3999,() =>{
    console.log("server started on port 3000");
    
});
