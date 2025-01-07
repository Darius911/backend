
const fs = require("fs");
const path = require("path");

console.log(__dirname);
// failo sukurimas
const dir = path.join(__dirname, "data.txt");

console.log(dir);

const writeToFile = ()=> {
fs.writeFile(dir, "Hello", (err)=>{
    if(err){
        console.log(err);
        return;    
    }
console.log("File written successfully");

})
};
// atsikomentuoti kai reiks

writeToFile(); 

// read file

const readFile = () => {
    fs.readFile(dir, "utf8", (err, data) =>{
        if (err) {
            console.log(err);
            return;
            
        }
        console.log(data);
        
    });
};
readFile();
// prideti i faila
const addFile = () => {
    fs.appendFile('data.txt', 'Hello World!', (err) => {
        if (err) throw err;
        console.log('Data appended to file!');
        });
}

addFile();

// istrina faila
const deleteFile = () => {
    fs.unlink(dir, (err) => {
        if (err) throw err;
        console.log('File content deleted successfully!');
      });
}

deleteFile();







