import { useState, useEffect } from "react";

export default function useForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [event, setEvent] = useState("");
  const [how, setHow] = useState("");
  const [advice, setAdvice] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [hasNickname, setHasNickname] = useState();
  const [hasEmail, setHasEmail] = useState();
  const [hasPhone, setHasPhone] = useState();
  const [hasEvent, setHasEvent] = useState();
  const [hasHow, setHasHow] = useState();

  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (isTyping === true) {
      checkDataEmpty();
    }
  }, [nickname, email, phone, event, how, advice]);

  let hasBlank = false;

  const checkDataEmpty = () => {
    const options = (option, setOption) => {
      if (option === "") {
        hasBlank = true;
        setOption(false);
      } else {
        setOption(true);
      }
    };
    options(nickname, setHasNickname);
    options(email, setHasEmail);
    options(phone, setHasPhone);
    options(event, setHasEvent);
    options(how, setHasHow);
  };

  const data = { nickname, email, phone, event, how, advice };
  const handleSubmit = (event) => {
    event.preventDefault();
    checkDataEmpty();
    setIsTyping(true);
    if (!hasBlank) {
      alert(JSON.stringify(data));
    }
  };

  return {
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
  };
}
