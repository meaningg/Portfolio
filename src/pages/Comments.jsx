import React, { useState, useEffect, useRef } from "react";
import "../sass/pages/comments.scss";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import firebaseConfig from "../components/config";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const auth = firebase.auth();
const db = firebase.firestore();

function CommentsTest() {
  const [user] = useAuthState(auth);
  return <div>{user ? <Comsproj /> : <SignIn />}</div>;
}

function Comsproj() {
  const [commentInput, setCommentInput] = useState(false);
  const [user] = useAuthState(auth);
  const [addComment, setAddComment] = useState("");
  const inputFocus = useRef(null);
  const firestoreUserCreate = () => {
    db.collection("users").doc(user.uid).set({
      name: user.displayName,
      img: user.photoURL,
      email: user.email,
      uid: user.uid,
    });
  };
  if (user) {
    firestoreUserCreate();
  }
  const handleAddComment = (e) => {
    e.preventDefault();
    if (addComment !== "") {
      setCommentInput(false);
      db.collection("comments").add({
        likes: 0,
        text: addComment,
        uid: user.uid,
        date: Date.now(),
      });
      setAddComment("");
    }
  };
  const handeInput = () => {
    if (commentInput === false) {
      setCommentInput(true);
      setTimeout(() => {
        inputFocus.current.focus();
      }, 200);
    } else {
      setCommentInput(false);
    }
  };

  return (
    <div className="comments__body">
      <SignOut />
      <div className="post">
        <div className="post__content noselect">some post</div>
        <div className="post__buttons">
          <Likes />
          <div
            onClick={() => {
              handeInput();
            }}
            className="commentbtn noselect"
          >
            Comment
          </div>
        </div>
      </div>

      <div className="box">
        <CSSTransition
          in={commentInput}
          timeout={200}
          mountOnEnter
          unmountOnExit
        >
          <div className="comments__box ">
            <form action="submit">
              <input
                ref={inputFocus}
                onChange={(e) => setAddComment(e.target.value)}
                type="text"
              />
              <button type="submit" onClick={handleAddComment}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </button>
            </form>
          </div>
        </CSSTransition>
      </div>
      <Comments />
    </div>
  );
}

function Likes() {
  const [likesSize, setLikesSize] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [user] = useAuthState(auth);
  const [likesList, setLikesList] = useState([]);
  // getting likes count
  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db.collection("likes").onSnapshot((snap) => {
      const likesData = [];
      snap.forEach((doc) => likesData.push({ ...doc.data(), id: doc.id }));
      setLikesSize(snap.size);
      setLikesList(likesData);
      console.log(likesList);
    });
  }, []);
  // getting like state
  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db
      .collection("likes")
      .where(firebase.firestore.FieldPath.documentId(), "==", user.uid)
      .onSnapshot((snapshot) => {
        setIsLiked(snapshot.empty);
      });
  }, []);

  // handle like state
  const handleLike = () => {
    if (isLiked === false) {
      db.collection("likes")
        .doc(user.uid)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    } else {
      db.collection("likes").doc(user.uid).set({
        isLiked: true,
      });
    }
  };

  return (
    <div className="likebtn noselect">
      <div
        onClick={() => {
          handleLike();
        }}
        className={isLiked ? "icon" : "icon liked"}
      >
        <FontAwesomeIcon icon={faHeart} />
      </div>

      <div type="primary" className="count">
        {likesSize}
        <div className="likes__list">
          <ul>
            <li>
              {likesList.slice(0, 5).map((doc) => (
                <div>
                  <LikesUserInfo uid={doc.id} />
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function LikesUserInfo({ uid }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db
      .collection("users")
      .where("uid", "==", uid)
      .onSnapshot((snapshot) => {
        const usrData = [];
        snapshot.forEach((doc) => usrData.push({ ...doc.data(), id: doc.id }));
        setUserData(usrData);
      });
  }, []);

  return (
    <div>
      {userData.map((doc) => (
        <div key={doc.id} className="user">
          <div className="img">
            <img src={doc.img} alt="" />
          </div>
          <div className="name">{doc.name}</div>
        </div>
      ))}
    </div>
  );
}

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db
      .collection("comments")
      .orderBy("date", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const comsData = [];
        snapshot.forEach((doc) => comsData.push({ ...doc.data(), id: doc.id }));
        setComments(comsData);
      });
  }, []);
  return (
    <div className="comments">
      {comments.map((doc) => (
        <div key={doc.id} className="comment">
          <UserInfo date={doc.date} uid={doc.uid} />
          <div className="text">{doc.text}</div>
        </div>
      ))}
    </div>
  );
}

function UserInfo({ date, uid }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db
      .collection("users")
      .where("uid", "==", uid)
      .onSnapshot((snapshot) => {
        const usrData = [];
        snapshot.forEach((doc) => usrData.push({ ...doc.data(), id: doc.id }));
        setUserData(usrData);
      });
  }, []);

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }
  return (
    <div className="user__info">
      {userData.map((doc) => (
        <div key={doc.id} className="user">
          <div className="img">
            <img src={doc.img} alt="" />
          </div>
          <div className="name">{doc.name}</div>
        </div>
      ))}

      <div className="date">{convertDate(date)}</div>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="signin">
      <button className="sign-in" onClick={signInWithGoogle}>
        <div className="title"> Sign in with </div>
        <div className="icon">
          <FontAwesomeIcon icon={faGoogle} />
        </div>
      </button>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export default CommentsTest;
