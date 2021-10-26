import styled from "styled-components";
import Head from "next/head";
import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { configuration } from "../configuration";
import AquaClient from "../graphql/aquaClient";
import { Streamer, StreamerBonus } from "../models/streamer";
import Wrapper from "../components/Layouts/Wrapper";
import lowerCase from "lodash/lowerCase";
import BonusStripe from "../components/BonusStripe/BonusStripe";
import VideoDiscalimer from "../components/VideoDisclaimer/VideoDisclaimer";
import FullPageLoader from "../components/FullPageLoader";
import Container from "../components/Layouts/Container";

interface Props {
  streamerData: Streamer;
}

const index: FunctionComponent<Props> = ({ streamerData }) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState<string>("");
  useEffect(() => {
    if (country !== "") getBonusList();
  }, [country]);
  const [bonuses, setBonuses] = useState<StreamerBonus[] | undefined>(
    undefined
  );
  useEffect(() => {
    console.log(bonuses);
  }, [bonuses]);

  console.log(streamerData);

  useEffect(() => {
    geoLocate();
  }, []);

  const geoLocate = async () => {
    const userCountryRequest = await axios.get(configuration.geoApi);
    const countryCode = lowerCase(userCountryRequest.data.country_code2);
    if (countryCode) setCountry(countryCode);
  };

  const getBonusList = async () => {
    let bonusForCountry = streamerData.countryBonusList.filter(
      (it) => it.label === country
    );
    if (bonusForCountry.length == 0)
      bonusForCountry = streamerData.countryBonusList.filter(
        (it) => it.label === "row"
      );

    const requests = bonusForCountry[0].bonuses.map((b) =>
      axios.get(`${configuration.api}/bonuses/${b.id}`)
    );

    const bList = await Promise.all(requests);

    console.log(bList.map((r) => r.data as StreamerBonus[]));

    setBonuses(bList.map((r) => r.data as StreamerBonus));
    setLoading(false);
  };

  const openWebsite = () => window.open("https://www.spikeslot.com");

  const goToInstagram = () => {
    window.open("https://www.instagram.com/spikeslot");
  };

  const goToTelegram = () => {
    window.open("https://t.me/s/spikeslot");
  };
  const gotToFacebook = () => {
    window.open("https://www.facebook.com/spikeslot");
  };

  const goToTwitter = () => {
    window.open("https://twitter.com/spikeslot");
  };

  const goToYoutube = () => {
    window.open("https://www.youtube.com/c/SPIKEslot2");
  };

  const goToTwitch = () => {
    window.open("https://www.twitch.tv/spikeslot");
  };

  if (loading) return <FullPageLoader />;
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

        <h1 style={{ paddingBottom: "0px" }}>Tutti i link ai miei social:</h1>

        <div
          className="social-container"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: ".5rem",
            flexWrap: "wrap",
          }}
        >
          <img
            onClick={() => goToInstagram()}
            style={{ marginRight: "1rem" }}
            height={76}
            src="/icons/instagram.png"
          />
          <img
            onClick={() => goToTelegram()}
            style={{ marginRight: "1rem" }}
            height={76}
            src="/icons/telegram.png"
          />
          <img
            onClick={() => gotToFacebook()}
            style={{ marginRight: "1rem" }}
            height={76}
            src="/icons/facebook.png"
          />
          <img
            onClick={() => goToTwitter()}
            style={{ marginRight: "1rem" }}
            height={76}
            src="/icons/twitter.png"
          />

          <img
            onClick={() => goToYoutube()}
            style={{ marginRight: "1rem" }}
            height={76}
            src="/icons/youtube.png"
          />

          <img
            onClick={() => goToTwitch()}
            style={{ marginRight: "1rem" }}
            height={76}
            src="/icons/twitch.png"
          />
        </div>

        <h1 style={{ marginTop: "1rem" }}>
          Migliori casinò legali dove trovare questi giochi:
        </h1>

        {bonuses &&
          bonuses.length > 2 &&
          bonuses.map((bonus: StreamerBonus) => (
            <BonusStripe
              key={`${bonus.name}`}
              bonus={bonus}
              countryCode={country}
            />
          ))}

        {bonuses &&
          bonuses.length <= 2 &&
          streamerData.bonuses.map((bonus: StreamerBonus) => (
            <BonusStripe
              key={`${bonus.name}`}
              bonus={bonus}
              countryCode={country}
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
  const pickedBonus = query.options;

  const aquaClient = new AquaClient();

  const streamer = await axios.get(
    `${configuration.api}/streamers/${configuration.streamerId}`
  );

  return {
    props: {
      streamerData: streamer.data as Streamer,
    },
  };
}

export default index;
