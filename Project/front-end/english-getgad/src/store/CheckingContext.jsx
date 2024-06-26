import { createContext, useState, useEffect } from "react";
import { tokenLoader } from "../util/auth";
import axios from "axios";

const CheckingContext = createContext({
  text: "",
  setText: () => {},
  spellingErrors: [],
  grammarErrors: [],
  listSuggest: [],
  handleChange: () => {},
  setCorrections: () => {},
  currentUser: null,
  handleCheckGrammar: () => {},
  replaceErrorWord: () => {},
  removeSuggestion: () => {},
  loading: false,
  error: null,
});

export function CheckingContextProvider({ children }) {
  const [text, setText] = useState("");
  const [spellingErrors, setSpellingErrors] = useState([]);
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [listSuggest, setListSuggest] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchUser = async (token) => {
    const response = await fetch(`http://localhost:9999/Users?token=${token}`);
    const users = await response.json();
    return users;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = tokenLoader();

      if (token === null) {
        return;
      }

      const users = await fetchUser(token);
      setCurrentUser(users[0]);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCheckGrammar = async () => {
    setLoading(true);
    setError(null);
    setSpellingErrors([]);
    setGrammarErrors([]);
    setListSuggest([]);

    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: "en-US",
        }),
      });

      const data = await response.json();
      const spelling = [];
      const grammar = [];

      data.matches.forEach((match) => {
        if (match.rule.category.id === "TYPOS") {
          spelling.push(match);
        } else {
          grammar.push(match);
        }
      });

      setSpellingErrors(spelling);
      setGrammarErrors(grammar);

      saveHistoryCheck("Grammar & Spelling");
      findSpellingSuggest(spelling);
      findGrammarSuggest(grammar);

      console.log(currentUser)
      if(currentUser){
        handleShowHistory()
      }
    } catch (err) {
      setError("An error occurred while checking grammar.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckSpelling = async () => {
    setLoading(true);
    setError(null);
    setSpellingErrors([]);
    setGrammarErrors([]);
    setListSuggest([]);

    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: "en-US",
        }),
      });

      const data = await response.json();
      const spelling = [];

      data.matches.forEach((match) => {
        if (match.rule.category.id === "TYPOS") {
          spelling.push(match);
        }
      });

      setSpellingErrors(spelling);
      saveHistoryCheck("Spelling Check");
      findSpellingSuggest(spelling);
    } catch (err) {
      setError("An error occurred while checking grammar.");
    } finally {
      setLoading(false);
    }
  };

  const saveHistoryCheck = async (type) =>{
    console.log(currentUser)
    if(!currentUser) return
    if(!text) return
    const history = {
      text,
      userID : currentUser.userID,
      type,
      date: new Date().toISOString()
    }

    await axios.post("http://localhost:9999/History", history)
  }
  const findSpellingSuggest = (spellingErrors) => {
    spellingErrors.forEach((spelling) => {
      let startIndex = spelling.offset;
      let endIndex = startIndex + spelling.length;
      let result = text.substring(startIndex, endIndex);
      let suggests = spelling.replacements.map((s) => s.value);
      let includeErrorText = spelling.context.text.replace(/\.\.\./g, "");
      setListSuggest((prev) => [
        ...prev,
        {
          includeErrorText,
          type: "Spelling mistake",
          textError: result,
          suggests,
          message: spelling.message,
          index: [startIndex, endIndex],
        },
      ]);
    });
  };

  const findGrammarSuggest = (grammarErrors) => {
    grammarErrors.forEach((grammar) => {
      let startIndex = grammar.offset;
      let endIndex = startIndex + grammar.length;
      let result = text.substring(startIndex, endIndex);
      let suggests = grammar.replacements.map((s) => s.value);
      let includeErrorText = grammar.context.text.replace(/\.\.\./g, "");
      setListSuggest((prev) => [
        ...prev,
        {
          includeErrorText,
          type: "Grammar mistake",
          textError: result,
          suggests,
          message: grammar.message,
          index: [startIndex, endIndex],
        },
      ]);
    });
  };

  const replaceErrorWord = (suggestion, includeErrorText, errorText) => {
    let correctIncludeText = includeErrorText.replace(errorText, suggestion);

    let correctText = text.replace(includeErrorText, correctIncludeText);

    if (text !== correctText && correctText.includes(correctIncludeText)) {
      setText(correctText);
      return true;
    } else {
      handleCheckGrammar();
      return false;
    }
  };

  const removeSuggestion = (index) => {
    setListSuggest((prev) => prev.filter((_, i) => i !== index));
  };

  const handleShowHistory = async () => {
    console.log("Check")

    try {
      const response = await axios.get(
        `http://localhost:9999/History?userID=${currentUser.userID}`
      );
      const data = response.data; 
      console.log(data)
      setHistory(data);
    } catch (err) {
      console.log(err)
      setError("An error occurred while fetching history.");
    } finally {
      console.log("Done")
    }
  };

  const value = {
    text,
    setText,
    spellingErrors,
    grammarErrors,
    listSuggest,
    removeSuggestion,
    handleChange,
    setSpellingErrors,
    setGrammarErrors,
    currentUser,
    handleCheckGrammar,
    replaceErrorWord,
    findSpellingSuggest,
    findGrammarSuggest,
    loading,
    error,
    handleCheckSpelling,
    handleShowHistory,
    history,
  };
  
  return (
    <CheckingContext.Provider value={value}>
      {children}
    </CheckingContext.Provider>
  );
}

export default CheckingContext;
