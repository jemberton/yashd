import mongoose, { Model, Schema } from 'mongoose';

const MONGO_URI = 'mongodb://yashd-db:27017/yashd';
// mongodb://localhost:5171/?readPreference=primary&ssl=false&directConnection=true

export default class mongoDB {
    static _connection = mongoose;

    static async connect() {
        console.log("> Connecting to MongoDB ...");
        this._connection = await mongoose.connect(MONGO_URI);
    }

    static HomeItemCategory = mongoose.model(
        'HomeItemCategory',
        new mongoose.Schema({
            title       : { type: String, required: true },
            enabled     : { type: Boolean, required: true }
        }),
        'HomeItemCategories'
    );

    static HomeItem = mongoose.model(
        'HomeItemModel',
        new mongoose.Schema({
            title           : { type: String, required: true },
            url             : { type: String, required: true },
            target          : { type: String, required: false },
            description     : { type: String, required: false },
            icon            : { type: String, required: false },
            enabled         : { type: Boolean, required: true },
            order           : { type: Number, required: true },
            category        : { type: mongoose.Schema.Types.ObjectId, ref: 'HomeItemCategories', required: false }
        }),
        'HomeItems'
    );

    static SideBarItem = mongoose.model(
        'SideBarItemModel',
        new mongoose.Schema({
            name: { type: String, required: true },
            url: { type: String, required: false },
            isLink: { type: Boolean, required: true },
            order: { type: Number, required: true }
        }),
        'SideBarItems'
    );
}