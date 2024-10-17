import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  @media (max-width: 479px) {
    padding: 0 10px;
    overflow: hidden;
  }
`;

const Social = styled.div`
  width: 100%;
  @media (max-width: 479px) {
    height: auto;
    object: center;
  }
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #fff;
`;

const SubHeader = styled.p`
  color: #e0e0e0;
  text-align: center;
`;

const Input = styled.input`
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #4f46e5; /* Indigo-600 */
    box-shadow: 0 0 5px rgba(79, 70, 229, 0.5);
  }
`;

const Textarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
  height: 150px;
  margin-bottom: 1rem;
  resize: none;
  &:focus {
    outline: none;
    border-color: #4f46e5; /* Indigo-600 */
    box-shadow: 0 0 5px rgba(79, 70, 229, 0.5);
  }
`;

const Button = styled.input`
  background-color: #4f46e5; /* Indigo-600 */
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #4338ca; /* Indigo-700 */
  }
`;

const ResetButton = styled(Button)`
  background-color: #ef4444; /* Red-600 */
  &:hover {
    background-color: #dc2626; /* Red-700 */
  }
`;

function Contact() {
  const navigate = useNavigate();
  return (
    <>
      <IoArrowBackCircle
        className="w-10 h-10 ml-5 mt-10"
        onClick={() => navigate(-1)}
      />
      <Container>
       
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="text-center pb-6">
                <Header>Contact Us!</Header>
                <SubHeader>
                  Fill up the form below to send Any Request.
                </SubHeader>
              </div>

              <form action="https://formspree.io/f/mayrvddl" method="POST">
                <Input
                  type="text"
                  placeholder="Name"
                  name="username"
                  required
                  autoComplete="off"
                />

                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  autoComplete="off"
                />

                <Textarea
                  placeholder="Type your message here..."
                  name="message"
                  required
                />

                <div className="flex justify-between">
                  <Button type="submit" value="Send ➤" />
                  <ResetButton type="reset" value="Reset" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Contact;
