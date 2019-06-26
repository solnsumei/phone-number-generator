import React from 'react';
import { shallow } from 'enzyme';
import SortButtonsAndDownloadLink from '../components/SortButtonsAndDownloadLink';


describe('SortButtonAndDownloadLink Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SortButtonsAndDownloadLink />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('button')).toHaveLength(2);
    expect(wrapper.find('a')).toHaveLength(1);
  });
});
