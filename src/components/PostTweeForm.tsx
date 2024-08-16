import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

// 트윗 올리는 컴포넌트
const PostTweeForm = () => {
  // logic
  const user = auth.currentUser;

  const [isLoading, setIsLoading] = useState(false); // 포스팅 중..
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target; // 객체
    // 선택된 파일이 1개인 경우 해당 파일 저장
    if (files && files.length === 1) {
      // key값이 0인 속성의 value에 file데이터 객체가 있음
      console.log("🚀 ~ handleFileChange ~ files:", files[0]);
      setFile(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 포스팅 중이거나 tweet이 빈값이거나 글자수가 180자 초과하면 실행안함
    if (!user || isLoading || !tweet || tweet.length > 180) return;
    console.log("submit");
    setIsLoading(true);
    try {
      const document = await addDoc(collection(db, "tweets"), {
        userId: user.uid, // 삭제시 작성자ID가 필요하기 때문
        username: user.displayName || "Anonymous",
        tweet,
        createAt: Date.now(), // 작성 시간을 밀리초 단위로 저장
      });

      // 이미지 업로드
      if (file) {
        // 해당 파일 위치에대한 객체 가져오기
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${document.id}`
        );
        const uploadResult = await uploadBytes(locationRef, file);
        console.log("🚀 locationRef:", locationRef);
        console.log("🚀 file:", file);

        // 3. 업로드한 사진의 url을 가져와서 document에 연결하기
        const url = await getDownloadURL(uploadResult.ref); // 업로드한 파일의 퍼블릭 url받기
        console.log("🚀uploadResult.ref:", uploadResult.ref);
        console.log("🚀url:", url);

        updateDoc(document, {
          photo: url,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // view
  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={tweet}
        rows={5}
        maxLength={180}
        placeholder="What is happening?!"
        onChange={handleTweetChange}
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo Added✅" : "Add Photo"}
      </AttachFileButton>
      {/* file타입은 기본적으로 1개만 받아옴. 여러개 받고 싶으면 multiple 속성 */}
      <AttachFileInput
        type="file"
        id="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <SubmitBtn type="submit">
        {isLoading ? "Posting..." : "Post Tweet"}
      </SubmitBtn>
    </Form>
  );
};

export default PostTweeForm;
