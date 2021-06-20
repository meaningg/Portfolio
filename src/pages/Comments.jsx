import React, { useState } from "react";
import "../sass/pages/comments.scss";
import Fade from "react-reveal";
function CommentsTest() {
  const [commentInput, setCommentInput] = useState(false);

  return (
    <div className="comments__body">
      <div className="post">
        <div className="likebtn noselect">Like</div>
        <div
          onClick={
            commentInput === false
              ? () => {
                  setCommentInput(true);
                }
              : () => {
                  setCommentInput(false);
                }
          }
          className="commentbtn noselect"
        >
          Comment
        </div>
      </div>
      <Fade collapse mountOnEnter unmountOnExit when={commentInput}>
        <div className="comments__box ">
          <div className="testItem">
            <input type="text" />
            <button>Send</button>
          </div>
        </div>
      </Fade>
      <div className="comments">aa</div>
    </div>
  );
}

export default CommentsTest;
