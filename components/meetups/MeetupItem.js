import { useState } from "react";
import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { toast } from "react-toastify";

function MeetupItem(props) {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push("/" + props.id);
  };

  const deleteMeetupHandler = async () => {
    try {
      const response = await fetch("/api/delete-meetup", {
        method: "DELETE",
        body: JSON.stringify({ meetupId: props.id }),
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
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "1rem",
          }}
        >
          <button onClick={deleteMeetupHandler} className={classes.btn}>
            Delete
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
