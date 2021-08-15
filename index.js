const {
    Midi
} = require('@tonejs/midi');
let fs = require('fs');

let midiName = process.argv[2];

fs.readFile(midiName + ".mid", function (err, data) {
    fs.readFile("template.osu", "utf-8", function (err, osu) {

        let midiData = new Midi(data);
        fs.writeFile("out/" + midiName + ".json", JSON.stringify(midiData), () => {})

        let bpm = midiData.header.tempos[0].bpm;
        osu = osu.replace(/{BEATLENGTH}/g, 1 / bpm * 60 * 1000);
        let track = midiData.tracks[0];
        let notes = track.notes;
        let hitObjects = "";


        for (let i = 0; i < notes.length; i++) {
            let hitsound = 0;
            let lastNote = notes[i - 1];
            let thisNote = notes[i];
            let nextNote = notes[i + 1];
            if (nextNote) {
                //add finish if distance is >700ms
                //add clap if multiple objects are stacked 
                if (thisNote.time == nextNote.time && nextNote.time - thisNote.time > 0.4) hitsound = 12;
                else if (thisNote.time == nextNote.time) hitsound = 8;
                else if (nextNote.time - thisNote.time > 0.4) hitsound = 4;
            }

            //only add line if the previous got different timing
            if (lastNote && lastNote.time != thisNote.time)
                hitObjects += `256,193,${notes[i].time*1000},5,${hitsound},0:0:0:0:\n`
        }
        osu = osu.replace(/{HITOBJECTS}/g, hitObjects);
        fs.writeFile("out/" + midiName + ".osu", osu, () => {})
    })
});