import React, { useCallback, useRef, useState } from 'react';
import Crossword, {ThemeProvider} from '@jaredreisinger/react-crossword';
import styled from 'styled-components';
import logo from './logo.png';

const data = {
  across: {
    5: {
      clue: 'Temple learned to dance by listening to the .....',
      answer: 'BEAT',
      row: 3,
      col: 13,
    },
    7: {
      clue: 'Family of African-American female entertainers in early 20th century (7, 7)',
      answer: 'WHITMANSISTERS',
      row: 6,
      col: 8,
    },
    9: {
      clue: 'African American duets who performed in Stormy Weather (8, 8)',
      answer: 'NICHOLASBROTHERS',
      row: 9,
      col: 5,
    },
    11: {
      clue: 'Second step of Waltz Clog',
      answer: 'SHUFFLE',
      row: 11,
      col: 1,
    },
    12: {
      clue: 'Type of entertainment popular in early 1900s',
      answer: 'VAUDEVILLE',
      row: 11,
      col: 9,
    },
    16: {
      clue: 'Number of films in which Robinson and Temple were cast as a dancing couple',
      answer: 'FOUR',
      row: 13,
      col: 15,
    },
    18: {
      clue: 'Number of choruses in the Shim Sham Shimmy',
      answer: 'ONE',
      row: 15,
      col: 8,
    },
    21: {
      clue: 'Robinson partnered with Temple as the first ..... couple on screen.',
      answer: 'INTERRACIAL',
      row: 16,
      col: 12,
    },
    23: {
      clue: 'First step of Waltz Clog',
      answer: 'LEAP',
      row: 20,
      col: 7,
    },
  },
  down: {
    1: {
      clue: 'Waltz Clog is seen in the ..... step of the Shim Sham .',
      answer: 'FOURTH',
      row: 1,
      col: 9,
    },
    2: {
      clue: 'Double Shuffle is seen in the ..... step of the Shim Sham.',
      answer: 'FIRST',
      row: 2,
      col: 11,
    },
    3: {
      clue: 'Famous one-legged tap dancer',
      answer: 'BATES',
      row: 2,
      col: 15,
    },
    4: {
      clue: 'African American female performers had to negotiate issues of race and ..... in the entertainment industry.',
      answer: 'GENDER',
      row: 2,
      col: 19,
    },
    6: {
      clue: '8-count phrase at the end of the Shim Sham Shimmy',
      answer: 'HALFBREAK',
      row: 5,
      col: 13,
    },
    8: {
      clue: 'Tap dancer after whom the National Tap Dance Day was designated (4, 8)',
      answer: 'BILLROBINSON',
      row: 8,
      col: 6,
    },
    10: {
      clue: 'First step of the Shim Sham Shimmy (4, 4)',
      answer: 'SHIMSHAM',
      row: 10,
      col: 2,
    },
    13: {
      clue: 'The Shim Sham Shimmy is considered the national ..... of tap dancers.',
      answer: 'ANTHEM',
      row: 11,
      col: 10,
    },
    14: {
      clue: 'Co-creater of the Shim Sham Shimmy (7, 4)',
      answer: 'LEONARDREED',
      row: 11,
      col: 16,
    },
    15: {
      clue: 'Second step of the Shim Sham Shimmy',
      answer: 'CROSSOVER',
      row: 13,
      col: 8,
    },
    17: {
      clue: 'Shave and a ..... is a popular break.',
      answer: 'HAIRCUT',
      row: 14,
      col: 20,
    },
    19: {
      clue: 'Number of counts in each step of the Shim Sham',
      answer: 'EIGHT',
      row: 15,
      col: 12,
    },
    20: {
      clue: 'Month in which National Tap Dance day is observed',
      answer: 'MAY',
      row: 15,
      col: 18,
    },
    22: {
      clue: 'Third step of the Shim Sham Shimmy (4, 5)',
      answer: 'TACKANNIE',
      row: 16,
      col: 14,
    },
  },
};

const Page = styled.div`
  padding: 1em;
  >
`;

const Header = styled.h1`
  margin-top: 1em;
  margin-bottom: 1em;
  color: #FF5596;
  font-family: 'Josefin Slab', serif;
  font-size:30px;
`;

const Image = styled.image`
  display: block'
`;

const Commands = styled.div``;

const Command = styled.button`
  margin-right: 1em;
`;

const CrosswordWrapper = styled.div`
  margin-top: 1em;
  max-width: 65em;

  /* and some fun making use of the defined class names */

  .crossword.correct {
    rect {
      stroke: #88FFD1 !important;
    }
    svg > rect {
      fill: #88FFD1 !important;
    }
    text {
      fill: black !important;
    }
  }
  
  .clue {
    font-size:13px;
    font-family: 'Roboto', sans-serif;
  }

  .clue.correct {
    ::before {
      content: '\u2713'; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      margin-right: 0.25em;
    }

    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`;

const Messages = styled.pre`
  background-color: white;
  margin: 1em 0;
  padding: 1em;
`;


// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
  const crossword = useRef();

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  // but we can at least show that they are happening.  You would want to do
  // something more interesting than simply collecting them as messages.
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    setMessages((m) => m.concat(`${message}\n`));
  }, []);


  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`);
    },
    [addMessage]
  );

  return (

    <ThemeProvider 
      theme={{
        columnBreakpoint: '768px',
        gridBackground: '#ffd5e5',
        cellBackground: 'white',
        cellBorder: '#88FFD1',
        textColor: 'black',
        numberColor: 'black',
        focusBackground: '#ffffdd',
        highlightBackground: '#ffffdd',
      }}>

    <Page>

    <img src={logo} alt="Tap Into History" width="150em"/>
      <Header>THE SHIM SHAM SHIMMY CROSSWORD</Header>
      <Commands>
        <Command onClick={fillAllAnswers}>Fill all answers</Command>
        <Command onClick={reset}>Reset</Command>
      </Commands>

      <CrosswordWrapper>
        <Crossword
          data={data}
          ref={crossword}
          onCrosswordCorrect={onCrosswordCorrect}
        />
      </CrosswordWrapper>

    </Page>
    </ThemeProvider>
    
  );
}

export default App;
