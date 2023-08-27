import React, { useState, useEffect } from 'react';
import { db } from './config/firebase'; // Make sure the path to firebase config is correct.
import {
  getDocs,
  collection,
} from 'firebase/firestore';

const ServiceUpdates = () => {
  const [serviceUpdates, setServiceUpdates] = useState([]);

  useEffect(() => {
    const fetchServiceUpdates = async () => {
      try {
        const updatesCollectionRef = collection(db, "serviceUpdates");
        const data = await getDocs(updatesCollectionRef);
        const fetchedUpdates = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setServiceUpdates(fetchedUpdates);
      } catch (err) {
        console.error("Error fetching service updates:", err);
      }
    };

    fetchServiceUpdates();
  }, []);

  return (
    <div>
      <h2>Service Updates</h2>
      <ul>
        {serviceUpdates.map((update) => (
          <li key={update.id}>
            <strong>Route:</strong> {update.route} - <strong>Status:</strong> {update.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceUpdates;
