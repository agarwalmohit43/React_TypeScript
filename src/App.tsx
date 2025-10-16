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

export default function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
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
      <ChipsTag />*/}

      <Accordion data={accordionData} />
    </div>
  );
}
