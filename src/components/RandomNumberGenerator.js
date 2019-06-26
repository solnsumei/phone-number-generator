import React from 'react';
import {
  getTotalNumberOfGeneratedPhoneNumbers,
  setTotalNumberOfGeneratedPhoneNumbers } from '../utils/helpers';
import SortButtonsAndDownloadLink from './SortButtonsAndDownloadLink';
import UserInputForm from './UserInputForm';

class RandomNumberGenerator  extends React.Component {

  state = {
    totalCount: getTotalNumberOfGeneratedPhoneNumbers(),
    phoneNumbers: [],
    phoneNumbersString: null,
    fileName: null,
    link: null,
    numberOfItemsToGenerate: '',
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
      numberOfItemsToGenerate: '',
    });
  };

  sortNumbers = (phoneNumberArr, sortType, isNew=false) => {
    const sortedNumbers = phoneNumberArr
      .sort((a, b) => (sortType === 'desc' ? (b - a) : (a - b)));

    if (isNew) {
      this.setState({
        minNumberGenerated: sortedNumbers[0],
        maxNumberGenerated: sortedNumbers[phoneNumberArr.length - 1]
      });
    }
    
    return this.showGeneratedPhoneNumbers(sortedNumbers);
  }

  reset = () => {
    this.setState({
      phoneNumbersString: null,
      phoneNumbers: [],
      fileName: null,
      link: null,
      maxNumberGenerated: null,
      minNumberGenerated: null,
    });
  }

  handleChange = (event) => {
    this.setState({
      numberOfItemsToGenerate: event.target.value,
    });
  }
    
  generateNumbers = (event) => {
    event.preventDefault();

    const { numberOfItemsToGenerate } = this.state;
    let number = parseInt(numberOfItemsToGenerate);
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
    return this.sortNumbers(phoneNumbers, 'asc', true);
  }

  render() {
    const {
      totalCount,
      phoneNumbers,
      phoneNumbersString,
      numberOfItemsToGenerate,
      maxNumberGenerated,
      minNumberGenerated,
      link,
      fileName } =  this.state;

    return (
      <div className="container">
        <p className="text-off-white">
          <span>Total Numbers Generated: <strong>{totalCount}</strong></span>
          { phoneNumbersString 
            &&  <small className="float-right">
                  Minimum Number Generated: <strong>{minNumberGenerated}</strong>,
                  Maximum Number Generated: <strong>{maxNumberGenerated}</strong> 
                </small>
          }
        </p>
        {
          phoneNumbersString
          ? <div className="phone-numbers" id="phone-numbers-div">
              <p className='align-left numbers'>{phoneNumbersString}</p>
            </div>
          : <UserInputForm
              onSubmit={(e) => this.generateNumbers(e)}
              onChange={(e) => this.handleChange(e)}
              value={numberOfItemsToGenerate}
            />
        }
        
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
          && <button
                onClick={() => this.reset()}
                className="generate-btn"
                > Reset
              </button>
          }
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator;
