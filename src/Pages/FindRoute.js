import React, {useState} from 'react'
import Map from '../Components/Map';

const FindRoute = () => {
  const [trainIds, setTrainIds] = useState([]);
  return (
      <Map trainIds={trainIds}
      setTrainIds={setTrainIds}
      />
  )
}

export default FindRoute;
