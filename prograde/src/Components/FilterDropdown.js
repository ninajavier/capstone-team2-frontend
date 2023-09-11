const FilterDropdown = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <select multiple>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
        <option value="e">E</option>
        <option value="f">F</option>
        <option value="g">G</option>
        <option value="j">J</option>
        <option value="l">L</option>
        <option value="m">M</option>
        <option value="n">N</option>
        <option value="q">Q</option>
        <option value="r">R</option>
        <option value="w">W</option>
        <option value="lirr">LIRR</option>
        <option value="mnr">MNR</option>
        <option value="sirr">SIR</option>

        <option value="c">L</option>
      </select>
    </form>
  );
};

export default FilterDropdown;
