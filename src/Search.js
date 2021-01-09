import React, { Component, useState } from 'react'
import './Search.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import SearchIcon from '@material-ui/icons/Search';
import { selectLocation, setLocation } from './features/locationSlice';
import { useDispatch } from 'react-redux';
import { setCity } from './features/citySlice';
function Search () {
    
    const [state, setState] = useState({address: ''});
    const dispatch = useDispatch();
     const handleChange = address => {
        setState({ address });
      };
     
     const handleSelect = address => {
        setState({ address });
        dispatch(setCity(address.split(',')[0]));
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => { dispatch(setLocation(latLng))
        })
          .catch(error => console.error('Error', error));
      };
        return (
            <PlacesAutocomplete
        value={state.address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className="search">
              <div className="search__container">
                  <SearchIcon />
            <input
            value={state.address}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
              </div>
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                return (
                  <div className="search__suggestion"
                    {...getSuggestionItemProps(suggestion, {
                    })}
                  >
                    <LocationOnIcon /> <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
        )
}

export default Search
