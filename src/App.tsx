import { Counter } from "./components/Counter";
import Pokemon from "./components/PokemonAPI/Pokemon";
import StopWatch from "./components/StopWatch/StopWatch";
import TodoList from "./components/TodoList/TodoList";
import OTPInput from "./components/OTPInput/OTPInput";
import PANInputElementEvents from "./components/InputElementEvents/PANInputElementEvents";
import { DigitInput } from "./components/InputElementEvents";
import "./styles.css";
import { Accordion } from "./components/Accordion";
import { accordionData } from "./constants/accordion";
import { StarRating } from "./components/StarRating";
import { HOCConsumer, NestedDependency } from "./components/ReactPrac";
import Portal from "./components/ReactPrac/Portal";
import { UserContext } from "./context/Context";
import { User } from "./components/User";
import { ProgressBar } from "./components/ProgressBar";
import { OTPInputType2 } from "./components/OTPInputType2";
import { AutoCompleteUPI } from "./components/AutoCompleteUPI";
import { FacebookTagging } from "./components/FacebookTagging";
import { ChipsTag } from "./components/ChipsTag";
import { Tabs } from "./components/FormComponentWithTabs";
import RoutingBasic from "./components/RoutingBasic/RoutingBasic";
import { BasicRouter } from "./components/RoutingBasic/routes/BasicRouter";
import { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/RoutingBasic/components/Profile";
import About from "./components/RoutingBasic/components/About";
import Pagination from "./components/Pagination/Pagination";
import AutoCompleteRecipe from "./components/AutoCompleteRecipe/AutoCompleteRecipe";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import { NestedCheckBox } from "./components/NestedCheckBox";
import { default as FileExplorer2 } from "./components/FileExplorer2/FileExplorer";

export default function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return !isOnline ? (
    <h1>You are offline</h1>
  ) : (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div>
        <BasicRouter />
        {/* <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/about"} element={<About />} />
          </Routes>
        </Suspense> */}
      </div>
      {/* <TodoList />
      <Counter /> 
      
      <StopWatch /> 
      <Pokemon />
      <OTPInput /> 
      <PANInputElementEvents />

      <DigitInput />
      <Accordion data={accordionData} /> 
      <StarRating /> 
      <NestedDependency />
      <Portal /> 
      <HOCConsumer /> 
      <UserContext.Provider value={{ name: "Mohit" }}>
        <User />
      </UserContext.Provider> 
      <ProgressBar /> 
      <OTPInputType2 />
      <AutoCompleteUPI /> 
      <FacebookTagging />
      <ChipsTag />
      <Tabs />
      <RoutingBasic /> 
      <Pagination /> 
      <AutoCompleteRecipe /> 
      <FileExplorer />
      <NestedCheckBox />*/}
      <FileExplorer2 />
    </div>
  );
}
