import React from 'react';
import { shallow } from 'enzyme';
import RandomNumberGenerator from '../components/RandomNumberGenerator';
import SortButtonsAndDownloadLink from '../components/SortButtonsAndDownloadLink';


describe('SortButtonAndDwonloadLink Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RandomNumberGenerator />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(0);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should show phoneNumbers and sort buttons when generate button is clicked', () => {
    const wrapper = shallow(<RandomNumberGenerator />);

    const spy = jest.spyOn(wrapper.instance(), 'generateNumbers');

    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(1);
    expect(wrapper.instance().state.phoneNumbers.length).toBe(300);
    expect(wrapper.instance().state.phoneNumbersString).not.toBe(null);
    expect(wrapper.find('p').at(0).text()).not.toBe('Generated phone numbers will show here');
    expect(spy).toHaveBeenCalled();
  });

  it(`should reset state when reset button is clicked`, () => {
    const wrapper = shallow(<RandomNumberGenerator />);

    const spy = jest.spyOn(wrapper.instance(), 'reset');

    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(1);
    expect(wrapper.instance().state.phoneNumbers.length).toBe(300);
    expect(wrapper.find('p').at(0).text()).not.toBe('Generated phone numbers will show here');
    
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('SortButtonsAndDownloadLink')).toHaveLength(0);
    expect(wrapper.instance().state.phoneNumbers.length).toBe(0);
    expect(wrapper.find('p').at(0).text()).toBe('Generated phone numbers will show here');
    expect(spy).toHaveBeenCalled();
  });

  it('should show phone numbers in descending order when sort button descending is clicked', () => {
    const wrapper = shallow(<RandomNumberGenerator />);
    const spy = jest.spyOn(wrapper.instance(), 'sortNumbers');

    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.instance().state.phoneNumbers.length).toBe(300);

    wrapper.find('SortButtonsAndDownloadLink').dive().find('button').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should show phone numbers in ascending order when sort button ascending is clicked', () => {
    const wrapper = shallow(<RandomNumberGenerator />);
    const spy = jest.spyOn(wrapper.instance(), 'sortNumbers');

    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.instance().state.phoneNumbers.length).toBe(300);

    wrapper.find('SortButtonsAndDownloadLink').dive().find('button').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
