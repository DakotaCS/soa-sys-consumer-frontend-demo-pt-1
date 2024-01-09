import React, { useState, useEffect } from 'react';
import './styles.css';

const renderValue = (value) => {
  if (Array.isArray(value)){
    if (value.length === 1 && typeof value[0] === 'object'){
      return (
        <ul>
          {Object.entries(value[0]).map(([subKey, subValue], subIndex) => (
            <li key={subIndex}>
              <strong>{subKey}:</strong> {subValue}
            </li>
          ))}
        </ul>
      );
    } else{
      
      return (
        <ul>
          {value.map((item, subIndex) => (
            <li key={subIndex}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    }
  } else if (typeof value === 'object') {
    
    return (
      <ul>
        {Object.entries(value).map(([subKey, subValue], subIndex) => (
          <li key={subIndex}>
            <strong>{subKey}:</strong> {renderValue(subValue)}
          </li>
        ))}
      </ul>
    );
  } else {
    
    return value;
  }
};

const Service = ({ service }) => {

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(service.endpoint_url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (

    <div>
      <h2>{service.name}</h2>
      {service.status === 0 ? (
        <p>Service is down</p>
      ) : (
        <>
          <button class="button" onClick={fetchData}>{service.endpoint_url}</button>
          {data && (
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{renderValue(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Service;
