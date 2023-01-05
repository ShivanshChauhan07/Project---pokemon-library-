import React, { useState } from "react";

const Card = ({ id, sprites, name, types, stats }) => {
  const [check, setCheck] = useState(false);
  const popOut = () => {
    setCheck((prev) => !prev);
  };
  return (
    <div className="thumb-container">
      <p className="number">#0{id}</p>
      <img src={sprites.other.dream_world.front_default} alt="pokemon img" />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <p>type: {types[0].type.name}</p>
        <button className="pokinfo" onClick={popOut}>
          Know more
        </button>
      </div>
      {check ? (
        <div className="pop-out">
          <h5>Stat</h5>
          {stats.map((item, index) => {
            return (
              <p key={index}>
                {item.stat.name}: {item.base_stat}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Card;
