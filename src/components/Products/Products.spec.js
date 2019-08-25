import React                from 'react'
import {configure, shallow} from 'enzyme'
import Adapter              from 'enzyme-adapter-react-16'
import Products             from "./Products";

configure({adapter : new Adapter()});

describe('<Products />', function () {
  let wrapper = shallow(<Products />);
  it('should render the loading message if in the loading state not', function () {

  });
});
