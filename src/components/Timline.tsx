import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ITweets } from "../lib/type";
import styled from "styled-components";

const Wrapper = styled.div``;

const TweetWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const Timline = () => {
  // logic
  const [tweets, setTweets] = useState<ITweets[]>([]);

  const fetchData = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      orderBy("createAt", "desc") // 최신순: 내림차순으로 (5->4->3)
    );
    const snapshot = await getDocs(tweetQuery); // document가져오기
    const tweets = snapshot.docs.map((item) => {
      const { userId, username, tweet, photo, createAt } = item.data();
      const result = {
        id: item.id,
        userId,
        username,
        tweet,
        createAt,
      };

      return photo ? { ...result, photo } : { ...result };
    }); // 내부 데이터만 추출하고 doucumentID 추가
    console.log("🚀 ~ fetchData ~ tweets:", tweets);
    setTweets(tweets);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // view
  return (
    <Wrapper>
      {tweets.map((item) => (
        <TweetWrapper key={item.id}>
          <Column>
            <Username>{item.username}</Username>
            <Payload>{item.tweet}</Payload>
          </Column>
          {item.photo && (
            <Column>
              <Photo src={item.photo} />
            </Column>
          )}
        </TweetWrapper>
      ))}
    </Wrapper>
  );
};

export default Timline;
