import NavForLoginPage from "./NavForLoginPage";
import "./Nav.css";
import "./About.css";
import Box from "./Box";
import Maddy from "./images/Maddy.png";
import Eric from "./images/Eric.png";
import Adam from "./images/Adam.jpg";

const About = () => {
  return (
    <div className="About">
      <main style={{ padding: "1rem 0" }}>
        <NavForLoginPage />
        <div className="AboutBoxes">
          <Box
            alignItems="center"
            backgroundColor="rgba(255, 255, 255, 0.1)"
            border="1px solid white"
            borderRadius={4}
            color="#eee"
            display="flex"
            margin="50px auto auto auto"
            minHeight={300}
            padding={20}
            width={350}
          >
            <Box
              width={80}
              border="1px solid white"
              backgroundColor="#fff"
              borderRadius="50%"
              overflow="hidden"
            >
              <img alt="Profile" src={Maddy} style={{ width: 80, height: 80 }} />
            </Box>
            <Box fontFamily="Lato" fontSize="1.4rem" padding="10px 0" fontWeight="700"> 
              Maddy Tan (NYU Grad)
            </Box>
            <Box fontFamily="Lato" fontWeight={350}>
              Maddy is a fierce, intense, competitive developer. She lets
              nothing stop her and WILL outwork you!
            </Box>
          </Box>
          <Box
            // alignItems="flex-start"
            backgroundColor="rgba(255, 255, 255, 0.1)"
            border="1px solid white"
            borderRadius={4}
            color="#eee"
            display="flex"
            margin="50px auto auto auto"
            minHeight={300}
            padding={20}
            width={350}
          >
            <Box
              width={80}
              border="1px solid white"
              backgroundColor="#fff"
              borderRadius="50%"
              overflow="hidden"
            >
              <img alt="Profile" src={Adam} style={{ width: 80, height: 80 }} />
            </Box>
            <Box fontFamily="Lato" fontSize="1.4rem" padding="10px 0" fontWeight="700">
              Adam Yiu (UTSC Grad)
            </Box>
            <Box fontFamily="Lato" fontWeight={350}>
              Adam is a next level critical thinker, he's the API and login
              master. Nothing will stop Adam from creating login routes and he
              WILL find a way!
            </Box>
          </Box>
          <Box
            // alignItems="flex-start"
            backgroundColor="rgba(255, 255, 255, 0.1)"
            border="1px solid white"
            borderRadius={4}
            color="#eee"
            display="flex"
            margin="50px auto auto auto"
            minHeight={300}
            padding={20}
            width={350}
          >
            <Box
              width={80}
              border="1px solid white"
              backgroundColor="#fff"
              borderRadius="50%"
              overflow="hidden"
            >
              <img alt="Profile" src={Eric} style={{ width: 80, height: 80 }} />
            </Box>
            <Box fontFamily="Lato" fontSize="1.4rem" padding="10px 0" fontWeight="700">
              Eric Duncan (uWaterloo Grad)
            </Box>
            <Box fontFamily="Lato" fontWeight={350}>
              Eric is usually a personality hire but does know a thing or two
              about front-end development!
            </Box>
          </Box>
        </div>
      </main>
    </div>
  );
};

export default About;
