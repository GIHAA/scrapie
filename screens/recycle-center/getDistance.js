export async function getDistance(origin) {
  const GOOGLE_DISTANCES_API_KEY = "AIzaSyCWiOaJO60oKRaaWoiBU2X8_J-cTSRt5eU";
  const BaseLocation = "555 E Lafayette St, Detroit, MI 48226";
  const TargetLocation = "21000 W 10 Mile Rd, Southfield, MI 48075";
  
  let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
  let params = `origins=${origin.origins}&destinations=${origin.destinations}&key=${GOOGLE_DISTANCES_API_KEY}`;
  let finalApiURL = `${ApiURL}${encodeURI(params)}`;


  console.log("finalApiURL:\n");
  console.log(finalApiURL);

  // get duration/distance from base to each target
  try {
    let response = await fetch(finalApiURL);
    let responseJson = await response.json();
    // console.log("responseJson:\n");
    const myJSON = JSON.stringify(responseJson)
    // console.log(myJSON);
    return myJSON;
  } catch (error) {
    console.error(error);
  }
}
