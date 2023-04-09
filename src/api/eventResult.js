import axios from 'axios'

const eventResult = async (nameParam) => {

  try {
    const response = await axios.get('/event_result2'
      , { params: { name: nameParam } }
    )
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }

  return null;

}



const getTrend = async (swimmerId, eventId) => {

  try {
    const response = await axios.get('/trend'
      , { params: {swimmerId, eventId} }
    )
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }

  return null;
}


export { eventResult, getTrend };