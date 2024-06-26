import { useContext, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import CheckingContext from "../../../store/CheckingContext";
import { getAuthToken } from "../../../util/auth";
import classes from "./CheckingGrammar.module.css";

function CheckingGrammar() {
  const CheckingCtx = useContext(CheckingContext);
  const token = getAuthToken();
  const premium = useRouteLoaderData("checking");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    CheckingCtx.handleCheckGrammar();
  };

  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

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

  const handleOnClickShowHistory = () => {
    setSelectedHistory((prev) => !prev);
    CheckingCtx.handleShowHistory();
    console.log(CheckingCtx.history);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-24 mx-40">
        <div className="col-span-9">
          <form className={classes.form} onSubmit={handleSubmit}>
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
            <div className="flex flex-row-reverse gap-4">
              <button
                disabled={CheckingCtx.loading}
                type="submit"
                className={classes.btn}
              >
                {CheckingCtx.loading
                  ? "Checking...."
                  : "Check Grammar & Spelling"}
              </button>
              <button
                type="button"
                onClick={handleOnClickShowHistory}
                className={classes.btn}
              >
                View History
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-3">
          <div className={classes.suggestTitle}>Suggestions</div>
          <div className={classes.suggestList}>
            <ul className={classes.ulListSuggest} id={classes.styleScroll}>
              {CheckingCtx.loading ? (
                <p>Suggestions are loading. Please Try Again</p>
              ) : (
                CheckingCtx.listSuggest.map((suggest, index) => (
                  <li
                    key={index}
                    className={classes.suggestItem}
                    onClick={() => handleClick(index)}
                  >
                    <p className={classes.errorWord}>
                      {`${suggest.textError} - ${suggest.type}`}
                    </p>
                    {selectedIndex === index && (
                      <div>
                        <h3 className={classes.message}>{suggest.message}</h3>
                        <p className={classes.titleSuggest}>
                          Suggestions:{" "}
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
      {selectedHistory && (
        <div className={classes.historyBox}>
          <div className={classes.historyTitle}>History Check</div>
          <ul className={classes.historyList}>
            {CheckingCtx.history.map((item, index) => {
              return (
                <li key={index} className={classes.historyItem}>
                  <div className={classes.historyHeader}>
                    <p>{item.type}</p>
                    <p className={classes.historyTime}>{item.date}</p>
                  </div>
                  <p className={classes.historyText}>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default CheckingGrammar;
