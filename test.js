var request = require('request');
var splitArr =[];
var wordOcr = [,];
var arrPos;


request('http://www.gutenberg.org/files/974/974-0.txt', { ds: false }, (err, res, body) => {
  if (err) { return console.log(err); }
  
  // Display the text
  // console.log(body);
  // Need to clean up this string before we can find words
  splitArr = proccessStr(body).split(" ").sort();

  // Count before the filtering of words.
  console.log("The number of words before filtering is :- " + splitArr.length);

  // Loop ordered words
 for (var i = 0, len = splitArr.length; i < len; i++) {
  var value = splitArr[i].trim().toLowerCase();

  // If the length of the word is more than one put in new array
  if(value.length > 2)
  {
 
    var inList = wordOcr.filter(function(word2, rank){
        return word2[0] == value;});

    if(inList.length == 0)
    { 
      var firstPos = splitArr.indexOf(value);
      var occurences  = 0;
      if(firstPos !=- 1)
      {
      for (var n = firstPos, len = splitArr.length; n < len; n++)
      {
          if(splitArr[n].trim().toLowerCase() == value)
          { 
            occurences = occurences+1;
          }
          else
          {
            // Add the value to the list
            wordOcr.push([value,occurences]);
            break;
          }
      }
      }
  
     
    }
   
  }
}

console.log("Number of words after cleaning out 2 letter words and characters not required." + wordOcr.length);

wordOcr = wordOcr.sort(sortMultiDimensional);

console.log("top 20 words :-")
for (var i = 0, len = wordOcr.length; i < 21; i++)
{
  console.log(wordOcr[i][0] + " " + wordOcr[i][1]);
}

for (var i = 0, len = wordOcr.length; i < 6; i++)
{
  console.log(wordOcr[i][0]);
  var display = '|';
  display = display.repeat(wordOcr[i][1]);
  console.log(display);
}

});


// Process 2
function proccessStr(text) {
  var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
  // strip the string down.
  text = text.trim();
  text = text.replace("\\" + specialChars /"gi", '');
  text = text.replace(/[0-9]/g, ' ');
  text = text.replace(/”/g, '');
  text = text.replace(/“/g, '');
  text = text.replace(/’/g, '');
  text = text.replace(/‘/g, '');
  text = text.replace(/"/g, '');
  text = text.replace(/\n/g, ' ');
  text = text.replace(/\r/g, ' ');
  text = text.replace(/;/g, '');
  text = text.replace(/!/g, '');
  text = text.replace(/,/g, '');
  text = text.replace(/\./g, '');
  text = text.replace(/\*/g, '');
  text = text.replace(/\$/g, '');
  text = text.replace(/\)/g, '');
  text = text.replace(/\(/g, '');
  text = text.replace(/\?/g, '');
  text = text.replace(/\]/g, '');
  text = text.replace(/\[/g, '');
  text = text.replace(/\:/g, '');
  text = text.replace(/\#/g, '');
  return text;
}

function sortMultiDimensional(a,b)
{ 
    return ((a[1] > b[1]) ? -1 : ((a[1] < b[1]) ? 1 : 0));
}

