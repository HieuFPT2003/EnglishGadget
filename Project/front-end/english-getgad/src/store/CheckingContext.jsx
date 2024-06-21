import { createContext, useState, useEffect } from "react";
import { tokenLoader } from "../util/auth";

const CheckingContext = createContext({
  text: "",
  setText: () => {},
  spellingErrors: [],
  grammarErrors: [],
  handleChange: () => {},
  setCorrections: () => {},
  currentUser: null,
  handleCheckGrammar: () => {},
  loading: false,
  error: null,
});

export function CheckingContextProvider({ children }) {
  const [text, setText] = useState("");
  const [spellingErrors, setSpellingErrors] = useState([]);
  const [listSuggest, setListSuggest] = useState([]);
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      findSpellingSuggest(spelling);
    } catch (err) {
      setError("An error occurred while checking grammar.");
    } finally {
      setLoading(false);
    }
  };

  const findSpellingSuggest = (spellingErrors) => {
    spellingErrors.map((spelling) => {
      console.log(spelling);

      let startIndex = spelling.offset;
      let endIndex = startIndex + spelling.length;

      let result = text.substring(startIndex, endIndex);

      let suggests = [];

      spelling.replacements.map((s) => {
        suggests.push(s.value);
      });

      console.log(result);

      setListSuggest((prev) => {
        return [
          ...prev,
          {
            type: "Spelling mistake",
            text: result,
            suggests,
            index: [startIndex, endIndex],
          },
        ];
      });
    });
  };

  const value = {
    text,
    setText,
    spellingErrors,
    grammarErrors,
    handleChange,
    setSpellingErrors,
    setGrammarErrors,
    currentUser,
    handleCheckGrammar,
    findSpellingSuggest,
    listSuggest,
    loading,
    error,
  };
  return (
    <CheckingContext.Provider value={value}>
      {children}
    </CheckingContext.Provider>
  );
}

export default CheckingContext;
