const fs = require('fs');
const exec = require('child_process').exec;

// Remove space in name and replaced it by underscore
exec("cd ../../svg/ && for file in *; do mv \"$file\" `echo $file | tr ' ' '_'` ; done",
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
// Make letters in svg file name lowercase
exec("cd ../../svg/ && for i in $( ls | grep [A-Z] ); do mv -f $i `echo $i | tr 'A-Z' 'a-z'`; done",
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
// Remove unnecessary tags and attributes from the svgs
const filenames = fs.readdirSync('../../svg');
filenames.map((filename) => {
    fs.readFile(filename, 'utf8', function (err,data) {
      if (err) return console.log(err);
        // Edit svg content here
      var result = data.replace(/string to be replaced/g, 'replacement');
    
      fs.writeFile(filename, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
});
// Add icons in the Array of iconList

// Copy iconList.js file to each package
const frameworks = ['react', 'svelte', 'vue'];
frameworks.forEach(framework => {
    fs.copyFile('iconList.js', `../circum-icons-${framework}/src/iconList.js`, (err) => {
        if (err) throw err;
        console.log(`iconList.js was copied to circum-icons-${framework}/src/`);
    });
});