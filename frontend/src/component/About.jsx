import React from "react";
import styled from "styled-components";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";

const AboutContainer = styled.div`
  background: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
  text-align: center; /* Centering text */
`;

const Heading = styled.h1`
  color: #343a40;
  margin-bottom: 10px; /* Adding space below the heading */
`;

const Subheading = styled.h2`
  color: #6c757d;
  margin-top: 10px;
`;

const Description = styled.p`
  color: #495057;
  line-height: 1.6;
  margin: 10px 0; /* Adding vertical space between paragraphs */
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 4px solid #007bff; /* Blue border around image */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  a {
    margin: 0 15px;
    font-size: 30px;
    color: #007bff;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <ProfilePicture src="/profile2.jpeg" alt="Your Name" />
      <Heading>About Me</Heading>
      <Subheading>Sumit Kumar</Subheading>
      <Description>
        I am a passionate developer with a love for creating innovative
        solutions. My interests include software development, web design, and
        learning new technologies.
      </Description>

      <Subheading>Project Details</Subheading>
      <Description>
        Currently, I am working on several projects, including:
        <ul style={{ paddingLeft: "20px", textAlign: "left" }}>
          <li>Ecommerce: Mern Stack Project </li>
          <li>Dsa Visulaizer: Using Pythone And Mern.</li>
          <li>Snjivni: Real Time Disater info App.</li>
        </ul>
      </Description>

      <Subheading>Connect with Me</Subheading>
      <SocialLinks>
        <a
          href="https://www.linkedin.com/in/sumit-kumar-22002b273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Sumit6569"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61561167685234"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
      </SocialLinks>
    </AboutContainer>
  );
};

export default About;
