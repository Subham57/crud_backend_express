import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { Application, Request, Response } from "express";
import database from "./Configs/config.database";
import { createUser, getAllUser } from "./Services/services.user";


interface statusInterface {
    Status: Number,
    DatabaseAuthenticate: String,
}

let resultStatus: statusInterface = {
    Status: 0,
    DatabaseAuthenticate: "Not Authenticate Yet.",
}


let App: Application = express();
const port: number = 5001;
App.use(bodyParser.json());
App.use(cors())
//Authentacating the database with the creadential 
database.authenticate().then(() => {
    database.sync().then(() => {
        resultStatus['DatabaseAuthenticate'] = "Successfully Authenticated and Connected.";
    }).catch((err) => {
        resultStatus['DatabaseAuthenticate'] = err;
    });
});

//For the status of all
App.get('/status', (req: Request, res: Response) => {
    res.send(resultStatus);
});

//For Creating a User Record
App.post('/create', async (req: Request, res: Response) => {
    try {
        await createUser(req, res);
    }
    catch (err) {
        res.send({
            Status: 404,
            Error_Message: err
        })
    }
});

//For getting all the user with its Organization and Access
App.get('/getAllUser',async (req: Request, res: Response)=>{
    try {
        await getAllUser(req, res);
    }
    catch (err) {
        res.send({
            Status: 404,
            Error_Message: err
        })
    }
});


//App Listening at the port number
App.listen(port, () => {
    resultStatus['Status'] = 200;
    console.log("App is running at http://localhost:" + port);
});

