import { Request, Response } from "express";
import { Organization } from "../Models/models.Organization";
import { userInterface, Users } from "../Models/models.Users";
import { Access } from "../Models/models.Access";
import { UserAccess } from "../Models/models.User_Access";

//For Creating the User.
export const createUser = async (req: Request, res: Response) => {
    try {
        let requestOrganization = req.body['org'];
        let userObject: userInterface = {
            Frist_name: req.body['firstName'],
            Last_name: req.body['lastName'],
            Email: req.body['email'],
        }
        //Finding the record for the Organization which is entered by the user.
        let orgRecord = await Organization.findOne({ where: { "Org_name": requestOrganization } })
        if (orgRecord === null) {  //IF THAT ORGANIZATION NOT FOUND IN THE DATABASE IT WILL SEND A RESPONSE AS ERROR.
            res.send({
                status: 404,
                message: "Invalid Organization Name is requested.Check before requesting."
            })
        }
        let userEntity: any;
        userEntity = await Users.create(userObject); //Creating a user 
        await userEntity?.setOrganization(orgRecord);//Setting the user's organization id.

        let setAccessID: Access | null = await Access.findOne({ where: { Access_name: "cafeteria" } }) //finding the record from the access table where access name is cafeteria.
        

        let userAccessEntity: any = await UserAccess.create(); // Creating the access record 
        await userAccessEntity?.setUser(userEntity); // setting the Access record's userID
        await userAccessEntity?.setAccess(setAccessID); // setting the Access record's AccessID
        res.status(201).json({
            msg: "user created",
            NewUser: userEntity
        });
    } catch (err) {
        res.status(404).json({
            Message: err,
            Error: err
        });
    }
}

//For getting All the user with the Organization and access for the user.
export const getAllUser = async (req: Request, res: Response) => {
    try {
        const response = await Users.findAll({include: [Organization,UserAccess]});
        res.send(response);
    } catch (err) {
        res.send({
            Status: 404,
            Error_Message: err
        });
    }
}