import React from "react";
import "../sass/components/Sites.scss";
function Sites() {
  return (
    <div className="sites__body">
      <div className="site">
        <div className="title">
          <a href="https://meancloud.web.app/">
            <button className="noselect">Meancloud.web.app</button>
          </a>
        </div>

        <img
          className="noselect"
          src="https://sun9-30.userapi.com/impg/8sc4UYSAbPF-zNggU5bPqZ0mdzO-ZYaa6Rb2Kg/4zU_jUaqqlI.jpg?size=1919x980&quality=96&sign=4b20d1161f2507b1b22c012794bcea90&type=album"
          alt=""
        />
      </div>
      <div className="site">
        <div className="title">
          <a href="https://archstyles.web.app/modern">
            <button className="noselect">Archstyles.web.app</button>
          </a>
        </div>

        <img
          className="noselect"
          src="https://sun9-56.userapi.com/impg/byi8jRjltVdjk1BaJyskIQnQM6nvRQDj2E-ziQ/0-miaXsVPzI.jpg?size=1902x978&quality=96&sign=2a94b31952c92dbf954e908b4e74c661&type=album"
          alt=""
        />
      </div>
    </div>
  );
}

export default Sites;
