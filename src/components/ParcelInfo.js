import React from 'react';

export default function ParcelInfo({ data }) {
  if (!data.length) return null;
  const results = data
    // remove nullish items from array
    .filter((n) => n)
    .map((item, idx) => {
      let i = '';
      for (const [key, value] of Object.entries(item)) {
        i = `${key}: ${value}`;
      }
      return <span key={idx}>{i}</span>;
    });

  return <div>{results}</div>;
}
