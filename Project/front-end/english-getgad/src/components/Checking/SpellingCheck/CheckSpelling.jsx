import { useContext, useState } from "react";
import classes from "./CheckingSpelling.module.css";
import { useRouteLoaderData, Link } from "react-router-dom";
import CheckingContext from "../../../store/CheckingContext";
import { getAuthToken } from "../../../util/auth";

function CheckSpelling() {
  const CheckingCtx = useContext(CheckingContext);
  const token = getAuthToken();
  const premium = useRouteLoaderData("checking");
  const [selectedIndex, setSelectedIndex] = useState(null);
  

  // Function to handle the submit of the form
  const handleSubmit = (event) => {
    event.preventDefault();
    CheckingCtx.handleCheckSpelling();
  };

  // Function to handle the click on the suggestion
  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  // Function to handle the choice of suggestion
  const handleChoiceSuggest = (item, includeErrorText, errorText, index) => {
    if (!token) {
      alert("You need to be a premium user to use this feature");
      return;
    }

    const success = CheckingCtx.replaceErrorWord(
      item,
      includeErrorText,
      errorText
    );
    if (success) {
      CheckingCtx.removeSuggestion(index);
    }
  };
  return (
    <div className="grid grid-cols-12 gap-4 mt-24 mx-40">
      <div className="col-span-9">
        <form action="" className={classes.form} onSubmit={handleSubmit}>
          <label htmlFor="text" className={classes.title}>
            {`English Only (US)`}
          </label>
          <textarea
            rows={20}
            className={classes.formInput}
            id="text"
            name="text"
            onChange={CheckingCtx.handleChange}
            value={CheckingCtx.text}
            onCopy={(e) => {
              if (!premium) {
                e.preventDefault();
                alert("You need to be a premium user to copy text");
              }
            }}
          ></textarea>
          <button
            disabled={CheckingCtx.loading}
            type="submit"
            className={classes.btn}
          >
            {CheckingCtx.loading ? "Checking...." : "Check Spelling"}
          </button>
        </form>
      </div>
      <div className="col-span-3">
        <div className={classes.suggestTitle}>Suggestions</div>
        <div className={classes.suggestList}>
          <ul className={classes.ulListSuggest} id={classes.styleScroll}>
            {CheckingCtx.loading ? (
              <p>Suggest List loading. Please Try Again</p>
            ) : (
              CheckingCtx.listSuggest.map((suggest, index) => (
                <li
                  key={index}
                  className={classes.suggestItem}
                  onClick={() => handleClick(index)}
                >
                  <p
                    className={classes.errorWord}
                  >{`${suggest.textError} - ${suggest.type}`}</p>
                  {selectedIndex === index && (
                    <div>
                      <h3 className={classes.message}>{suggest.message}</h3>
                      <p className={classes.titleSuggest}>
                        Suggests:{" "}
                        {suggest.suggests.map((item, i) => (
                          <button
                            key={i}
                            className={classes.buttonSuggest}
                            onClick={() =>
                              handleChoiceSuggest(
                                item,
                                suggest.includeErrorText,
                                suggest.textError,
                                index
                              )
                            }
                          >
                            {item}
                          </button>
                        ))}
                      </p>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CheckSpelling;
