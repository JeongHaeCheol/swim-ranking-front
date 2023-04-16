import axios from 'axios'

const swimmingPool = async (nameParam) => {

  try {
    const response = await axios.get('/swimming-pool'
      , { params: { name: nameParam } }
    )
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }

  return null;

}


const getPercentileRank = async (swimmerId, poolName) => {

  try {
    const response = await axios.get('/my-percentage'
      , { params: { swimmerId, poolName } }
    )
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }

  return null;

}


export { swimmingPool, getPercentileRank };