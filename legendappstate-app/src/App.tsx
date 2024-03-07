import { ObservableObject, observable, observe } from "@legendapp/state";
import { observer } from "@legendapp/state/react";

const Input = observer(({ state, name }: { name: string; state: ObservableObject<Record<string, string>> }) => {
  return <input value={state[name].get()} onChange={(e) => state[name].set(e.target.value)} />;
});

const App = () => {
  const state = observable<Record<string, string>>(
    Object.fromEntries(Array.from({ length: 10000 }, (_, index) => [`key${index}`, ``]))
  );

  const resetValues = () => {
    state.set(Object.fromEntries(Array.from({ length: 100 }, (_, index) => [`key${index}`, ``])));
  };

  observe(() => {
    console.log("state", state.get());
  });

  return (
    <div>
      <button onClick={resetValues}>Reset</button>

      {Object.keys(state).map((key) => (
        <>
          <br />
          <Input name={key} state={state} />
        </>
      ))}
    </div>
  );
};

export default App;
