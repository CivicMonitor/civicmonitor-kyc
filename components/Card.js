import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";


function Card(props) {
  const { name, imgPath, candidate, politicalParty, id } = props;
  return <div className="w-1/2 md:w-1/2 lg:w-1/3 px-3 flex flex-col mb-8">
      <div className="hover:translateY-2px transition bg-white rounded-lg shadow flex-1 flex flex-col">
        <a href="#" className="block no-underline bg-cover h-48" style={{ backgroundImage: `url("https://res.cloudinary.com/civic-monitor/image/upload/${imgPath}")` }} />
        <div className="p-6 flex-1 flex flex-col justify-between">
          <h3 className="font-display mb-4">
            <Link href={{ pathname: "/profile", query: { id: candidate.id } }}>
              <a className="no-underline hover:underline">
                <p className="no-underline hover:underline text-black capitalize">
                  {name}
                </p>
                <a className="block no-underline hover:underline text-black">
                  {/* {party} */}
                  <span className="text-grey-dark text-sm mr-2">
                    {politicalParty.name} ({politicalParty.acronym})
                  </span>
                </a>
              </a>
            </Link>
          </h3>
          <div className="flex justify-between items-baseline">
           
            <Link href={{ pathname: "/profile", query: { id: candidate.id } }} >
            <a className="no-underline shadow uppercase rounded sm:rounded text-indigo text-sm font-bold tracking-wide px-4 py-2 hover:text-indigo-darker "> Know More</a>
            </Link>
            <button onClick={e => props.add({
                  id: id,
                  name,
                  imgPath
            })} className="bg-indigo shadow uppercase rounded sm:rounded text-white text-sm font-bold tracking-wide px-4 py-2 hover:bg-indigo-light">
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>;
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  candidate: PropTypes.object.isRequired,
  politicalParty: PropTypes.object.isRequired
};

export default Card

