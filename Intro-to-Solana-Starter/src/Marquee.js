import React from 'react';
import "./Marquee.css";

//React Icons - Material Design
import { CgPill,CgMoon,CgOrganisation,CgEventbrite,CgCrown,CgAnchor, CgGym } from "react-icons/cg";
import { MdOutlineCoffeeMaker,MdOutlineLocalLibrary,MdLocalConvenienceStore, MdOutlineLocalMovies, MdLocalGroceryStore, MdCardMembership,MdEco, MdEventSeat,MdCardGiftcard } from "react-icons/md";

const Marquee = ({c}) => {
  return (
    <article className="wrapper">
    <div className="marquee">
      <div className="marquee__group">
        <span>
          <MdCardGiftcard className="cover-icon"/>
        </span>
        <span>
          <CgGym className="cover-icon"/>
        </span>
        <span>
          <MdEco className="cover-icon"/>
        </span>
        <span>
          <MdEventSeat className="cover-icon"/>
        </span>
        <span>
          <MdCardMembership className="cover-icon"/>
        </span>
        <span>
          <MdLocalConvenienceStore className="cover-icon"/>
        </span>
        <span>
          <MdLocalGroceryStore className="cover-icon"/>
        </span>
        <span>
          <MdOutlineLocalMovies className="cover-icon"/>
        </span>
      </div>

      <div aria-hidden="true" className="marquee__group">
        <span>
          <MdOutlineCoffeeMaker className="cover-icon"/>
        </span>
        <span>
          <CgAnchor className="cover-icon"/>
        </span>
        <span>
          <CgCrown className="cover-icon"/>
        </span>
        <span>
          <CgEventbrite className="cover-icon"/>
        </span>
        <span>
          <CgMoon className="cover-icon"/>
        </span>
        <span>
          <CgOrganisation className="cover-icon"/>
        </span>
        <span>
          <CgPill className="cover-icon"/>
        </span>
        <span>
          <MdOutlineLocalLibrary className="cover-icon"/>
        </span>
      </div>
    </div>

    <div className="marquee marquee--reverse">
      <div className="marquee__group">
      <span>
          <MdOutlineCoffeeMaker className="cover-icon"/>
        </span>
        <span>
          <CgAnchor className="cover-icon"/>
        </span>
        <span>
          <CgCrown className="cover-icon"/>
        </span>
        <span>
          <CgEventbrite className="cover-icon"/>
        </span>
        <span>
          <CgMoon className="cover-icon"/>
        </span>
        <span>
          <CgOrganisation className="cover-icon"/>
        </span>
        <span>
          <CgPill className="cover-icon"/>
        </span>
        <span>
          <MdOutlineLocalLibrary className="cover-icon"/>
        </span>
      </div>

      <div aria-hidden="true" className="marquee__group">
      <span>
          <MdCardGiftcard className="cover-icon"/>
        </span>
        <span>
          <CgGym className="cover-icon"/>
        </span>
        <span>
          <MdEco className="cover-icon"/>
        </span>
        <span>
          <MdEventSeat className="cover-icon"/>
        </span>
        <span>
          <MdCardMembership className="cover-icon"/>
        </span>
        <span>
          <MdLocalConvenienceStore className="cover-icon"/>
        </span>
        <span>
          <MdLocalGroceryStore className="cover-icon"/>
        </span>
        <span>
          <MdOutlineLocalMovies className="cover-icon"/>
        </span>
      </div>
    </div>
  </article>
  );
};

export default Marquee;

