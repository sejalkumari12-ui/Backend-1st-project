import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema (
    {
     id:{
        type: String,
         required : true,
        },

    videoFile:{
        type: String,
        required : true,
        },
    thumbnail:{
        type: String,
        required : true,
        },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true,
        },
    title:{
             type: String,
             required : true,
        },
    description:{
        type: String,
        required : true,
        },
    duration:{
        type: Number,
        required : true,
        },
    viewrs:{
        type: Number,
        required : true,
        },
    isPublished:{
        type: Boolean,
        required : true,
        },
}, {
    timestamps: true,
})


videoSchema.plugin(mongooseAggregatePaginate)



export const Video = mongoose.model ("Video", videoSchema)