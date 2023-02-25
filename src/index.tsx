import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import './index.js'
import { validWords, emojis } from './wordList'

let played: boolean = false;
const words: string[] = [validWords[random(12000)],validWords[random(12000)],validWords[random(12000)]];

console.log(words);

let guessCount: number = 1;
let invalid: boolean = false;

type KeyboardKey = 'q' | 'w' | 'e' | 'r' | 't' | 'y' | 'u' | 'i' | 'o' | 'p' | 'a' | 's' | 'd' | 'f' | 'g' | 'h' | 'j' | 'k' | 'l' | 'ENT' | 'z' | 'x' | 'c' | 'v' | 'b' | 'n' | 'm' | 'DEL';
interface keyboardLayout {
    [key: number]: readonly KeyboardKey[];
}
function createKeyboardLayout(): keyboardLayout {
    return {
        1: ["q","w","e","r","t", "y","u","i","o","p"],
        2: ["a","s","d","f","g","h","j","k","l",],
        3: ["ENT","z","x","c","v","b","n","m","DEL"]
    } as const;
}
interface KeyProps {
    keyValue: string,
    index: number,
    clickKey: (letter: string,e:React.MouseEvent<HTMLDivElement>) => void
}

interface GameBoard {
    [key: number]: string[];
}
const createGameBoard = (numRows: number, numCols: number): GameBoard => {
    return Array.from({length: numRows}, (_, i) => i+1)
    .reduce((acc, row) => {
        acc[row] = new Array(numCols).fill('');
        return acc;
    }, {} as GameBoard);
};

interface resultobj {
    [key: number]: string[];
}
const createObj = (numRows: number, numCols: number): resultobj => {
    return Array.from({length: numRows}, (_, i) => i)
    .reduce((acc, row) => {
        acc[row] = new Array(numCols).fill('');
        return acc;
    }, {} as resultobj);
};

let results = createObj(4, 5);

let round: number = 0;

const Game = () => {
    const [showStart, setShowStart] = React.useState(true)
    const [showBoard, setShowBoard] = React.useState(false)

    const [showRules, setShowRules] = React.useState(false)
    const [showResults, setShowResults] = React.useState(false)

    const onClick = () => {
        setShowStart(false);
        setShowBoard(true);
    }
    const clickRules = () => {setShowRules(prevState => !prevState);}
    const clickResults = () => {setShowResults(prevState => !prevState);}
    const closeCard = () => {
        if(showRules == true || showResults == true) {
            setShowRules(false);
            setShowResults(false);
        }
    }
    useEffect(() => {
        if (round >= 2) {
          setShowResults(true);
        }
    }, [round]);
    return (
        <div>
            <div onClick={closeCard}>
                <header>
                    <h1>SPEEDLE</h1>
                    <div className="header-btns">
                        <button className="rules-btn" onClick={clickRules} >
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 .5A7.77 7.77 0 0 0 0 8a7.77 7.77 0 0 0 8 7.5A7.77 7.77 0 0 0 16 8 7.77 7.77 0 0 0 8 .5zm0 13.75A6.52 6.52 0 0 1 1.25 8 6.52 6.52 0 0 1 8 1.75 6.52 6.52 0 0 1 14.75 8 6.52 6.52 0 0 1 8 14.25z"/><circle cx="7.98" cy="10.95" r=".76"/><path d="M9.73 4.75A2.72 2.72 0 0 0 8 4.19a2.28 2.28 0 0 0-2.41 2.17v.11h1.24v-.1A1.12 1.12 0 0 1 8 5.33a1 1 0 0 1 1.12 1c0 .35-.24.73-.78 1.11a2 2 0 0 0-1 1.46v.36h1.24V9a.76.76 0 0 1 .23-.51A3.92 3.92 0 0 1 9.33 8l.17-.14a2 2 0 0 0 .91-1.67 1.85 1.85 0 0 0-.68-1.44z"/></svg>
                        </button>
                        <button className="rules-btn" onClick={clickResults} >
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.75 13.25V1.5H.5v12a1.24 1.24 0 0 0 1.22 1H15.5v-1.25z"/><path d="M3.15 8H4.4v3.9H3.15zm3.26-4h1.26v7.9H6.41zm3.27 2h1.25v5.9H9.68zm3.27-3.5h1.25v9.4h-1.25z"/></svg>
                        </button>
                    </div>
                </header>
                {/* <button onClick={clearLocalstorage}>reset</button> */}
                <div id="start-div" onClick={onClick}>
                    { showStart && round < 3 ? <Start /> : null }
                </div>
                <div>
                    { showBoard ? <PrintBoard /> : null }
                </div>
            </div>
            <div className='cards'>
                <div>
                    { <Results showResults={showResults} setShowResults={setShowResults} /> }
                </div>
                <div>
                    { <Rules showRules={showRules} setShowRules={setShowRules} /> }
                </div>
            </div>
        </div>
    )
}

