import React from 'react';
import { shallow } from 'enzyme';
import RandomNumberGenerator from '../components/RandomNumberGenerator';


describe('Random Number Generator Test Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RandomNumberGenerator />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(0);
    expect(wrapper.find('UserInputForm')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('should show phoneNumbers and sort buttons when form is submitted', () => {
    const wrapper = shallow(<RandomNumberGenerator />);

    const spy = jest.spyOn(wrapper.instance(), 'generateNumbers');
    wrapper.instance().setState({
      numberOfItemsToGenerate: 200,
    });

    wrapper.find('UserInputForm').dive().find('form').simulate('submit', {
      preventDefault:  () => {}
    });
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(1);
    expect(wrapper.instance().state.phoneNumbers.length).toBe(200);
    expect(wrapper.instance().state.phoneNumbersString).not.toBe(null);
    expect(spy).toHaveBeenCalled();
  });

  it(`should reset state when reset button is clicked`, () => {
    const wrapper = shallow(<RandomNumberGenerator />);

    const spy = jest.spyOn(wrapper.instance(), 'reset');

    wrapper.instance().setState({
      numberOfItemsToGenerate: 200,
    });

    wrapper.find('UserInputForm').dive().find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(1);
    expect(wrapper.instance().state.phoneNumbers.length).toBe(200);
    expect(wrapper.find('p')).toHaveLength(2);
    
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(0);
    expect(wrapper.instance().state.phoneNumbers.length).toBe(0);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should show phone numbers in descending order when sort button descending is clicked', () => {
    const wrapper = shallow(<RandomNumberGenerator />);
    const spy = jest.spyOn(wrapper.instance(), 'sortNumbers');

    wrapper.instance().setState({
      numberOfItemsToGenerate: 200,
    });

    wrapper.find('UserInputForm').dive().find('form').simulate('submit', {
      preventDefault: () => { }
    });

    wrapper.find('SortButtonsAndDownloadLink').dive().find('button').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should show phone numbers in ascending order when sort button ascending is clicked', () => {
    const wrapper = shallow(<RandomNumberGenerator />);
    const spy = jest.spyOn(wrapper.instance(), 'sortNumbers');

    wrapper.instance().setState({
      numberOfItemsToGenerate: 200,
    });

    wrapper.find('UserInputForm').dive().find('form').simulate('submit', {
      preventDefault: () => { }
    });

    wrapper.find('SortButtonsAndDownloadLink').dive().find('button').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
