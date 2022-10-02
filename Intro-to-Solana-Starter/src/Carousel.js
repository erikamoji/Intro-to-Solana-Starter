import React, {useState} from 'react';
import './Carousel.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const MAX_VISIBILITY = 3;
const Carousel = ({children}) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);
  
  return (
    <div className='carousel'>
      <div className='nav fixed-top'>
      {active > 0 && <button className='nav-btn' onClick={() => setActive(index => index - 1)}> <BsArrowLeftCircleFill color="white"/></button>}
      {active < count - 1 && <button className='nav-btn' onClick={() => setActive(index => index + 1)}><BsArrowRightCircleFill color="white"/> </button>}
      </div>
      {React.Children.map(children, (child, index) => (
        <div className='card-container' style={{
            '--active': index === active ? 1 : 0,
            '--offset': (active - index) / 3,
            '--direction': Math.sign(active - index),
            '--abs-offset': Math.abs(active - index) / 3,
            'opacity': Math.abs(active - index) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - index) > MAX_VISIBILITY ? 'none' : 'block',
          }}>
          {child}
        </div>
      ))}
      

    </div>
  );
};

export default Carousel;

