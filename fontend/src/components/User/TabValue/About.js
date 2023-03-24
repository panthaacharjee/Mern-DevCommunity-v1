import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  deleteExperinces,
  deleteSkills,
} from "../../../redux/actions/userActions";
import { DELETE_SKILL_RESET } from "../../../redux/constants/userConstants";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import AboutUpdate from "../Update/AboutUpdate";
import SkillUpdate from "../Update/SkillUpdate";
import "./TabValue.css";
import ExperienceUpdate from "../Update/ExperienceUpdate";

const About = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  //Updated State
  const [aboutUpdate, setAboutUpdate] = useState(true);
  const [skillUpdate, setSkillUpdate] = useState(true);
  const [experienceUpdate, setExperienceUpdate] = useState(true);

  // SubStr String of About
  const [lastIndex, setLastIndex] = useState(300);

  //Delete Funciton
  const deleteSkill = (id) => {
    dispatch(deleteSkills(id));
  };
  const deleteExperince = (id) => {
    dispatch(deleteExperinces(id));
  };

  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: DELETE_SKILL_RESET });
    }
  }, [error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="about">
        <div className="about-container">
          <div>
            <h4>About</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setAboutUpdate(false)} />
            </button>
          </div>
          {user.about ? (
            <>
              <div
                className="about-text"
                dangerouslySetInnerHTML={{
                  __html: user.about.substr(0, lastIndex),
                }}
              />
              {lastIndex <= 300 ? (
                <span
                  className="see-more"
                  onClick={() => setLastIndex(user.about.length)}
                >
                  See more
                </span>
              ) : (
                <span className="see-more" onClick={() => setLastIndex(300)}>
                  Hide
                </span>
              )}
            </>
          ) : (
            <p>Please Edit Your About</p>
          )}
        </div>

        <div className="skill-container">
          <div>
            <h4>Skill</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setSkillUpdate(false)} />
            </button>
          </div>
          <div className="skill-box">
            {user.skills.map((val, ind) => {
              return (
                <li key={ind}>
                  <button onClick={() => deleteSkill(val._id)}>
                    {val.skill}
                  </button>
                </li>
              );
            })}
            {user.skills.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Skill</p>
            ) : null}
          </div>
        </div>
        <div className="experince-container">
          <div>
            <h4>Experience</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setExperienceUpdate(false)} />
            </button>
          </div>
          <div className="experince-box">
            {user.experiences.map((val, ind) => {
              return (
                <div key={ind}>
                  <div>
                    <h5>{val.title}</h5>
                    <button
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                      }}
                    >
                      <MdDelete onClick={() => deleteExperince(val._id)} />
                    </button>
                  </div>
                  <p>{val.description}</p>
                  <label>{val.time}</label>
                  {val.certificate ? (
                    <img src={val.certificate} alt="certificate" />
                  ) : null}
                </div>
              );
            })}
            {user.experiences.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Experience</p>
            ) : null}
          </div>
        </div>
        <div className="education-container">
          <div>
            <h4>Education</h4>
            <button className="edit-btn">
              <FiEdit />
            </button>
          </div>
          <div className="education-box">
            {user.educations.map((val, ind) => {
              return (
                <div key={ind}>
                  <div>
                    <h5>{val.school}</h5>
                    <button
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <p>{val.degree}</p>
                  <p>{val.startDate}</p>
                  <label>{val.endDate}</label>
                </div>
              );
            })}
            {user.educations.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Education</p>
            ) : null}
          </div>
        </div>
        <div className="portfolio-container">
          <div>
            <h4>Portfolio</h4>
            <button className="edit-btn">
              <FiEdit />
            </button>
          </div>
          <div className="portfolio-box">
            {user.portfolios.map((val, ind) => {
              return (
                <div key={ind}>
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <h5>{val.title}</h5>
                    <button
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <p>{val.description}</p>
                  <p>{val.link}</p>
                  <label>{val.gitLink}</label>
                </div>
              );
            })}
            {user.portfolios.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Portfolio</p>
            ) : null}
          </div>
        </div>
        <div className="language-container">
          <div>
            <h4>Language</h4>
            <button className="edit-btn">
              <FiEdit />
            </button>
          </div>
          <div className="language-box">
            {user.languages.map((val, ind) => {
              return (
                <div key={ind}>
                  <h5>{val.language}</h5>
                  <button>
                    <MdDelete />
                  </button>
                </div>
              );
            })}
            {user.languages.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Language</p>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={
          aboutUpdate ? "about-update" : "about-update about-update-show"
        }
      >
        <AboutUpdate setAboutUpdate={setAboutUpdate} />
      </div>
      <div
        className={
          skillUpdate ? "skill-update" : "skill-update skill-update-show"
        }
      >
        <SkillUpdate setSkillUpdate={setSkillUpdate} />
      </div>
      <div
        className={
          experienceUpdate
            ? "experience-update"
            : "experience-update experience-update-show"
        }
      >
        <ExperienceUpdate setExperienceUpdate={setExperienceUpdate} />
      </div>
    </>
  );
};

export default About;
