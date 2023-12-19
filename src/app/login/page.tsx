"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Aos from "aos";
import "aos/dist/aos.css";
import Style from "./login.module.scss";
import api from "../api/client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../Context/store";

Aos.init();

function Login() {
  const router = useRouter();

  const [username, setUsernameLogin] = useState("");
  const [password, setPasswordLogin] = useState("");

  const { JWT, SETJWT, SETUSERNAME, SETPASSWORD } = useGlobalContext();

  var querystring = require("querystring");

  const handleLogin = () => {
    if (username === "" || password === "") return;
    api
      .post(
        "login/authorize",
        querystring.stringify({
          username: username, //gave the values directly for testing
          password: password,
          grant_type: "password",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res?) => {
        if (res?.data) {
          SETJWT(res.data.access_token);
          SETUSERNAME(username);
          SETPASSWORD(password);
          router.push("myAccount");
          console.log(res?.data);
        }
      });
  };

  return (
    <div
      style={{
        minHeight: "1065px",
        backgroundColor: "#fff",
      }}
      className="main-container"
    >
      <Container
        maxWidth="xl"
        sx={{
          maxWidth: {
            xs: "738px",
            md: "990px",
            lg: "1220px",
          },
          backgroundColor: "#fff",
          marginTop: "86px",
          minHeight: "100vh",
          padding: { xs: "column", lg: "row", md: "0px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          className={Style.elementColumn}
          sx={{
            width: { xs: "100%", md: "100%", sm: "100%" },
            padding: { xs: "20px", sm: "20px" },
            paddingRight: { md: "0px", lg: "0px" },
          }}
        >
          <Box className={Style.widgetWrap_3}>
            <Box>
              <Box>
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      md: "100%",
                      sm: "100%",
                    },
                  }}
                  className={Style.elementColumn}
                >
                  <Box className={Style.widgetWrap_2}>
                    <Box
                      className={Style.elementElement}
                      sx={{
                        marginBottom: "50px",
                      }}
                    >
                      <h2 className={Style.mainTitle}>Login</h2>
                    </Box>
                    <Box className={Style.elementElement}>
                      <Box className={Style.ffTContainer}>
                        <Box className={Style.fluentForm}>
                          <div className={Style.inputLabel}>
                            <label className={Style.ff1Title}>
                              User or E-mail
                            </label>
                          </div>
                          <div>
                            <input
                              required
                              type="text"
                              name="user"
                              id={Style.namesFirstName}
                              className={Style.elFormControl}
                              aria-invalid="false"
                              aria-required="false"
                              value={username}
                              onChange={(e) => setUsernameLogin(e.target.value)}
                            />
                          </div>
                        </Box>
                        <Box className={Style.fluentForm}>
                          <div className={Style.inputLabel}>
                            <label className={Style.ff1Title}>Password</label>
                          </div>
                          <div className={Style.inputContent}>
                            <input
                              required
                              type="password"
                              name="names[first-name]"
                              id={Style.namesFirstName}
                              className={Style.elFormControl}
                              aria-invalid="false"
                              aria-required="false"
                              value={password}
                              onChange={(e) => setPasswordLogin(e.target.value)}
                            />
                          </div>
                        </Box>
                      </Box>
                      <Box className={Style.wrapSubmit}>
                        <Box className={Style.submitBtn}>
                          <button
                            className={Style.btnSubmit}
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </Box>
                        <Box className={Style.checkBox}>
                          <input
                            className={Style.btnCheckBox}
                            id="CheckBox"
                            type="checkbox"
                          />
                          <label className={Style.textCheckBox}>
                            {" "}
                            Remember Me
                          </label>
                        </Box>
                      </Box>
                      <div>
                        <a className={Style.txtForgotPass} href="">
                          Forgot your password?
                        </a>
                        <Box className={Style.submitBtn}>
                          <button
                            className={Style.btnSubmit}
                            onClick={() => {
                              router.push("/register");
                            }}
                          >
                            Sign up
                          </button>
                        </Box>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
