import React, {useState} from 'react';

import _, { attempt } from 'lodash';

import CharacterCard from './CharacterCard';

const prepareStateFromWord = (given_word) => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 1,
        guess: '', //click ไปกี่คำแล้ว
        completed: false //การเล่นจบแล้วรึยัง
    }
}

export default function WordCard(props){

    const [state, setState] = useState(prepareStateFromWord(props.value))
    
    //ทุกครั้งที่มีการคลิกตัวอักษร 
    //activationHandler จะถูกเรียก
    //พร้อมกับบอกว่า ตัวอักษรอะไร
    const activationHandler = c => {
        console.log(`${c} has been activated.`)
        
        let guess = state.guess + c // c คือ ตัวอักษรใหม่
        setState({...state, guess}) // ...state คือ เอา state เดิมทั้งหมดด้วย
                                    // guess คือ เอา state ใหม่

        // check ว่า ความยาวอักษรตรงกันมั้ย
        if(guess.length == state.word.length) {
            if(guess == state.word) { // correct
                console.log('yeah')
                setState({...state, completed: true})
            } else { //incorrect + reset game to play again
                console.log('reset, next attemp')
                setState({...state, guess: '', attempt: state.attempt + 1})
            }
        }
    }

    return (
        <div>
            { 
                state.chars.map((c, i) => 
                <CharacterCard value={c} key={i} activationHandler={activationHandler} attempt={state.attempt}/>
                ) 
            }
        </div>
    );
}
