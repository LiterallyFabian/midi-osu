# midi-osu
A simple Node.js app that converts midi files to an osu beatmap.

#### Note that this is not close to being in an useful state. It can provide basic timing and in some cases hitsounding, but that's about it.

## Examples
Videos
- [Mori Calliope - 失礼しますが、RIP♥](https://youtu.be/-bLAtgtdAa8?t=43)

Beatmaps 
- [beatmaps.osz](https://github.com/LiterallyFabian/midi-osu/raw/master/examples/beatmaps.osz)

## Usage
Requires Node.js v12+ and a .mid file.

```bash
git clone https://github.com/LiterallyFabian/midi-osu.git
cd midi-osu
npm install
node . [midi path]
```
**Do not** include the `.mid` extension when running the app.

By default the app will create the osu! beatmap out of the midi files first track.
