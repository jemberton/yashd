import { Request, Response, Router } from 'express';
import mongoDB from '../db';
import mongoose, { Mongoose, ObjectId, mongo } from 'mongoose';

export const apiRoute = Router();

apiRoute.get('/api/getHomeItems', async (req: Request, res: Response) => {
    let homeItems = await mongoDB.HomeItem.find({});
    res.json(homeItems);
});

apiRoute.get('/api/getSideBarItems', async (req: Request, res: Response) => {
    let sidebarItems = await mongoDB.SideBarItem.find({});
    res.json(sidebarItems);
});

apiRoute.post('/api/saveHomeItems', async (req: Request, res: Response) => {

    try {
        [...req.body].forEach(async (item, index) => {
            if (item._id.slice(0,4) === 'new_') {
                await mongoDB.HomeItem.create({
                    title: item.title !== undefined ? item.title : 'New Item',
                    url: item.url !== undefined ? item.url : '#',
                    target: item.target !== undefined ? item.target : '_blank',
                    description: item.description !== undefined ? item.description : 'A new unconfigured item',
                    icon: item.icon !== undefined ? item.icon : '/icons/generic.png',
                    enabled: item.enabled !== undefined ? item.enabled : true,
                    order: index,
                })
            } else {
                await mongoDB.HomeItem.updateOne({ _id: item._id }, { '$set': {
                    order: index,
                    title: item.title,
                    url: item.url,
                    target: item.target,
                    description: item.description,
                    icon: item.icon,
                    enabled: item.enabled
                } })
            }
        })

        let homeItems = await mongoDB.HomeItem.find({})
        res.status(200).json(homeItems)
    } catch {
        console.log("Error saving items in database")
    }
});

apiRoute.post('/api/deleteHomeItems', async (req: Request, res: Response) => {
    let items = req.body
    let dbQuery = await mongoDB.HomeItem.deleteMany({ _id: { $in: items } })
    res.status(200).json({ deletedCount: dbQuery.deletedCount })
});

// DEV This is in need of a refactor since deleteHomeItem on client side has changed to a batch operation. Still would like to provide an API call for a single item
// apiRoute.post('/api/deleteHomeItem', async (req: Request, res: Response) => {
//     let itemID = req.body
//     console.log("[DEBUG] Deleting home item _id:", itemID.itemID)
//     let dbQuery = await mongoDB.HomeItem.deleteOne({ _id: itemID.itemID })
//     console.log(dbQuery)
//     res.json({ test: "woof" }) // FIXME Return something valuable ...
// })