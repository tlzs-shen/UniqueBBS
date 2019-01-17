import { prisma, Group, User } from "../generated/prisma-client";
import { verifyJWT } from "./check";
import { Request, Response } from "express";

export const groupUser = async function(req: Request, res: Response) {
    try {
        verifyJWT(req.header("Authorization"));
        const { uid } = req.params;
        const group = await prisma
            .user({
                id: uid
            })
            .group();
        res.json({ code: 1, msg: group });
    } catch (err) {
        res.json({ code: -1, msg: err.message });
    }
};

export const groupList = async function(req: Request, res: Response) {
    try {
        verifyJWT(req.header("Authorization"));
        const groupList: Array<Group> = await prisma.groups();
        res.json({ code: 1, msg: groupList });
    } catch (err) {
        res.json({ code: -1, msg: err.message });
    }
};

export const groupUserList = async function(req: Request, res: Response) {
    try {
        verifyJWT(req.header("Authorization"));
        const { gid } = req.params;
        const groupUserList: Array<User> = await prisma.users({
            where: {
                group_some: {
                    id: gid
                }
            }
        });
        res.json({ code: 1, msg: groupUserList });
    } catch (err) {
        res.json({ code: -1, msg: err.message });
    }
};
