import NavForLoginPage from "./NavForLoginPage";
import Box from "./Box";
import "./Nav.css";
import "./LoginPage.css";
import Login from "./Login";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <main style={{ padding: "1rem 0" }}>
        <NavForLoginPage />
        <Box
          alignItems="center"
          backgroundColor="#333"
          border="4px solid lightskyblue"
          borderRadius={4}
          color="#eee"
          display="flex"
          margin="50px auto auto auto"
          minHeight={250}
          padding={20}
          width={350}
        >
          <Box fontFamily="Helvetica" fontSize="1.4rem" padding="10px 0">
            Welcome to Bopz!
          </Box>
          <Box fontFamily="Helvetica" fontWeight={350}>
            Bopz is a shazam impersonator with social features. Please login
            with your spotify account below to continue.
          </Box>
          <br></br>
          <Login />
          <Box></Box>
        </Box>
      </main>
    </div>
  );
};

export default LoginPage;
