import NavForLoginPage from "./NavForLoginPage";
import "./Nav.css";
import "./About.css";
import Box from "./Box";
import Maddy from "./images/Maddy.png";
import Eric from "./images/Eric.png";
import Adam from "./images/Adam.jpg"

const About = () => {
  return (
    <div className="About">
      <main style={{ padding: "1rem 0" }}>
        <NavForLoginPage />
        <div className="AboutBoxes">
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
            <Box
              width={80}
              border="4px solid lightskyblue"
              backgroundColor="#fff"
              borderRadius="50%"
              overflow="hidden"
            >
              <img alt="Profile" src={Maddy} style={{ width: 70 }} />
            </Box>
            <Box fontFamily="Helvetica" fontSize="1.4rem" padding="10px 0">
              Maddy Tan (NYU grad)
            </Box>
            <Box fontFamily="Helvetica" fontWeight={350}>
              Maddy is a fierce, intense, competitive developer. She lets
              nothing stop her, ladies, watch your man around her cuz she WILL
              outwork them and you!
            </Box>
          </Box>
          <Box
            // alignItems="flex-start"
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
            <Box
              width={80}
              border="4px solid lightskyblue"
              backgroundColor="#fff"
              borderRadius="50%"
              overflow="hidden"
            >
              <img
                alt="Profile"
                src={Adam}
                style={{ width: 70 }}
              />
            </Box>
            <Box fontFamily="Helvetica" fontSize="1.4rem" padding="10px 0">
              Adam Yiu (UTSC grad)
            </Box>
            <Box fontFamily="Helvetica" fontWeight={350}>
              Adam is a next level critical thinker, he's the API and login
              master. Nothing will stop Adam from creating login routes and he
              WILL steal ur girl no questions asked.
            </Box>
          </Box>
          <Box
            // alignItems="flex-start"
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
            <Box
              width={80}
              border="4px solid lightskyblue"
              backgroundColor="#fff"
              borderRadius="50%"
              overflow="hidden"
            >
              <img alt="Profile" src={Eric} style={{ width: 70 }} />
            </Box>
            <Box fontFamily="Helvetica" fontSize="1.4rem" padding="10px 0">
              Eric Duncan (uWaterloo grad)
            </Box>
            <Box fontFamily="Helvetica" fontWeight={350}>
              Eric lovesssss his adderalllllll (perscribed), they makes him
              bounce of the wall zippity zoom zoom! Eric is usually a
              personality hire but does know a thing or two about front end
              development.
            </Box>
          </Box>
        </div>
      </main>
    </div>
  );
};

export default About;
