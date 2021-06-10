import React, { useContext, useEffect, useState } from "react";
import firebaseConfig from "./config";
import Loader from "./Loader";
import "../sass/components/linkBlocks.scss";
import { Link } from "react-router-dom";
function LinkBlocks() {
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const db = firebaseConfig.firestore();

  // const linkstest = () => {
  //   db.collection("links")
  //     .get()
  //     .then((snapshot) => {
  //       const linksData = [];
  //       snapshot.forEach((doc) =>
  //         linksData.push({ ...doc.data(), id: doc.id })
  //       );
  //       setLinks(linksData);
  //       setIsLoading(false);
  //     });
  // };
  // linkstest();
  useEffect(() => {
    const db = firebaseConfig.firestore();

    return db.collection("links").onSnapshot((snapshot) => {
      const linksData = [];
      snapshot.forEach((doc) => linksData.push({ ...doc.data(), id: doc.id }));
      setLinks(linksData);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="links__body">
      {links.map((ref) => (
        <div className="links__block">
          <Link className="name__link" to={ref.link}>
            <div className="noselect name">{ref.name}</div>
          </Link>
          <div className="noselect text">{ref.text}</div>

          <img className="noselect" src={ref.img} alt="" />
        </div>
      ))}
    </div>
  );
}

export default LinkBlocks;
