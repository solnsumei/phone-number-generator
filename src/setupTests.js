import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.URL.createObjectURL = () => {};

configure({ adapter: new Adapter() });
