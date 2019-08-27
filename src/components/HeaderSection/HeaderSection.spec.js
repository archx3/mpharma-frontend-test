import React                from 'react'
import {configure, shallow} from 'enzyme'
import Adapter              from 'enzyme-adapter-react-16'
import HeaderSection        from "./HeaderSection";
import AddProductForm       from "../AddProductForm";

configure({adapter : new Adapter()});

describe('<HeadSection > component', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallow(<HeaderSection />)
  });

  it('should have the Add Product form component if state.showAddForm', () => {
    wrapper.setState({showAddForm : true});
    expect(wrapper.find(AddProductForm)).toHaveLength(1);
  });
});
