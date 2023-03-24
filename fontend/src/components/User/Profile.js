import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import profileBanner from "../../images/random-banner.jpg";
import { FiEdit } from "react-icons/fi";
import dateFormat from "dateformat";
import { CgMail } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { MdEmojiPeople, MdDateRange, MdViewTimeline } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { BsPersonWorkspace, BsPostcardHeart } from "react-icons/bs";
import { AiFillProject, AiFillQuestionCircle } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import About from "./TabValue/About";
import Timeline from "./TabValue/Timeline";
import Myjob from "./TabValue/Myjob";
import Myprojects from "./TabValue/Myprojects";
import Mypost from "./TabValue/Mypost";
import Myproblems from "./TabValue/Myproblems";
import BillingandPayments from "./TabValue/BillingandPayments";
import UpdateProfile from "./Update/UpdateProfile";
import AvatarUpdate from "./Update/AvatarUpdate";
import BannerUpdate from "./Update/BannerUpdate";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const date = dateFormat(user.createdAt, " dS mmmm, yyyy");

  //Tab Array
  const tabArray = [
    {
      name: "About",
      icon: <FcAbout />,
    },
    {
      name: "Timeline",
      icon: <MdViewTimeline />,
    },
    {
      name: "My Job",
      icon: <BsPersonWorkspace />,
    },
    {
      name: "My Projects",
      icon: <AiFillProject />,
    },
    {
      name: "My Post",
      icon: <BsPostcardHeart />,
    },
    {
      name: "My Problems",
      icon: <AiFillQuestionCircle />,
    },
    {
      name: "Payments",
      icon: <FaRegMoneyBillAlt />,
    },
  ];

  //Profile Banner
  // const profileBannerSrc = user.banner.url ? user.banner.url : profileBanner;

  //Tab function
  const [tab, setTab] = useState(0);
  const click = (index) => {
    setTab(index);
  };

  //Profile Update
  const [profileUpdate, setProfileUpdate] = useState(true);
  const [avatarUpdate, setAvatarUpdate] = useState(true);
  const [bannerUpdate, setBannerUpdate] = useState(true);

  return (
    <>
      <div className="profile">
        <div className="profile-details container">
          <div className="profile-banner">
            <img
              src={user.banner.url}
              alt="profileBanner"
              onClick={() => setBannerUpdate(false)}
            />
            <div className="avatar">
              <img
                src={user.avatar.url}
                alt="profile-avatar"
                onClick={() => setAvatarUpdate(false)}
              />
            </div>
          </div>
          <div className="profile-user-details">
            <div>
              <h4>{user.name}</h4>
              <p>{user.title}</p>
              <p>
                <span>
                  <CgMail />
                </span>
                {user.email}
              </p>
              <div style={{ display: "flex" }}>
                <p>
                  <span>
                    <IoIosPeople />
                  </span>
                  2 Followers
                </p>
                <p>
                  <span>
                    <MdEmojiPeople />
                  </span>
                  6 Following
                </p>
              </div>
              <div>
                <p>
                  <span>
                    <MdDateRange />
                  </span>
                  Joined {date}
                </p>
                <p>
                  <span>
                    <BiLocationPlus />
                  </span>
                  {user.location}
                </p>
              </div>
            </div>
            <button onClick={() => setProfileUpdate(false)}>
              <span>
                <FiEdit />
              </span>
              Edit Profile
            </button>
          </div>
        </div>
        <div
          className={
            profileUpdate
              ? "profile-update"
              : "profile-update profile-update-show"
          }
          // onClick={() => setProfileUpdate(true)}
        >
          <UpdateProfile
            profileUpdate={profileUpdate}
            setProfileUpdate={setProfileUpdate}
          />
        </div>
        <div
          className={
            avatarUpdate ? "avatar-update" : "avatar-update avatar-update-show"
          }
          // onClick={() => setProfileUpdate(true)}
        >
          <AvatarUpdate setAvatarUpdate={setAvatarUpdate} />
        </div>
        <div
          className={
            bannerUpdate ? "banner-update" : "banner-update banner-update-show"
          }
          // onClick={() => setProfileUpdate(true)}
        >
          <BannerUpdate setBannerUpdate={setBannerUpdate} />
        </div>
        <div className="tab-container container">
          <div className="tab-button">
            {tabArray.map((val, ind) => {
              return (
                <button
                  key={ind}
                  onClick={() => click(ind)}
                  className={tab === ind ? "tab-btn active" : "tab-btn"}
                >
                  <span>{val.icon}</span>
                  <p>{val.name}</p>
                </button>
              );
            })}
          </div>

          <div
            className={tab === 0 ? "tab-content active-content" : "tab-content"}
          >
            <About />
          </div>
          <div
            className={tab === 1 ? "tab-content active-content" : "tab-content"}
          >
            <Timeline />
          </div>
          <div
            className={tab === 2 ? "tab-content active-content" : "tab-content"}
          >
            <Myjob />
          </div>
          <div
            className={tab === 3 ? "tab-content active-content" : "tab-content"}
          >
            <Myprojects />
          </div>
          <div
            className={tab === 4 ? "tab-content active-content" : "tab-content"}
          >
            <Mypost />
          </div>
          <div
            className={tab === 5 ? "tab-content active-content" : "tab-content"}
          >
            <Myproblems />
          </div>
          <div
            className={tab === 6 ? "tab-content active-content" : "tab-content"}
          >
            <BillingandPayments />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
