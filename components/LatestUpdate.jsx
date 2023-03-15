import React from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";
import useSWR from "swr";
const getLatestUpdate = (url) => axios.get(url).then((res) => res.data);
export default function LatLatestUpdate() {
  const { data } = useSWR(`/api/latestNews/getLatestUpdate`, getLatestUpdate);
  return (
    <Marquee
      style={{ background: "#2E3094", color: "#ffffff" }}
      gradient={false}
    >
      {data ? data.title : null}
    </Marquee>
  );
}
