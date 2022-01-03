import { useEffect, useState, useRef } from 'react';
import './App.css';

// Displays message and Reset button when Timer is up and and hides on clicking reset button
function Overlay(props) {
  // Display only when game is finished
  if(props.finished){
    return(
      <div id='overlay'>
        <div id='overlay-message'>
          <div id='overlay-text'>Finished!<br/>wpm: {props.wpm}<br/>accuracy: {props.accuracy}%</div>
          <button id='button' onClick={props.reset}>RESET</button>
        </div>
      </div>
    );
  }
  else {
    return(
      <></>
    );
  }
}

function Timer(props) {
  return(
    <div id='timer'>{props.seconds} seconds</div>
  );
}

function ChallengeText(props) {
  return(
    <div id='challengeTextArea'>
      <div style={{display: 'inline'}}>{props.currentLine}</div>
      <br/>
      <div id='next-line'>{props.nextLine}</div>
    </div>
  );
}

function App() {
  // Three little pigs text
  const threeLittlePigs =
  [`Once upon a time there was an old mother pig who had three little pigs and not enough food to feed them. So `,
  `when they were old enough, she sent them out into the world to seek their fortunes. The first little pig was `,
  `very lazy. He didn't want to work at all and he built his house out of straw. The second little pig worked a `,
  `little bit harder but he was somewhat lazy too and he built his house out of sticks. Then, they sang and `,
  `danced and played together the rest of the day. The third little pig worked hard all day and built his house `,
  `with bricks. It was a sturdy house complete with a fine fireplace and chimney. It looked like it could `,
  `withstand the strongest winds. The next day, a wolf happened to pass by the lane where the three little pigs `,
  `lived; and he saw the straw house, and he smelled the pig inside. He thought the pig would make a mighty fine `,
  `meal and his mouth began to water. So he knocked on the door and said: Little pig! Little pig! Let me in! Let `,
  `me in! But the little pig saw the wolf's big paws through the keyhole, so he answered back: No! No! No! Not `,
  `by the hairs on my chinny chin chin! Three Little Pigs straw houseThen the wolf showed his teeth and said: `,
  `Then I'll huff and I'll puff and I'll blow your house down. So he huffed and he puffed and he blew the house `,
  `down! The wolf opened his jaws very wide and bit down as hard as he could, but the first little pig escaped `,
  `and ran away to hide with the second little pig. The wolf continued down the lane and he passed by the second `,
  `house made of sticks; and he saw the house, and he smelled the pigs inside, and his mouth began to water as `,
  `he thought about the fine dinner they would make. So he knocked on the door and said: Little pigs! Little `,
  `pigs! Let me in! Let me in! But the little pigs saw the wolf's pointy ears through the keyhole, so they `,
  `answered back: No! No! No! Not by the hairs on our chinny chin chin! So the wolf showed his teeth and said: `,
  `Then I'll huff and I'll puff and I'll blow your house down! So he huffed and he puffed and he blew the house `,
  `down! The wolf was greedy and he tried to catch both pigs at once, but he was too greedy and got neither! His `,
  `big jaws clamped down on nothing but air and the two little pigs scrambled away as fast as their little `,
  `hooves would carry them. The wolf chased them down the lane and he almost caught them. But they made it to `,
  `the brick house and slammed the door closed before the wolf could catch them. The three little pigs they were `,
  `very frightened, they knew the wolf wanted to eat them. And that was very, very true. The wolf hadn't eaten `,
  `all day and he had worked up a large appetite chasing the pigs around and now he could smell all three of `,
  `them inside and he knew that the three little pigs would make a lovely feast. Three Little Pigs brick house `,
  `So the wolf knocked on the door and said: Little pigs! Little pigs! Let me in! Let me in! But the little pigs `,
  `saw the wolf's narrow eyes through the keyhole, so they answered back: No! No! No! Not by the hairs on our `,
  `chinny chin chin! So the wolf showed his teeth and said: Then I'll huff and I'll puff and I'll blow your house `,
  `down. Well! he huffed and he puffed. He puffed and he huffed. And he huffed, huffed, and he puffed, puffed; `,
  `but he could not blow the house down. At last, he was so out of breath that he couldn't huff and he couldn't `,
  `puff anymore. So he stopped to rest and thought a bit. But this was too much. The wolf danced about with rage `,
  `and swore he would come down the chimney and eat up the little pig for his supper. `,
  `But while he was climbing on to the roof the little pig made up a blazing fire and put on a big pot full of water `,
  `to boil. Then, just as the wolf was coming down the chimney, the little piggy pulled off the lid, and plop! in `,
  `fell the wolf into the scalding water. So the little piggy put on the cover again, boiled the wolf up, and the `,
  `three little pigs ate him for supper.`];
  // history text taken from https://thepracticetest.com/typing/tests/history-topics/
  const historyText = 
  ["From the origins of national school systems in the 19th century, the teaching of history to promote national ",
  "sentiment has been a high priority. In the United States after World War I, a strong movement emerged at the ",
  "university level to teach courses in Western Civilization, so as to give students a common heritage with Europe. ",
  "In the U.S. after 1980, attention increasingly moved toward teaching world history or requiring students to take ",
  "courses in non-western cultures, to prepare students for life in a globalized economy. At the university level, ",
  "historians debate the question of whether history belongs more to social science or to the humanities. Many view ",
  "the field from both perspectives. The teaching of history in French schools was influenced by the Nouvelle ",
  "histoire as disseminated after the 1960s by Cahiers pedagogiques and Enseignement and other journals for teachers. ",
  "Also influential was the Institut national de recherche et de documentation pedagogique, (INRDP). Joseph Leif, the ",
  "Inspector-general of teacher training, said pupils children should learn about historians' approaches as well as ",
  "facts and dates. Louis Francois, Dean of the History/Geography group in the Inspectorate of National Education ",
  `advised that teachers should provide historic documents and promote "active methods" which would give pupils "the `,
  `immense happiness of discovery." Proponents said it was a reaction against the memorization of names and dates `,
  "that characterized teaching and left the students bored. Traditionalists protested loudly it was a postmodern ",
  "innovation that threatened to leave the youth ignorant of French patriotism and national identity."];
  // text from https://thepracticetest.com/typing/tests/classical-literature/
  const literatureText =
  [`I should have lived happy enough in that country, if my littleness had not exposed me to several ridiculous `,
  `and troublesome accidents; some of which I shall venture to relate. Glumdalclitch often carried me into the `,
  `gardens of the court in my smaller box, and would sometimes take me out of it, and hold me in her hand, or `,
  `set me down to walk. I remember, before the dwarf left the queen, he followed us one day into those `,
  `gardens, and my nurse having set me down, he and I being close together, near some dwarf apple trees, I `,
  `must needs show my wit, by a silly allusion between him and the trees, which happens to hold in their `,
  `language as it does in ours. Whereupon, the malicious rogue, watching his opportunity, when I was walking `,
  `under one of them, shook it directly over my head, by which a dozen apples, each of them near as large `,
  `as a Bristol barrel, came tumbling about my ears; one of them hit me on the back as I chanced to stoop, `,
  `and knocked me down flat on my face; but I received no other hurt, and the dwarf was pardoned at my `,
  `desire, because I had given the provocation.`];
  // text from https://thepracticetest.com/typing/tests/classical-literature/
  const christmasCarol =
  [`It was a strange figure--like a child: yet not so like a child as like an old man, viewed through some `,
  `supernatural medium, which gave him the appearance of having receded from the view, and being `,
  `diminished to a child's proportions. Its hair, which hung about its neck and down its back, was white `,
  `as if with age; and yet the face had not a wrinkle in it, and the tenderest bloom was on the skin. The `,
  `arms were very long and muscular; the hands the same, as if its hold were of uncommon strength. Its `,
  `legs and feet, most delicately formed, were, like those upper members, bare. It wore a tunic of the `,
  `purest white; and round its waist was bound a lustrous belt, the sheen of which was beautiful. It `,
  `held a branch of fresh green holly in its hand; and, in singular contradiction of that wintry emblem, `,
  `had its dress trimmed with summer flowers. But the strangest thing about it was, that from the crown `,
  `of its head there sprung a bright clear jet of light, by which all this was visible; and which was `,
  `doubtless the occasion of its using, in its duller moments, a great extinguisher for a cap, which it `,
  `now held under its arm. Even this, though, when Scrooge looked at it with increasing steadiness, was `,
  `not its strangest quality. For as its belt sparkled and glittered now in one part and now in another, `,
  `and what was light one instant, at another time was dark, so the figure itself fluctuated in its `,
  `distinctness: being now a thing with one arm, now with one leg, now with twenty legs, now a pair of `,
  `legs without a head, now a head without a body: of which dissolving parts, no outline would be `,
  `visible in the dense gloom wherein they melted away. And in the very wonder of this, it would be `,
  `itself again; distinct and clear as ever.`]
  const [textToType, setTextToType] = useState(threeLittlePigs)
  // state for the current line of text to be typed
  const [currentLine, setCurrentLine] = useState(0);
  // state for next line to be typed
  const [nextLine, setNextLine] = useState(1);
  // state for text from user inuput
  const [typedText, setTypedText] = useState('');
  // state for seconds
  const [seconds, setSeconds] = useState(0);
  // boolean state for whether test is active or not
  const [isActive, setIsActive] = useState(false);
  // boolean state for whether test is finished or not
  const [finished, setFinished] = useState(false);
  // state for words per minute
  const [wpm, setWpm] = useState(0);
  // state for accuracy
  const [accuracy, setAccuracy] = useState();
  // state for test length
  const [testLength, setTestLength] = useState(60);
  // variable to hold running character count of previous display text lines
  const [runningCharCount, setRunningCount] = useState(textToType[currentLine].length);
  // variable to hold styled array for challenge text
  const [displayText, setDisplayText] = useState(() => {
    let res = [];
    for(var i=0; i<runningCharCount; i++) {
      res.push(<span>{textToType[currentLine][i]}</span>);
    }
    return res;
  });
  // state for previous running char count
  const [prevRunningCount, setPrevRunningCount] = useState(0);
  // state for previous index
  const [prevIndex, setPrevIndex] = useState(0);
  
  // Start the test
  function start() {
    setIsActive(true);
  }

  // update typedText state on input
  function onInput(e) {
    setTypedText(e.target.value);
  }

  // update running count and display text states on current line change
  useEffect(() => {
    if(currentLine==0) {
      setPrevRunningCount(0);
      // reset running character count
      setRunningCount(textToType[currentLine].length);
    }
    else {
      setPrevRunningCount(runningCharCount);
      setRunningCount(runningCharCount => runningCharCount + textToType[currentLine].length);
    }
    // reset display text
    setDisplayText(() => {
      let res = [];
      for(var i=0; i<textToType[currentLine].length; i++) {
        res.push(<span>{textToType[currentLine][i]}</span>);
      }
      return res;
    });
  }, [currentLine]);

  // update display text and running count when selected text changes
  useEffect(() => {
    setRunningCount(runningCharCount => textToType[currentLine].length);
    setDisplayText(() => {
      let res = [];
      for(var i=0; i<textToType[currentLine].length; i++) {
        res.push(<span>{textToType[currentLine][i]}</span>);
      }
      return res;
    });
  }, [textToType])

  // resets the test
  function reset() {
    // reset time back to 0
    setSeconds(0);
    // set test to not active
    setIsActive(false);
    // set finished state to false
    setFinished(false);
    // reset typed to empty string
    setTypedText('');
    // reset current and next lines
    setCurrentLine(0);
    setNextLine(1);
    // reset previous index and previous count
    setPrevRunningCount(0);
    setPrevIndex(0);
  }

  // calculate words per minute and accuracy
  function calculateStats() {
    let typed = typedText.split('');
    let typedWords = typedText.split(' ');
    let toType = textToType.join('');
    let wrong = 0;
    for(let i = 0; i < typedText.length; i++) {
      if(typed[i] != toType[i]) {
        wrong++;
      }
    }
    setAccuracy(parseInt((typed.length-wrong)/typed.length*100));
    setWpm(parseInt((typedWords.length/testLength)*60));
  }

  // set the value of the length element to the testLength state
  function timeSelect(e) {
    setTestLength(e.target.value);
  }

  // set the text to type
  function textSelect(e) {
    if(e.target.value=='threeLittlePigs') {
      setTextToType(threeLittlePigs);
    }
    else if(e.target.value=='historyText') {
      setTextToType(historyText);
    }
    else if(e.target.value=='gulliver') {
      setTextToType(literatureText);
    }
    else if(e.target.value=='christmas') {
      setTextToType(christmasCarol);
    }
  }

  useEffect(() => {
    // When timer reaches the testLength set finished to true and display message
    if(seconds >= testLength) {
      setIsActive(false);
      setFinished(true);
      calculateStats();
    }

    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1
          /* possible accuracy solution
          () => {
            var d = new Date();
            return d.toLocaleTimeString();
        }*/)
      },1000);
      // focus cursor on text box
      document.getElementById('editor').focus();
    }
    else if(!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    var charCount = typedText.length;
    if(charCount >= textToType.join('').length) {
      setIsActive(false);
      setFinished(true);
      calculateStats();
    }
    else if(charCount > runningCharCount-1) {
      setCurrentLine(currentLine => currentLine + 1);
      setNextLine(nextLine => nextLine + 1);
    }
    else if(charCount < prevRunningCount) {
      setCurrentLine(currentLine => currentLine -1);
      setNextLine(nextLine - 1);
    }
    // highlight wrong typed characters in challenge text
    let index = typedText.length - 1;
    if(index<0){
      
    }
    else if(prevIndex > index) {
      setDisplayText(() => {
        const copy = [...displayText];
        copy[prevIndex-prevRunningCount] = <span>{textToType[currentLine][prevIndex-prevRunningCount]}</span>;
        return copy;
      });
      setPrevIndex(index);
    }
    else {
      if(typedText[index] != textToType[currentLine][index-prevRunningCount]) {
        setDisplayText(() => {
          const copy = [...displayText];
          copy[index-prevRunningCount] = <span style={{backgroundColor: 'red'}}>{textToType[currentLine][index-prevRunningCount]}</span>;
          return copy;
        });
      }
      else {
        setDisplayText(() => {
          const copy = [...displayText];
          copy[index-prevRunningCount] = <span style={{backgroundColor: 'hsl(100, 60%, 60%)'}}>{textToType[currentLine][index-prevRunningCount]}</span>;
          return copy;
        });
      }
      setPrevIndex(index);
    }
  }, [typedText]);
  
  return (
    <div className='App'>
      <Overlay
        finished = {finished}
        reset = {reset}
        wpm = {wpm}
        accuracy = {accuracy}
      />
      <h1 id='title'>Typing Test</h1>
      <div className='text-box'>
        <ChallengeText
          currentLine = {displayText}
          nextLine = {textToType[nextLine]}
        />
      </div>
      <div id='info'>
        <select name='text' id='text' onChange={textSelect}>
          <option value='threeLittlePigs'>The Three Little Pigs</option>
          <option value='historyText'>History</option>
          <option value='gulliver'>Gulliver's Travels</option>
          <option value='christmas'>Christmas Carol</option>
        </select>
        <select name='length' id='length' onChange={timeSelect}>
          <option value='60'>1 minute</option>
          <option value='120'>2 minutes</option>
          <option value='180'>3 minutes</option>
        </select>
        <button id='button' type='button' onClick={isActive ? reset : start}>{isActive ? 'RESET' : 'START'}</button>
        <Timer
          seconds={seconds}
        />
      </div>
      <input
        disabled = {!isActive}
        type = 'text'
        id = 'editor'
        value = {typedText}
        onChange = {onInput}
      />
    </div>
  );
}

export default App;
