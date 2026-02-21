const StateSelector = ({ states, selected, onSelect }) => {
  return (
    <div className="state-selector">
      <label htmlFor="state">Select a State</label>
      <select
        id="state"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose a state --</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
    </div>
  );
};

export default StateSelector;