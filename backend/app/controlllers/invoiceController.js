const express = require("express");
const app = express();
const fs=require("fs")
const pdf=require('html-pdf')
const ejs=require("ejs")

// app.set("views", "./view")
// app.set("view engine", "ejs");

// app.get("/invoice", function(req, res) {
//     console.log("hello"); 
//     res.render('invoice.ejs'); // Express will automatically look for "invoice.ejs" in the views directory
// });

// this is for download pdf of html page======
 function voice1(req,res){
    let html=fs.readFileSync("../view/invoice.html","utf8")

    let option={
        format:"Letter"
    }
    pdf.create(html,option).toFile("./neInvoice3.pdf",(err,result)=>{
        if(err) return console.log(err)
        return res.send(result)
    })
}

// this is download pdf prom ejs file

app.get("/download-invoice-ejs", (req, res) => {
    // Render the EJS template
    ejs.renderFile("./view/invoice.ejs", (err, html) => {
        if (err) {
            return console.log(err);
        }
        // Convert the HTML to PDF
        let options = {
            format: "A4", // Page format
            orientation: "portrait", // Page orientation: 'portrait' or 'landscape'
            border: {
                top: "0.5in", // Top margin
                right: "0.5in", // Right margin
                bottom: "0.5in", // Bottom margin
                left: "0.5in" // Left margin
            }
            // Add more configuration options as needed
        };
        pdf.create(html, options).toFile("./newInvoice.pdf", (err, result) => {
            if (err) {
                return console.log(err);
            }
            // Check if the PDF file exists
            if (fs.existsSync("./newInvoice.pdf")) {
                // Send the PDF file as a response
                res.download("./newInvoice.pdf", "invoice.pdf", (err) => {
                    if (err) {
                        console.log(err);
                    }
                    // Delete the PDF file after sending
                    fs.unlinkSync("./newInvoice.pdf");
                });
            } else {
                console.log("PDF file does not exist.");
            }
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on port number: 3000");
});


module.exports={voice1}