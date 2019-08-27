import React                from 'react'
import {configure, shallow} from 'enzyme'
import Adapter              from 'enzyme-adapter-react-16'
import FooterSection        from "./FooterSection";
configure({adapter : new Adapter()});

describe('<FooterSection /> component', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = shallow(<FooterSection/>);
  });

  it('should render the footer wrapper element', function () {
    wrapper = shallow(<FooterSection />);

    console.log(wrapper);
    expect(wrapper.find('.Footer')).toHaveLength(1);
  });

});
