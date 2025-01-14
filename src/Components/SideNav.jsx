import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const sideNavContainerStyle = {
  width: "20rem",
};

const logoContainerStyle = {
  height: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
};

const logoStyle = {
  width: "70%",
};

const menuItemStyle = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "green",
    color: "white",
  },
};

const subMenuItemStyle = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "green",
    color: "white",
  },
};

function SideNav() {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const token = localStorage.getItem("token");

  const USER = JSON.parse(localStorage.getItem("user"));

  const [userDogs, setUserDogs] = useState([]);

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const [listingAnchorEl, setListingAnchorEl] = useState(null);

  const handleListingClick = (event) => {
    setListingAnchorEl(event.currentTarget);
  };

  const handleListingClose = () => {
    setListingAnchorEl(null);
  };

  const getUserDogs = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}user/get-user-dogs/${USER._id}`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res.data);
        setUserDogs(res.data.userDogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (token) {
      getUserDogs();
    }
  }, [token]);

  return (
    <Drawer variant="permanent">
      <Paper style={sideNavContainerStyle}>
        <div style={logoContainerStyle}>
          <img style={logoStyle} src="./images/logo1.png" alt="Logo" />
        </div>
        <List>
          {token ? (
            <>
              <Link to="/">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              {USER?.type === "breeder" && (
                <>
                  <ListItem
                    button
                    style={menuItemStyle}
                    onClick={handleProfileClick}
                  >
                    <ListItemText primary="Breeder Profile" />
                  </ListItem>
                  <ListItem
                    button
                    style={menuItemStyle}
                    disabled={userDogs.length > 0 ? false : true}
                    onClick={handleListingClick}
                  >
                    <ListItemText primary="My Listings" />
                  </ListItem>
                </>
              )}

              <ListItem button style={menuItemStyle}>
                <ListItemText primary="Message Center" />
              </ListItem>
              {USER?.type == "customer" && (
                <ListItem button style={menuItemStyle}>
                  <Link to="/wishlist">
                    <ListItemText primary="Wishlist">
                      <i
                        className="fa fa-heart"
                        style={{ fontSize: "1.5rem", color: "red" }}
                      ></i>
                    </ListItemText>
                  </Link>
                </ListItem>
              )}

              {USER?.type == "breeder" && (
                <>
                  <ListItem button style={menuItemStyle}>
                    <ListItemText primary="Membership & Billing">
                      <i
                        className="fa fa-heart"
                        style={{ fontSize: "1.5rem", color: "red" }}
                      ></i>
                    </ListItemText>
                  </ListItem>
                  <ListItem button style={menuItemStyle}>
                    <ListItemText primary="Testimonials" />
                  </ListItem>
                  <Link to="/add-pedigree">
                    <ListItem button style={menuItemStyle}>
                      <ListItemText primary="Pedigree" />
                    </ListItem>
                  </Link>
                </>
              )}
              <Link to="/find-puppy">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Find A Puppy" />
                </ListItem>
              </Link>
              {/* <Link to="/breed-matchmaker">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Breed Matcher" />
                </ListItem>
              </Link> */} 
              <Link to="/about-us">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="About Us" />
                </ListItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <Link to="/register-select">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Register" />
                </ListItem>
              </Link>
              <Link to="/login">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
              <Link to="/about-us">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="About Us" />
                </ListItem>
              </Link>
              <Link to="/find-puppy">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Find A Puppy" />
                </ListItem>
              </Link>
              {/* <Link to="/breed-matchmaker">
                <ListItem button style={menuItemStyle}>
                  <ListItemText primary="Breed Matcher" />
                </ListItem>
              </Link> */}
            </>
          )}
        </List>
      </Paper>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
      >
        <Link to="/edit-breeder-profile">
          <MenuItem style={subMenuItemStyle} onClick={handleProfileClose}>
            Edit Profile
          </MenuItem>
        </Link>
        <Link to="/edit-breeder-profile">
          <MenuItem style={subMenuItemStyle} onClick={handleProfileClose}>
            Change Password
          </MenuItem>
        </Link>
      </Menu>
      {/* Profile Menu */}

      {/* Listing Menu */}
      {userDogs.length > 0 && (
        <Menu
          anchorEl={listingAnchorEl}
          open={Boolean(listingAnchorEl)}
          onClose={handleProfileClose}
        >
          {userDogs?.map((dog) => {
            return (
              <Link to={`/dog-profile?id=${dog._id}`}>
                <MenuItem
                  key={dog._id}
                  style={subMenuItemStyle}
                  onClick={handleListingClose}
                >
                  {dog.name}
                </MenuItem>
              </Link>
            );
          })}
        </Menu>
      )}
      {/* Listing Menu */}
    </Drawer>
  );
}

export default SideNav;
