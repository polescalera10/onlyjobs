import Link from "next/link";
import React from "react";

function List({ jobs }) {
  return (
    <div className="container flex flex-col items-center justify-center w-full mx-auto">
      <ul className="flex flex-col divide-y divide w-1/2">
        {jobs &&
          jobs.map((job) => {
            const { position, location, duration, salary, id } = job;
            const link = `/jobs/${position.replace(
              /\s/g,
              ""
            )}-${location.replace(/\s/g, "")}-${id}`;
            return (
              <Link key={id} legacyBehavior href={link}>
                <li className="flex flex-row bg-white rounded-lg shadow">
                  <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                    <div className="flex-1">
                      <div className="font-medium">{position}</div>
                      <div className="text-sm text-gray-600">{duration}</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium">{location}</div>
                      <div className="text-sm text-gray-600">{salary}$</div>
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default List;
