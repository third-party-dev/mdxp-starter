/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import ReactDOM from 'react-dom';
//import Deck, {Zoom} from 'mdxp/core/index.jsx';
import Deck, {Zoom} from '@mdxp/core';
import * as components from '@mdxp/components';

import theme from 'theme/theme.js';
import themeComponents from 'theme/theme-components.js';

import './index.css';
import MDXPresentation from './presentation.mdx';
import One from './one.mdx';
import Two from './two.mdx';
import Empty from './empty.mdx';

//console.log(One({}));
//console.log([...One({}).props.children, ...MDXPresentation({}).props.children]);

function MDXConcat({children}) {
  console.log(children);
  const allMDXChildren = [];
  React.Children.toArray(children).forEach(child => {
    // TODO: Inject 'hr' between sets of children if not already there.
    allMDXChildren.push(...React.Children.toArray(child.type({}).props.children));
  });
  console.log(allMDXChildren);
  const retElem = React.cloneElement(Empty({}), null, allMDXChildren);
  console.log(retElem);
  return retElem;
}

function EntryPoint(props) {
  return (
    <Zoom
      maxWidth={1000}
      width={1000}
      aspectRatio={16 / 9}
      sx={{maxWidth: '100vw', maxHeight: '100vh'}}
    >
      <Deck
        components={{...components, ...themeComponents}}
        Layout={themeComponents.MDXPHeaderLayout}
        layoutOptions={{showSlideNum: false}}
        theme={theme}
        keyboardTarget={window}
      >
        <MDXConcat>
          <One />
          <Two />
          <MDXPresentation />
        </MDXConcat>
      </Deck>
    </Zoom>
  );
}

ReactDOM.render(<EntryPoint />, document.getElementById('app'));
