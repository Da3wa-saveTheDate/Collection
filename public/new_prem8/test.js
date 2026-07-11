const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>self\.__next_f\.push\((.*?)\)<\/script>/g);
if (scriptMatch) {
  scriptMatch.forEach(s => {
    try {
      const inner = s.match(/self\.__next_f\.push\((.*)\)/)[1];
      JSON.parse(inner);
      console.log('Valid JSON');
    } catch(e) {
      console.log('Invalid JSON:', e.message);
    }
  });
}
