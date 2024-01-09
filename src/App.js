import React, { useState, useEffect } from 'react';
import Service from './Service'

const App = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {

    const apiLink = 'https://service-registry-backend.19ixenk8r62s.us-east.codeengine.appdomain.cloud/api/service-registry/service/find-all';

    const fetchData = async () => {
      try {
        const response = await fetch(apiLink);
        const result = await response.json();
        setServices(result);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(services)) {
    return <div>Loading...</div>;
  }
  
  console.log(services);
  
  return (
    <div class="main">
      {services.map((service, index) => (
        <Service key={index} service={service} />
      ))}
    </div>
  );
};

export default App;
