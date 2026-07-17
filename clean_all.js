const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const templates = ['new_prem2', 'new_prem3', 'new_prem4', 'new_prem5', 'new_prem6', 'new_prem7', 'new_prem8'];

templates.forEach(template => {
    const dir = path.join('public', template);
    if (!fs.existsSync(dir)) return;
    
    walkDir(dir, (filePath) => {
        if (filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.css')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let original = content;
            
            // Replace case-insensitive "the digital yes" with empty string
            content = content.replace(/the digital yes/gi, '');
            // Replace "thedigitalyes"
            content = content.replace(/thedigitalyes/gi, '');
            // Replace "Made with love by"
            content = content.replace(/Made with love by/gi, '');
            
            if (content !== original) {
                fs.writeFileSync(filePath, content);
                console.log('Cleaned text in:', filePath);
            }
        }
    });
});
