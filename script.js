
const W = 2;
const H = 1;
const A = 3;

let majorScale = [W, W, H, W, W, W, H];

function scaleBuilder(arr) {
    let scale = [];
    let degree = 0;
    scale.push(degree);
    for (let i = 0; i < arr.length; i++) {
        degree += arr[i];
        scale.push(degree);
    }
    return scale;
}

const MAJOR_SCALE = scaleBuilder([W, W, H, W, W, W]);
const HARMONIC_MINOR_SCALE = scaleBuilder([W, H, W, W, H, A]);
const MEMBER_NAMES = ["root", "third", "fifth", "seventh", "ninth", "eleventh", "thirteenth"];

class Chord {
    constructor(root, scale, number_of_notes, stacking_interval) {
        this.root = root - 1;
        this.scale = scale;
        this.number_of_notes = number_of_notes;
        this.stacking_interval = stacking_interval - 1;
    }

    createChordMembers() {
        this.chordMembers = {};
        for (let i = 0; i < this.number_of_notes; i++) {
            let member = this.scale[(this.root + (this.stacking_interval * i)) % this.scale.length];
            this.chordMembers[MEMBER_NAMES[i]] = member;
        }
    }

    voiceChord() {
        this.voices = {};

        function downOctave(voice) {
            return voice - 12;
        }

        function upOctave(voice) {
            return voice + 12;
        }

        this.voices.soprano = this.chordMembers.seventh || this.chordMembers.root;
        this.voices.alto = this.chordMembers.fifth;
        this.voices.tenor = this.chordMembers.third;
        this.voices.bass = this.chordMembers.root;

        let voiceNames = Object.keys(this.voices);
        let voiceValues = Object.values(this.voices);

        for (let i = 0; i < voiceValues.length; i++) {
            for (let j = i + 1; j < voiceValues.length; j++) {
                if (voiceValues[i] < voiceValues[j]) {
                    voiceValues[j] = downOctave(voiceValues[j]);
                }
            }
        }
        for (let i = 0; i < voiceNames.length; i++) {
            this.voices[voiceNames[i]] = voiceValues[i];
        }
    }
}

let tonicTriad = new Chord(1, MAJOR_SCALE, 3, 3);
let supertonicTriad = new Chord(2, MAJOR_SCALE, 3, 3);
let mediantTriad = new Chord(3, MAJOR_SCALE, 3, 3);
let subdominantTriad = new Chord(4, MAJOR_SCALE, 3, 3);
let dominantTriad = new Chord(5, MAJOR_SCALE, 3, 3);
let submediantTriad = new Chord(6, MAJOR_SCALE, 3, 3);
let leadingtoneTriad = new Chord(7, MAJOR_SCALE, 3, 3);

tonicTriad.createChordMembers();
supertonicTriad.createChordMembers();
mediantTriad.createChordMembers();
subdominantTriad.createChordMembers();
dominantTriad.createChordMembers();
submediantTriad.createChordMembers();
leadingtoneTriad.createChordMembers();

function getRootMotion(chord1, chord2) {
    let degree1 = MAJOR_SCALE.indexOf(chord1.chordMembers.root);
    let degree2 = MAJOR_SCALE.indexOf(chord2.chordMembers.root);
    let dist = Math.abs(degree1 - degree2);

    if (dist === 1 || dist === 6) return "2nd or 7th";
    if (dist === 2 || dist === 5) return "3rd or 6th";
    if (dist === 3 || dist === 4) return "4th or 5th";
}

// Separate upper voices from the bass
// Given [0, 4, 7] and [2, 7, 11] returns [-1, 2, 7]
// Given [0, 4, 7] and [0, 5, 9] returns [0, 5, 9] 

let dist = getRootMotion(tonicTriad, submediantTriad);
console.log(dist);


// console.log(MAJOR_SCALE);

// for (let i = MAJOR_SCALE.length + 6; i > -24; i--) {
//     if (i > -1) {
//         let index = i % MAJOR_SCALE.length;
//     } else {
//         let index;
//         let mod = Math.abs(i % MAJOR_SCALE.length);
//         if (mod === 0) {
//             index = 0;
//         } else {
//             index = MAJOR_SCALE.length - mod;
//         }
//         console.log(MAJOR_SCALE[index]);
//     }

// }

function posNegMod(index, arr) {
    if (index > -1) {
        return arr[index % arr.length];
    } else {
        let i;
        let mod = Math.abs(index % arr.length);
        if (mod === 0) {
            i = 0;
        } else {
            i = arr.length - mod;
        }
        return arr[i];
    }
}

let result = posNegMod(3, MAJOR_SCALE);
console.log(result);