const Start = () => (
    <div className='start-container'>
        <div id="start" className="">START</div>
    </div>
)

type RulesProps = {
    showRules: boolean,
    setShowRules: (state: boolean) => void
};
const Rules = ({ showRules, setShowRules }: RulesProps) => {
    return (
        <div className={showRules ? "result-card showCard" : "result-card hideCard"}>
            <button className='close-btn' onClick={() => setShowRules(!showRules)}>
                <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="m14.41 3.27-.82-.94L8 7.17 2.41 2.33l-.82.94L7.05 8l-5.46 4.73.82.94L8 8.83l5.59 4.84.82-.94L8.95 8l5.46-4.73z"/></svg>
            </button>
            <h2>RULES</h2>
            <p>Speedle consists of three rounds:<br /> 5 minutes, 3 minutes, and 1 minute.</p>
            <p>In each round there are 6 tries to guess the word.</p>
            <p>Correct guesses will be added to your final score.</p>
        </div>
    );
};

type ResultProps = {
    showResults: boolean,
    setShowResults: (state: boolean) => void
};
const Results = ({ showResults, setShowResults }: ResultProps) => {
    return(
        <div className={showResults ? "result-card showCard" : "result-card hideCard"}>
            <div className='results-inner'>
            <button className='close-btn' onClick={() => setShowResults(!showResults)}>
                <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="m14.41 3.27-.82-.94L8 7.17 2.41 2.33l-.82.94L7.05 8l-5.46 4.73.82.94L8 8.83l5.59 4.84.82-.94L8.95 8l5.46-4.73z"/></svg>
            </button>
            <h2 className='mar-t-0'>Statistics</h2>
            <div>
                <h3>Games played</h3>
                <p>{ localStorage.getItem('gamesPlayed') }</p>
            </div>
            <h3>Rounds won</h3>
            <div className="round-row">
                <div className='round-label'>1</div>
                <div className='round-num green'>
                    { localStorage.getItem('roundWinPercent0') }%
                </div>
                <div className='round-bar'>
                    <div 
                        className='round-bar-inner green'
                        style={ {width: localStorage.getItem('roundWinPercent0') + "%"} }
                    ></div>
                </div>
            </div>
            <div className="round-row mar-t">
                <div className='round-label'>2</div>
                <div className='round-num yellow'>
                    { localStorage.getItem('roundWinPercent1') }%
                </div>
                <div className='round-bar'>
                    <div 
                        className='round-bar-inner yellow'
                        style={ {width: localStorage.getItem('roundWinPercent1') + "%"} }
                    ></div>
                </div>
            </div>
            <div className="round-row mar-t">
                <div className='round-label'>3</div>
                <div className='round-num red'>
                    { localStorage.getItem('roundWinPercent2') }%
                </div>
                <div className='round-bar'>
                    <div 
                        className='round-bar-inner red'
                        style={ {width: localStorage.getItem('roundWinPercent2') + "%"} }
                    ></div>
                </div>
            </div>
            <button id="share-btn" onClick={share}>SHARE</button>
            </div>
        </div>
    )
}

interface setTime {
    time: number;
}

let myword: string[] = [];
myword[1] = '     ';

