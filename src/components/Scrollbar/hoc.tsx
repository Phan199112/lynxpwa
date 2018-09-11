import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { default as Component } from './component';

type ChildPropsType = {
  children: JSX.Element | JSX.Element[],
  className?: string,
};

type PropsType = {
  scrollbarRef?: (el: any) => void,
} & RouteComponentProps<{ location: Location }> & ChildPropsType;

const ScrollbarHOC = ({ scrollbarRef, ...props }: PropsType) => (
  <Component ref={scrollbarRef} {...props} />
);

export default withRouter(ScrollbarHOC);
