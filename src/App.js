import React, { Component, Suspense, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import loadable from "@loadable/component";
/**
 * loadable component
 * 사용법은 React.lazy와 비슷하고 Suspense를 사용하지않는다.
 */

const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>loading...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe.preload();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!!!
        </p>
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

/**
 * React.lazy 와 Suspense 를 이용한 코드 스플리팅
 */
// const SplitMe = React.lazy(() => import("./SplitMe"));

// function App() {
//   const [visible, setVisible] = useState(false);
//   const onClick = () => {
//     setVisible(true);
//   };
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p onClick={onClick}>Hello React!!!</p>
//         <Suspense fallback={<div>loading....</div>}>
//           {visible && <SplitMe />}
//         </Suspense>
//       </header>
//     </div>
//   );
// }

// 아무것도 사용하지 않은 코드 스플리팅

// class App extends Component {
//   state = {
//     SplitMe: null,
//   };
//   handleClick = async () => {
//     const loadeModule = await import("./SplitMe");
//     this.setState({
//       SplitMe: loadeModule.default,
//     });
//   };
//   // const onClick = () => {
//   //   import("./nofify").then((result) => result.default());
//   // };
//   render() {
//     const { SplitMe } = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p onClick={this.handleClick}>Hello React!!!</p>
//           {SplitMe && <SplitMe />}
//         </header>
//       </div>
//     );
//   }
// }

export default App;
