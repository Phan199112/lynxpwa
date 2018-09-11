import * as React from 'react';
import { default as PerfectScrollbar } from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Location } from 'history';

const isWithScrollbar = () => navigator.platform.indexOf('Win') > -1;

type PropsType = {
  location: Location,
  className?: string,
  children: JSX.Element | JSX.Element[],
};

class Scrollbar extends React.Component<PropsType, {}> {
  container: HTMLDivElement;
  perfectScrollbar: PerfectScrollbar;

  componentDidMount() {
    if (isWithScrollbar()) {
      this.perfectScrollbar = new PerfectScrollbar(this.container, {
        suppressScrollX: true,
        suppressScrollY: false,
      });

      document.body.style.overflow = 'hidden';
    }
  }

  componentDidUpdate({ location }: PropsType) {
    if (location.pathname !== this.props.location.pathname) {
      this.container.scrollTop = 0;
    }
  }

  componentWillUnmount() {
    if (isWithScrollbar()) {
      this.perfectScrollbar.destroy();
    }
  }

  update = () => {
    if (this.perfectScrollbar) this.perfectScrollbar.update();
  };

  render() {
    const { className, children } = this.props;
    const style = isWithScrollbar() ? { overflow: 'hidden !important' } : {};

    return (
      <div
        ref={(div) => { this.container = div; }}
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  }
}

export default Scrollbar;
