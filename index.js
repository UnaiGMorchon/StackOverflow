import express from "express";
import stackOverFlowController from "./controllers/stackoverflowController.js";
import path  from "path";

const app = express();

/**
 * Ruta para la página principal para hacer la búsqueda.
 * @access Public
 * @function
 * @returns {void}
 */

app.get("/", async (req, res) => {
    try{
    const _dirname = path.resolve();
    res.sendFile(_dirname + "/index.html");
    }
    catch (error){
        console.log(error.message);
        res.status(500).send("ha habido un error");
    }
});

/**
 * Get stackoverflow controller
 * @access Public
 * @returns {string} - html
 */

app.get("/search", async (req, res) =>{
    const query = req.query.query; // para elgir la palabra q quieres usar 
    const {title,question,answers} = await stackOverFlowController.getContent(query);
    // const data = await stackOverFlowController.getContent(query);
    // res.send (data);
    res.send(`
    <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
    <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=5e2d45054eda">
        <h1>${title}</h1>
        <div>${question.question}</div>
        <div>${question.user}</div>
        <div>${question.date}</div>
        <div>${question.votes}</div>
        <div>${answers.map((answer) => `
        <div>${answer.answers}</div>
        <div>${answer.user}</div>
            <div>${answer.votes}</div>
            <div>${answer.date}</div>
            `).join("")} </div>
    `);
    // res.json({ title, question, answers }); // con este codigo la daria en json como api.

});

app.listen(3999,() =>{
    console.log("server started on port 3999");
    
});

// <div>${answer.linksLinked}</div>
// <div>${answer.linksRelated}</div>
