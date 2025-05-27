const fs = require('fs').promises;
const path = require('path');

const [,,filename1, filename2, command, ...rest ] = process.argv;
const content = rest.join(' ');

if(command === 'create'){
    if(!filename1 || !content){
        console.log('creating a file');
        process.exit(1);
    }
    const filePath = path.join(__dirname, filename1);
    fs.writeFile(filePath, content, 'utf-8')
    .then(() => {
        console.log(`File ${filename1} created successfully!`);
    })
    .catch(err => {
        console.error(`Error creating file: ${err}`);
    });
} else if(command === 'read'){
    if(!filename1){
        console.log('reading a file');
        process.exit(1);
    }
    const filePath = path.join(__dirname, filename1);
    fs.readFile(filePath, 'utf-8')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(`Error reading file: ${err}`);
    });
} else if (command === 'rename') {
    if (!filename1 || !filename2) {
        console.log('renaming a file');
        process.exit(1);
    }

    const oldPath = path.join(__dirname, filename1);
    const newPath = path.join(__dirname, !filename2);

    fs.rename(oldPath, newPath)
    .then(() => console.log(` File renamed from '${filename1}' to '${filename2}'.`))
    .catch(err => console.error(` Error renaming file: ${err.message}`));

} else {
    console.log('wrong command');
}
