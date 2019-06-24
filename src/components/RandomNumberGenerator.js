import React from 'react';
import {
  getTotalNumberOfGeneratedPhoneNumbers,
  setTotalNumberOfGeneratedPhoneNumbers } from '../utils/helpers';
import SortButtonsAndDownloadLink from './SortButtonsAndDownloadLink'

class RandomNumberGenerator  extends React.Component {

  state = {
    totalCount: getTotalNumberOfGeneratedPhoneNumbers(),
    phoneNumbers: [],
    phoneNumbersString: null,
    fileName: null,
    link: null,
  };

  showGeneratedPhoneNumbers = (phoneNumbers) => {
    const phoneNumbersString = phoneNumbers.map((phone) => phone).join(', ')

    const data = new Blob([phoneNumbersString], { type: 'text/plain' });

    const link = window.URL.createObjectURL(data);
    const fileName = `phone-numbers-${Math.floor(Math.random() * 9000000)}.txt`;

    this.setState({
      phoneNumbersString,
      phoneNumbers,
      fileName,
      link,
    });
  };

  sortNumbers = (phoneNumberArr, sortType, totalCount) => {
    const sortedNumbers = phoneNumberArr
      .sort((a, b) => (sortType === 'desc' ? (b - a) : (a - b)));
    
    return this.showGeneratedPhoneNumbers(sortedNumbers);
  }

  reset = () => {
    this.setState({
      phoneNumbersString: null,
      phoneNumbers: [],
      fileName: null,
      link: null,
    });
  }
    
  generateNumbers = () => {
    let number = 300;
    let phoneNumbers = [];

    while (number > 0) {
      const min = 100000000;
      const max = 900000000;

      let phoneNumber = '0' + (Math.floor(Math.random() * max) + min);
      while (phoneNumbers.includes(phoneNumber)) {
        phoneNumber = '0' + (Math.floor(Math.random() * max) + min);
      }

      phoneNumbers.push(phoneNumber);
      number -= 1;
    }

    const totalCount = setTotalNumberOfGeneratedPhoneNumbers(phoneNumbers.length);
    this.setState({
      totalCount,
    })
    return this.sortNumbers(phoneNumbers, 'asc', totalCount);
  }

  render() {
    const {
      totalCount,
      phoneNumbers,
      phoneNumbersString,
      link,
      fileName } =  this.state;

    return (
      <div className="container">
        <p className="text-off-white">Total Numbers Generated: {totalCount}</p>
        <div className="phone-numbers" id="phone-numbers-div">
          <p className={phoneNumbersString ? 'align-left numbers' : 'text-center'}>
            {
              phoneNumbersString 
                ? phoneNumbersString
              : 'Generated phone numbers will show here'
            }
          </p>
        </div>

        {
          phoneNumbersString 
          && <SortButtonsAndDownloadLink
            sortNumbers={this.sortNumbers}
            link={link}
            fileName={fileName}
            phoneNumbers={phoneNumbers}
          />
        }

        <div className="button-div">
          {phoneNumbersString 
            ? <button
                onClick={() => this.reset()}
                className="generate-btn"
                > Clear
              </button>
            : <button
                onClick={() => this.generateNumbers()}
                className="generate-btn"
                > Generate Random Phone Numbers
              </button>
          }
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator;
