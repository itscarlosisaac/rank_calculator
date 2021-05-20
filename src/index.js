const fs = require('fs')
const mockedUrl = "./src/data.txt"
const file = process.argv[2];

if( !file ) {
  throw new Error("File can't be empty")
}

let Ranking = [];

// Accepts an url to read the files
const reader = (url = mockedUrl) => {
  return fs.readFileSync(url, 'utf8')
}

// Split the data into matches
const parser = (data) => {
  return data.split('\n').filter(match => match.length )
}

// Determine which team won the match and assings the appropiate points to the team.
const determineWinner = (match) => {
  const game = match.split(", ");
  const players = [];

  game.forEach(team => {
    let temp = team.split(" ")
    players.push({ name: temp[0], points:temp[1] })
  });

  if( players[0].points > players[1].points ){
    addPoints(players[0], 3)
    addPoints(players[1], 0)
  }else if ( players[0].points === players[1].points ) { 
    addPoints(players[0], 1)
    addPoints(players[1], 1)
  }else if ( players[0].points < players[1].points ){
    addPoints(players[1], 3)
    addPoints(players[0], 0)
  }
}

// Add points to the winnner 
const addPoints = (team,  points = 0) => {
  Ranking.some(current => current.name === team.name)  ?
    Ranking.find(e => e.name === team.name).points += points :
    Ranking.push({name: team.name, points})
}

// Returns an array of the teams sorted by points and letter.
const getRankings = (array) => {
  return array.sort( (a, b) => (a.points < b.points) ? 1 : (a.points === b.points) ? ((a.name > b.name) ? 1 : -1) : -1 )
}

// Prints the results in the console
const printResults = (array) => {
  let rank = 1;
  array.forEach((item, index, arr) => {
    console.log(`${rank}. ${item.name} ${item.points}\n`)
    arr[index+1] != undefined ? item.points !== arr[index+1].points ? rank++ : null : null
  })
}

const matches = parser(reader(file));
      matches.map(match => determineWinner(match));

const ranked = getRankings(Ranking)

printResults(ranked);
process.exit(0);