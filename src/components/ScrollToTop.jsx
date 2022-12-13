import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const thisUrl = this.props.location.pathname+this.props.location.search
    const preUrl = prevProps.location.pathname+prevProps.location.search
    if (thisUrl !== preUrl) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);