import { useContext, useState, useEffect } from "react";
import classes from "./CheckingSpelling.module.css";
import CheckingContext from "../../../store/CheckingContext";

function CheckSpelling() {
  const CheckingCtx = useContext(CheckingContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    CheckingCtx.handleCheckGrammar();
  };

  return (
    <div className="grid grid-cols-12 gap-4 mt-24 mx-40 ">
      <div className="col-span-9 ">
        <form action="" className={classes.form} onSubmit={handleSubmit}>
          <label htmlFor="text" className={classes.title}>
            English Only (US)
          </label>
          <textarea
            rows={20}
            className={classes.formInput}
            id="text"
            name="text"
            onChange={CheckingCtx.handleChange}
            value={CheckingCtx.text} 
          ></textarea>
          <button disabled={CheckingCtx.loading} type="submit" className={classes.btn}>
            {CheckingCtx.loading ? 'Checking....' : 'Check Spelling'}
          </button>
        </form>
      </div>
      <div className="col-span-3">
        <div className={classes.suggestTitle}>Suggestions</div>
        <div  className={classes.suggestList} >
          <ul className={classes.ulListSuggest} id={classes.styleScroll}>
            {CheckingCtx.listSuggest.map((suggest, index) => (
              <li key={index} className={classes.suggestItem}>
                {`${suggest.text}  -  ${suggest.type}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CheckSpelling;

// ${suggest.suggests.length > 5 ? suggest.suggests.slice(0,5).join(', ') : suggest.suggests.join(', ')}`