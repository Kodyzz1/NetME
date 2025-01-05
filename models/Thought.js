import { Document, model, Schema, ObjectId, Types } from "mongoose";

// define the reaction interface
interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

// define the thought interface
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: (typeof reactionSchema)[];
  reactionCount: number;
}

// create the reaction schema
const reactionSchema = new Schema<IReaction>(
    {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      Required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (val: Date) => val.toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  });

const thoughtSchema =new Schema<IThought>(
    {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (val: Date) => val.toLocaleDateString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

export default Thought;