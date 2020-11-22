import styled from "styled-components";
import React from "react";
import "./styles.css";
import useForm from "./useForm";

const Container = styled.div``;

const FormWrapper = styled.div`
  max-width: 645px;
  margin: 10% auto;
  background: white;
  white-space: nowrap;
`;

const TopBar = styled.section`
  background: center #fad312;
  height: 8px;
`;

const FormBody = styled.form`
  padding: 54px 298px 35px 42px;
`;

const FormTitle = styled.h1`
  font-size: 36px;
  letter-spacing: -1.8px;
  margin-bottom: 35px;
`;

const FormInfo = styled.div`
  font-size: 14px;
  margin-bottom: 11px;
`;

const FormWarning = styled.div`
  font-size: 16px;
  color: #e74149;
  margin-top: 22px;
  margin-bottom: 55px;
`;

const FormContentItem = styled.div`
  font-size: 20px;
  letter-spacing: 1px;
  margin-top: 50px;
`;

const FormContentTiTle = styled.div``;

const FormContentTiTleWarning = styled.span`
  color: #e74149;
`;

const FormInput = styled.input`
  width: 287px;
  height: 23px;
  margin-top: 20px;
  font-size: 16px;
`;

const BlankWarning = styled.div`
  font-size: 16px;
  color: #e74149;
  margin-top: 10px;
`;

const FormSelect = styled.div`
  margin-top: 10px;
`;
const FormSelectEvent = styled.div``;

const FormRadio = styled.input`
  margin: 11px;
`;

const FormLabel = styled.label`
  display: inline-block;
  margin-top: 15px;
  font-size: 14px;
`;

const FormSuggestion = styled(FormInfo)`
  margin-top: 12px;
  margin-bottom: 0px;
`;

const SubmitButton = styled.input`
  background: #fad312;
  width: 92px;
  height: 40px;
  border-radius: 3px;
  border-color: transparent;
  margin: 20px 0px;
  cursor: pointer;
`;

const Footer = styled.footer``;
const FooterTop = styled.div`
  height: 3px;
  background: #fad312;
`;
const FooterBottom = styled.div`
  text-align: center;
  background: black;
  color: #999999;
  font-size: 13px;
  padding: 24px;
`;

const Form = () => {
  const {
    setNickname,
    setEmail,
    setPhone,
    setEvent,
    setHow,
    setAdvice,
    hasNickname,
    hasEmail,
    hasPhone,
    hasEvent,
    hasHow,
    handleInputChange,
    handleSubmit
  } = useForm();

  return (
    <Container>
      <FormWrapper>
        <TopBar></TopBar>
        <FormBody onSubmit={handleSubmit}>
          <FormTitle>新拖延運動報名表單</FormTitle>
          <FormInfo>活動日期：2020/12/10 ~ 2020/12/11</FormInfo>
          <FormInfo>活動地點：台北市大安區新生南路二段1號</FormInfo>
          <FormWarning>*必填</FormWarning>
          <FormContentItem>
            <FormContentTiTle>
              暱稱 <FormContentTiTleWarning>*</FormContentTiTleWarning>
            </FormContentTiTle>
            <FormInput
              name="nickname"
              type="text"
              placeholder="您的回答"
              onChange={handleInputChange(setNickname)}
            />
            <BlankWarning>{hasNickname === false && "此欄為必填"}</BlankWarning>
          </FormContentItem>
          <FormContentItem>
            <FormContentTiTle>
              電子郵件 <FormContentTiTleWarning>*</FormContentTiTleWarning>
            </FormContentTiTle>
            <FormInput
              name="email"
              type="email"
              placeholder="您的電子郵件"
              onChange={handleInputChange(setEmail)}
            />
            <BlankWarning>{hasEmail === false && "此欄為必填"}</BlankWarning>
          </FormContentItem>
          <FormContentItem>
            <FormContentTiTle>
              手機號碼 <FormContentTiTleWarning>*</FormContentTiTleWarning>
            </FormContentTiTle>
            <FormInput
              name="phone"
              type="text"
              placeholder="您的手機號碼"
              onChange={handleInputChange(setPhone)}
            />
            <BlankWarning>{hasPhone === false && "此欄為必填"}</BlankWarning>
          </FormContentItem>
          <FormContentItem>
            <FormContentTiTle>
              報名類型 <FormContentTiTleWarning>*</FormContentTiTleWarning>
            </FormContentTiTle>
            <FormSelect>
              <FormSelectEvent>
                <FormRadio
                  type="radio"
                  id="bed"
                  name="event"
                  value="bed"
                  onChange={handleInputChange(setEvent)}
                />
                <FormLabel for="bed">躺在床上用想像力實作</FormLabel>
              </FormSelectEvent>
              <FormSelectEvent>
                <FormRadio
                  type="radio"
                  id="floor"
                  name="event"
                  value="floor"
                  onChange={handleInputChange(setEvent)}
                />
                <FormLabel for="floor">趴在地上滑手機找現成的</FormLabel>
              </FormSelectEvent>
            </FormSelect>
            <BlankWarning>{hasEvent === false && "此欄為必填"}</BlankWarning>
          </FormContentItem>
          <FormContentItem>
            <FormContentTiTle>
              怎麼知道這個活動的？{" "}
              <FormContentTiTleWarning>*</FormContentTiTleWarning>
            </FormContentTiTle>
            <FormInput
              name="how"
              type="text"
              placeholder="您的回答"
              onChange={handleInputChange(setHow)}
            />
            <BlankWarning>{hasHow === false && "此欄為必填"}</BlankWarning>
          </FormContentItem>
          <FormContentItem>
            <FormContentTiTle>
              其他
              <FormSuggestion>對活動的一些建議</FormSuggestion>
            </FormContentTiTle>
            <FormInput
              name="advice"
              type="text"
              placeholder="您的回答"
              onChange={handleInputChange(setAdvice)}
            />
          </FormContentItem>
          <SubmitButton type="submit" value="提交" />
          <FormInfo>請勿透過表單送出您的密碼。</FormInfo>
        </FormBody>
      </FormWrapper>
      <Footer>
        <FooterTop />
        <FooterBottom>© 2020 © Copyright. All rights Reserved.</FooterBottom>
      </Footer>
    </Container>
  );
};

export default Form;
