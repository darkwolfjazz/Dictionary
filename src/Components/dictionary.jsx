import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Dictionary() {
  const [searchWord, setSearchWord] = useState('');
  const [data, setData] = useState(null);

  const getMeaning = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
      .then((response) => response.json())
      .then((data) => setData(data[0]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <h1>Dictionary App</h1>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button onClick={() => getMeaning()}>
          <FaSearch size="20px" />
        </button>
      </div>
      {data && (
        <div className="showResults">
          <h2>{data.word}</h2>
          {data.meanings.map((meaning, index) => (
            <div key={index}>
              <h3>{meaning.partOfSpeech}</h3>
              {meaning.definitions.map((definition, index) => (
                <div key={index}>
                  <p>{definition.definition}</p>
                  {definition.example && (
                    <p>
                      <em>Example: {definition.example}</em>
                    </p>
                  )}
                  {definition.synonyms && (
                    <p>
                      Synonyms: {definition.synonyms.join(', ')}
                    </p>
                  )}
                  {definition.antonyms && (
                    <p>
                      Antonyms: {definition.antonyms.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dictionary;
