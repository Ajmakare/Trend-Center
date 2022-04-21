import fetch from "node-fetch"

export default async function getTwitterJSON() {
  const result = await fetch(
    "https://api.twitter.com/1.1/trends/place.json?id=1",
    {
      method: "GET",
      headers: {
        Authorization:
          
        AqRmngtb6C8oKcsdCSNiC8chd: ,
        Cookie:
          
      },
    }
  )
  const data = await result.json()
  return data
}
