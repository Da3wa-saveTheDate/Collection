# Birthday Wish Invitation

A standalone birthday invitation website built with plain HTML, CSS, and JavaScript. Open `index.html` directly or host the folder on any static web host.

## Customize

Most content lives in `script.js` inside the `invitation` object:

- `birthdayName`
- `senderName`
- `date`
- `subtitle`
- `letter`
- `secret`
- `song`
- `colors`
- `photos`

Replace the images in `assets/` with real photos. The gallery supports up to 22 images by default.

For real music, add a song file such as `assets/song.mp3`, then set:

```js
song: {
  title: "Your Song Title",
  label: "Birthday song",
  note: "A small soundtrack for the birthday.",
  file: "assets/song.mp3"
}
```

If `file` is empty, the play button uses a generated soft ambience demo instead of loading an audio file.
