import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./Context";
import Entries from "./Entries";
import { format } from "date-fns";

const LogBook = () => {
  const { client, newEntry, setNewEntry } = useContext(UserContext);
  const [userEntries, setUserEntries] = useState(null);
  const [entry, setEntry] = useState("");
  const [sub, setSub] = useState("");
  const date = format(new Date(), "dd-MM-yyyy");

  useEffect(() => {
    if (client) {
      fetch(`/entries/${client._id}`)
        .then((res) => res.json())
        .then((data) => {
          const newArray = data.data.map((i) => i);
          const revArray = newArray.reverse();
          setUserEntries(revArray);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [client, newEntry]);

  const handleSubmit = (ev) => {
    console.log(entry, date, client._id, sub);
    ev.preventDefault();
    fetch("/newEntry", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: client._id,
        date: date,
        subject: sub,
        entry: entry,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEntry("");
        setSub("");
        setNewEntry(!newEntry);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (value) => {
    setEntry(value);
  };

  const handleChangeSub = (value) => {
    setSub(value);
  };

  return (
    <>
      <Bigwrapper>
        <LeftWrap>
          <EntryTitle>Entries</EntryTitle>
          {userEntries ? (
            userEntries.map((i, index) => {
              return (
                <Entries
                  key={index}
                  date={i.date}
                  entry={i.entry}
                  subject={i.subject}
                />
              );
            })
          ) : (
            <div> Loading</div>
          )}
        </LeftWrap>
        <RightWrap>
          <Form onSubmit={handleSubmit}>
            <TextWrap>
              <SubjectWrap>
                <Subject>S u b j e c t: </Subject>
                <SubjectInput
                  type="text"
                  value={sub}
                  onChange={(ev) => handleChangeSub(ev.target.value)}
                />
              </SubjectWrap>
              <TextInput
                type="text"
                value={entry}
                onChange={(ev) => {
                  handleChange(ev.target.value);
                }}
              />
            </TextWrap>
            <ButtonWrap>
              <SubmitBtn type="submit">Submit</SubmitBtn>
            </ButtonWrap>
          </Form>
        </RightWrap>
      </Bigwrapper>
    </>
  );
};

export default LogBook;

const Bigwrapper = styled.div`
  display: flex;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  height: 90vh;
`;

const LeftWrap = styled.div`
  width: 33vw;
  height: 90vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TextInput = styled.textarea`
  width: 55vw;
  height: 33vh;
  margin-bottom: 15px;
  outline: none;
  resize: none;
  border: none;
  font-family: "Sofia Sans Extra Condensed";
  font-size: 1.4em;
  border-radius: 6px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 5px 50px;
`;

const SubjectWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const EntryTitle = styled.div`
  font-size: 2.2em;
  display: flex;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
`;
const Subject = styled.div`
  color: white;
  font-size: 1.6em;
`;

const SubjectInput = styled.input`
  width: 44.7vw;
  margin-left: 20px;
  font-size: 1.4em;
  border-radius: 6px;
  border: none;
`;

const SubmitBtn = styled.button`
  font-size: 2em;
  margin-left: 35px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  &:hover {
    background-color: #ff6b35;
    color: #14539a;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 38vh;
`;
