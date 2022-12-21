import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const meetupId = req.body.meetupId;

    const uri = process.env.MONGODB;

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.deleteOne({
      _id: ObjectId(meetupId),
    });

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup deleted!" });
  }
}

export default handler;