const PrintBoard = () => {

    const wordLength: number = 5;
    const wordsPerRound: number = 6;

    let complete: boolean = false;

    const keyboardLayout = createKeyboardLayout();
    let [gameBoard, setGameBoard] = useState(createGameBoard(wordsPerRound, wordLength));
    let newBoard = createGameBoard(wordsPerRound, wordLength);

    // const timeDuration: number[] = [300,600,900];
    // const timeDuration: number[] = [2,2,2];
    const timeDuration: number[] = [300,180,60];

    const [time, setTime] = useState<setTime['time']>(timeDuration[round]);

    let fomattedTime: string = formatTime(time);

    if(round >= 3) {
        fomattedTime = '';
    }

    useEffect(() => {
        let intervalId = setInterval(() => {
            if (time > 0) {
                setTime(prevTime => prevTime - 1);
            } else {
                clearInterval(intervalId);
                complete = true;
                updateLetter('Enter');
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [time]);

    //handle keyboards
    const clickKey = useCallback((letter: string) => {
        updateLetter(letter);
    }, []);

    useEffect(() => {
        const handleKeyDown = (keyCode: KeyboardEvent) => {
            updateLetter(keyCode.key.toString());
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const updateLetter = (letter: string) => {
        if(complete == true || guessCount > (wordsPerRound)) {
            if(letter = "Enter") {
                if( guessCount <= 1 ) {
                    results[round+1] = myword[guessCount].split('');
                } else {
                    results[round+1] = myword[guessCount-1].split('');
                }
                complete = false;
                round += 1;
                for (let i = 0; i < myword.length; i++) {
                    myword[i] = '';
                    for (let j = 0; j < wordLength; j++) {
                        myword[i] += ' ';
                    }
                }
                setTime((prevTime: number) => timeDuration[round]);
                if(round >= 3) {
                    if(played == false) {
                        updateLocalstorage();
                        played = true;
                    }
                    root.render(<Game />);
                } else {
                    guessCount = 1;
                }
            }
        } else {
            //DELETE LETTER
            if(letter == "Backspace" || letter == "DEL") {
                myword[guessCount] =  myword[guessCount].trim().slice(0, -1);
            }
            //check that input is a letter and add if word len in less that 5
            if(/[a-zA-Z]/.test(letter) == true && letter.length < 2) {
                myword[guessCount] =  myword[guessCount].trim();
                if(myword[guessCount].length < wordLength) {
                    myword[guessCount] += letter.toLowerCase();
                }
            }
            if(letter == "Enter" || letter == "ENT") {
                //If the min num of letters per word has been met
                if(myword[guessCount].trim().length >= wordLength) {
                    // If the words is a valid word
                    if( validWords.includes(myword[guessCount]) == true ) {
                        //If guess matches correct word
                        if(words[round] == myword[guessCount]) {
                            complete = true;
                        }
                        guessCount += 1;
                        myword[guessCount] = '';
                    } else {
                        invalid = true;
                    }
                }
            }
        }

        if(round < 3) {

            newBoard = {...gameBoard};

            //Add apces to fill array to 5 letters
            for (let i = 0; i < wordLength; i++) {
                if(myword[guessCount].length < wordLength) {
                    myword[guessCount] += ' ';
                }
            }

            //fill board with current guesses
            for (let i = 1; i < (wordsPerRound+1); i++) {
                if( myword[i] != undefined ) {
                    newBoard[i] = myword[i].split('');
                }
            }

            //Add new guess to board if num of guesses are below wordsPerRound
            if(guessCount < (wordsPerRound+1)) {
                newBoard[guessCount] = myword[guessCount].split('');
            }

            setGameBoard(newBoard);

        }
        
    }

    let maxRound: number = round;
    if(maxRound > 2) {
        maxRound = 2;
    }

    return (
        <div>
            <div id="board">
                <div id="clock">
                    {fomattedTime}
                </div>
                {Object.entries(gameBoard).map(([row, letter]) => {
                    let rowClass: string = 'row';
                    if(invalid == true && guessCount == (Number(row))) {
                        rowClass += ' error';
                        invalid = false;
                    }
                    return(
                        <div key={row} className={rowClass}>
                            {letter.map((letter: string, i: number) => {
                                let letterClass = 'cell';
                                if(row.toString() < guessCount.toString()) {
                                    if(letter == words[maxRound][i]) {
                                        letterClass += ' win';
                                    } else if(words[maxRound].includes(letter) && letter != '') {
                                        letterClass += ' in';
                                    } else {
                                        letterClass += ' wrong';
                                    }
                                }
                                return(
                                    <p key={i} className={letterClass}>{letter}</p>
                                )
                            })}
                        </div>
                    )}
                )}
            </div>
            <div className='keyboard-container'>
                <div className='keyboard'>
                    {Object.entries(keyboardLayout).map(([keyRow, keys], i) => (
                        <div key={i} className={`row${Number(keyRow)}`}>
                            {keys.map((key: string, i: number) => (
                                <Key key={i} keyValue={key} index={i} clickKey={clickKey} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

const Key = (props: KeyProps) => {
    const { keyValue, index, clickKey } = props;
    switch (keyValue) {
        case 'ENT':
            return (<div key={index} className='key key-dbl' onClick={(e) => clickKey(keyValue,e)}>{keyValue}</div>)
        case 'DEL':
            return (<div key={index} className='key key-dbl' onClick={(e) => clickKey(keyValue,e)}>{keyValue}</div>)
        default: 
            return (<div key={index} className='key' onClick={(e) => clickKey(keyValue,e)}>{keyValue}</div>)
    }
};

const container = document.getElementById('app-root')!;
const root = ReactDOM.createRoot(container);

root.render(<Game />);

function random(max: number) {
    return Math.floor(Math.random() * max);
}

function updateLocalstorage() {
    console.log( words, results );
    if(localStorage.getItem("gamesPlayed") == null) {
        //SET DEFAULTS
        localStorage.setItem("gamesPlayed", "0");
        localStorage.setItem("roundWin0", "0");
        localStorage.setItem("roundWin1", "0");
        localStorage.setItem("roundWin2", "0");
        localStorage.setItem("roundWinPercent0", "0");
        localStorage.setItem("roundWinPercent1", "0");
        localStorage.setItem("roundWinPercent2", "0");
    }
    //Increase games played by 1
    addLocal("gamesPlayed");
    //Loop through all results
    for (let i = 0; i < 3; i++) {
        console.log(results[i+1] + ":" + words[i]);
        let resultsWord = '';
        //result letters to word
        for (let j = 0; j < results[i+1].length; j++) {
            resultsWord += results[i+1][j];
        }
        //If result word matches add 1
        if(resultsWord == words[i]) {
            addLocal( "roundWin" + i );
        }
    }
    localStorage.setItem("roundWinPercent0", toPercent( localStorage.getItem("roundWin0") ) );
    localStorage.setItem("roundWinPercent1", toPercent( localStorage.getItem("roundWin1") ) );
    localStorage.setItem("roundWinPercent2", toPercent( localStorage.getItem("roundWin2") ) );
}

function addLocal(s: string) {
    let num = Number(localStorage.getItem(s)) + 1;
    localStorage.setItem(s, num.toString());
}

function clearLocalstorage() {
    for (let key of Object.keys(localStorage)) {
        let value = localStorage.getItem(key);
        localStorage.removeItem(key);
    }
}

function toPercent(i: any) {
    let num: number = (Number(i) /  Number(localStorage.getItem("gamesPlayed")) * 100);
    return Math.trunc(num).toString();
}

function updateEmojiArr() {
    let date = new Date().toLocaleDateString();
    let out: string = 'SPEEDLE \n' + date  + '\n';
    for (let i = 0; i < 3; i++) {
        let guess = words[i].split('');
        for (let j = 0; j < 5; j++) {
            if( guess[j] == results[i+1][j] ) {
                out += emojis[i];
            } else {
                out += emojis[3];
            }
        }
        out += '\n';
    }
    return out;
}

function share() {
    navigator.clipboard.writeText(updateEmojiArr());
}

function formatTime(t: number) {
    let min = Math.floor(t / 60);
    let sec = (t - (min * 60)).toString();
    if(sec.length < 2) {
        sec = "0" + sec;
    }
    return min + ":" + sec;
}