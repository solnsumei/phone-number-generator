import React from 'react';
import { shallow } from 'enzyme';
import UserInputForm from '../components/UserInputForm';


describe('UserInputForm Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<UserInputForm />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('form');
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
  });
});
