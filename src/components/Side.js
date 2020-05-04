import React from 'react';

class Side extends React.Component {
  render() {
    return (
      <div className="side">
        <h2>About us:</h2>
        <p>
          We are brand new site with most delicious recepies.
          <br /> Enyoj!
        </p>
        <div className="imgSide">
          <img src={require('../images/pic_side.jpg')} alt="" />
        </div>

        <div className="addRecipeDiv">
          <button className="addButton">Add recipe</button>
        </div>
      </div>
    );
  }
}

export default Side;
