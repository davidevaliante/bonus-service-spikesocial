import React, { FunctionComponent, useEffect, useContext } from "react";
import AquaClient from "../../../graphql/aquaClient";
import {
  BONUSES_BY_NAME,
  STREAMER_BY_ID,
} from "../../../graphql/queries/bonus";
import { Bonus } from "../../../graphql/schema";
import styled from "styled-components";
import { tablet } from "../../../components/Responsive/Breakpoints";
import { initializeAnalytics } from "../../../analytics/base";
import { cookieContext } from "../../../context/CookieContext";
import CookieDisclaimer from "../../../components/CookieDisclaimer/CookieDisclaimer";
import VideoDiscalimer from "../../../components/VideoDisclaimer/VideoDisclaimer";
import BonusStripe from "../../../components/BonusStripe/BonusStripe";
import { Streamer, StreamerBonus } from "../../../models/streamer";
import { configuration } from "../../../configuration";
import axios from "axios";
import Router from "next/router";
import lowerCase from "lodash/lowerCase";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import FullPageLoader from "../../../components/FullPageLoader";
import Wrapper from "../../../components/Layouts/Wrapper";
import Container from "../../../components/Layouts/Container";

interface Props {
  streamerData: Streamer;
  bonusToShow: number[];
}

const Compare: FunctionComponent<Props> = ({ streamerData, bonusToShow }) => {
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [bonuses, setBonuses] = useState<StreamerBonus[] | undefined>(
    undefined
  );

  useEffect(() => {
    geoLocate();
  }, []);

  const geoLocate = async () => {
    const userCountryRequest = await axios.get(configuration.geoApi);
    const countryCode = lowerCase(userCountryRequest.data.country_code2);
    getBonusByName();
    if (countryCode) setCountry(countryCode);
  };

  const getBonusByName = () => {
    const streamerBonuses = streamerData.bonuses;
    const placeholder: StreamerBonus[] = [];

    console.log(bonusToShow);

    const remappedBonusToShow = [...bonusToShow];

    // betflag == 47 admiral == 33 win 55

    // /b/55-18-1-17-47

    // /b/47-18-1-17-38

    if (remappedBonusToShow.includes(47)) {
      const indexToRemove = remappedBonusToShow.indexOf(47);

      if (!remappedBonusToShow.includes(55)) {
        remappedBonusToShow.splice(indexToRemove, 1, 55);
      } else {
        remappedBonusToShow.splice(indexToRemove, 1, 33);
      }
    }

    remappedBonusToShow.forEach((bonusCode) => {
      const b = streamerBonuses.find((b) => b.id === bonusCode);
      if (b) placeholder.push(b);
    });

    setBonuses(placeholder);
    console.log(placeholder, "bonus to show");
  };

  const openWebsite = () => window.open("https://www.spikeslot.com");

  if (!country) return <FullPageLoader />;
  return (
    <Wrapper>
      <Container>
        <div
          className="top-bar"
          style={{ cursor: "pointer" }}
          onClick={() => openWebsite()}
        >
          <img className="logo" src="/icons/app_icon.png" />
        </div>

        <h1>Migliori casinò legali dove trovare questi giochi:</h1>

        {bonuses &&
          bonuses.length > 2 &&
          bonuses.map((bonus: StreamerBonus) => (
            <BonusStripe
              key={`${bonus.name}`}
              bonus={bonus}
              countryCode={country}
              fromInstagram={true}
            />
          ))}

        {bonuses &&
          bonuses.length <= 2 &&
          streamerData.bonuses.map((bonus: StreamerBonus) => (
            <BonusStripe
              key={`${bonus.name}`}
              bonus={bonus}
              countryCode={country}
              fromInstagram={true}
            />
          ))}

        <div style={{ padding: "1rem" }}>
          <VideoDiscalimer />
        </div>
        {/* <div className='bottom'>
                    <p style={{textAlign : 'center'}}>This service is provided by <a href='https://www.topaffiliation.com'>Top Affiliation</a></p>
                </div> */}
      </Container>
    </Wrapper>
  );
};

export async function getServerSideProps({ query }) {
  const pickedBonus = query.bonuses;

  const aquaClient = new AquaClient();

  const bonusToShow = pickedBonus.split("-").map((b) => parseInt(b));

  const streamer = await axios.get(
    `${configuration.api}/streamers/${configuration.streamerId}`
  );

  return {
    props: {
      streamerData: streamer.data as Streamer,
      bonusToShow: bonusToShow,
    },
  };
}

export default Compare;
