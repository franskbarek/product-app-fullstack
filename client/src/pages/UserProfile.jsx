import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { userRequest } from "../utils/requestMethods";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function UserProfile() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [infoUser, setInfoUser] = useState([]);

  const user = useSelector((state) => state.user.currentUser);

  const userId = useSelector((state) => state.user.currentUser._id);

  console.log(infoUser);

  const getUser = async () => {
    try {
      const response = await userRequest.get(`${import.meta.env.VITE_APP_BASE_URL}/users/find/${userId}`);
      setInfoUser(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return (
    <div className="mt-10">
      <div className="">
        <h2 className="ml-4 underline">DETAIL PROFILE</h2>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} aria-label="contacts">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarIcon /> */}
                Username:
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>Email:</ListItemIcon>
              <ListItemText primary={user.email} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
