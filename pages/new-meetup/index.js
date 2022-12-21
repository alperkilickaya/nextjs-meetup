import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { toast } from "react-toastify";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      toast(data.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      router.push("/");
    } catch {
      toast("Something went wrong!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
  };
  return (
    <>
      <Head>
        <title>Meetup Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
