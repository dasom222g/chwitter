import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../firebase";
import { IEditTweet, ITweets } from "../lib/type";
import styled from "styled-components";
import { Unsubscribe } from "firebase/auth";
import { AiTwotoneDelete, AiOutlineCheck } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div``;

const TweetWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin-top: 10px;
`;

const Column = styled.div`
  &.text-column {
    width: 100%;
  }
`;

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

const PayloadInput = styled.input`
  display: block;
  background-color: transparent;
  color: white;
  border-style: none;
  border-bottom: 1px solid #fff;
  margin: 10px 0px;
  font-size: 18px;
`;

const IconWrap = styled.div`
  margin-left: auto;
  display: flex;
`;

const IconButton = styled.button`
  display: block;
  top: 20px;
  right: 20px;
  background: transparent;
  border-style: none;
  color: white;
  cursor: pointer;
`;

const Timline = () => {
  // logic
  const user = auth.currentUser;
  const inputRef = useRef<HTMLInputElement>(null);
  const [tweets, setTweets] = useState<ITweets[]>([]);

  const initialEditTweet = {
    isEdit: false,
    tweet: "",
    documentId: "",
  };

  const [editTweet, setEditTweet] = useState<IEditTweet>(initialEditTweet);

  const handleSave = async (selectedItem: ITweets) => {
    try {
    } catch (e) {
      console.error(e);
    } finally {
      setEditTweet(initialEditTweet);
    }
  };

  const handleEdit = (selectedItem: ITweets) => {
    inputRef && inputRef.current && inputRef?.current.focus();
    setEditTweet((prev) => ({
      ...prev,
      isEdit: true,
      tweet: selectedItem.tweet,
      documentId: selectedItem.id,
    }));
  };

  const handleTweetChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedItem: ITweets
  ) => {
    editTweet.isEdit &&
      setEditTweet((prev) => ({ ...prev, tweet: e.target.value }));
  };

  const handleDelete = async (selectedItem: ITweets) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    const { id, userId, photo } = selectedItem;
    // ok를 안했거나 해당 유저가 아니면 리턴
    if (!ok || user?.uid !== userId) return;
    // ok했으면서 로그인 유저와 해당 트위 유저가 같은경우
    console.log("문서 ID", id);
    try {
      await deleteDoc(doc(db, "tweets", id));

      // 사진 업로드한 경우에만 실행
      if (photo) {
        const photoRef = ref(
          storage,
          `tweets/${user?.uid}-${user?.displayName}/${id}`
        );
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let unsubscribe: null | Unsubscribe;
    const fetchData = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        orderBy("createAt", "desc") // 최신순: 내림차순으로 (5->4->3)
      );
      /*
      // 현재 상태에서만 데이터 불러오기
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
      */

      // 실시간 데이터
      unsubscribe = onSnapshot(tweetQuery, (snapshot) => {
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
        });

        setTweets(tweets);
      });
    };

    fetchData();

    return () => {
      // 실시간 데이터 snapshot이벤트/ 구독취소
      unsubscribe && unsubscribe();
    };
  }, []);

  // view
  return (
    <Wrapper>
      {tweets.map((item) => (
        <TweetWrapper key={item.id}>
          <Column className="text-column">
            <Username>{item.username}</Username>
            {editTweet.documentId === item.id && editTweet.isEdit ? (
              <PayloadInput
                type="text"
                ref={inputRef}
                value={editTweet.tweet}
                onChange={(e) => handleTweetChange(e, item)}
              />
            ) : (
              <Payload>{item.tweet}</Payload>
            )}
          </Column>
          {item.photo && (
            <Column>
              <Photo src={item.photo} />
            </Column>
          )}
          {/* 로그인 유저와 트윗 작성한 유저가 같으면 삭제버튼 노출 */}
          <IconWrap>
            {item.userId === user?.uid && (
              <>
                {editTweet.isEdit && (
                  <IconButton type="button" onClick={() => handleSave(item)}>
                    <AiOutlineCheck />
                  </IconButton>
                )}
                <IconButton type="button" onClick={() => handleEdit(item)}>
                  <BsPencilSquare />
                </IconButton>
                <IconButton type="button" onClick={() => handleDelete(item)}>
                  <AiTwotoneDelete />
                </IconButton>
              </>
            )}
          </IconWrap>
        </TweetWrapper>
      ))}
    </Wrapper>
  );
};

export default Timline;
