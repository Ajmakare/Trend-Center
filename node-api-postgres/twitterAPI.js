import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

export default async function getTwitterJSON() {
  const result = await fetch(
    "https://api.twitter.com/1.1/trends/place.json?id=1",
    {
      method: "GET",
      headers: {
        Authorization: process.env.API_BEARER,
        Key: process.env.API_KEY,
        Cookie:
          'guest_id=v1%3A165032082139279871; guest_id_ads=v1%3A165032082139279871; guest_id_marketing=v1%3A165032082139279871; personalization_id="v1_ZCxSjhUrWmdXLIaQOCdsng=="',
      },
    }
  );
  const data = await result.json();
  return data;
}
