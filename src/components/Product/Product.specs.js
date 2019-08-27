import React                from 'react'
import {configure, shallow} from 'enzyme'
import Adapter              from 'enzyme-adapter-react-16'
import {Product}             from "../Product/Product.js";

configure({adapter : new Adapter()});

describe('<Product />', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Product/>);
  });

  it('should render the value of color', () => {
    wrapper.setProps({ color: undefined });
    wrapper.find('div').simulate('click'); // Simulating a click event.

    expect(wrapper.state('color')).toEqual('transparent');
  });
});
