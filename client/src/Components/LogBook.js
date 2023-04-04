import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./Context";
import Entries from "./Entries";
import { format } from "date-fns";
import DisplayedEntry from "./DisplayedEntry";

const LogBook = () => {
  const { client, newEntry, setNewEntry } = useContext(UserContext);
  const [userEntries, setUserEntries] = useState(null);
  const [entry, setEntry] = useState("");
  const [noEntries, setNoEntries] = useState(false);
  const [sub, setSub] = useState("");
  const date = format(new Date(), "dd-MM-yyyy");

  useEffect(() => {
    if (client) {
      fetch(`/entries/${client._id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.data.length === 0) {
            setNoEntries(true);
          } else {
            setNoEntries(false);
            const newArray = data.data.map((i) => i);
            const revArray = newArray.reverse();
            setUserEntries(revArray);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [client, newEntry]);

  const handleSubmit = (ev) => {
    console.log(client._id, date, sub, entry);
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
            userEntries.map((i) => {
              return (
                <Entries
                  key={i._id}
                  date={i.date}
                  entry={i.entry}
                  subject={i.subject}
                  id={i._id}
                  clientId={client._id}
                />
              );
            })
          ) : noEntries ? (
            <NoEntry>
              <div>Looks like you dont have any entries! Start practicing!</div>
            </NoEntry>
          ) : (
            <div> Loading</div>
          )}
        </LeftWrap>
        <RightWrap>
          <BigDisWrap>
            <DisplayWrap>
              <DisplayedEntry />
            </DisplayWrap>
          </BigDisWrap>
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
                placeholder="What are you practicing today?"
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
  flex-direction: column;
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
  height: 29vh;
  margin-bottom: 15px;
  outline: none;
  resize: none;
  border: none;
  font-family: "Sofia Sans Extra Condensed";
  font-size: 1.4em;
  border-radius: 6px;
  ::placeholder {
    padding: 3px 0 0 5px;
    color: #ff6b35;
    font-weight: bold;
  }
  :focus::placeholder {
    opacity: 0.5;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 45px 50px;
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
  margin-left: 25px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  &:hover {
    background-color: #ff6b35;
    color: #14539a;
    font-weight: bold;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 38vh;
`;

const BigDisWrap = styled.div`
  margin: 53.3px 0 0 50px;
`;

const DisplayWrap = styled.div`
  display: flex;
  padding: 15px;
  font-size: 1.5em;
  color: white;
  border-radius: 6px;
  border: 2px solid #ff6b35;
  width: 55vw;
  height: 33vh;
`;
const NoEntry = styled.div`
  border: 2px solid #ff6b35;
  padding: 8px;
  margin: 50px 0 0 80px;
  width: 25vw;
  & div:first-child {
    font-size: 1.8em;
    color: white;
    font-weight: bold;
  }
`;
