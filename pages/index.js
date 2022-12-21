import Head from "next/head";
import { MongoClient, ServerApiVersion } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetup Project</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {props.meetups.length > 0 ? (
        <MeetupList meetups={props.meetups} />
      ) : (
        <p>No Meetups</p>
      )}
    </>
  );
};

/* export async function getServerSideProps(context) {
  const request = context.req;
  const response = context.res;
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */

export async function getStaticProps() {
  const uri = process.env.MONGODB;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
