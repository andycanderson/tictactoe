var app = angular.module('tRexToe', ["firebase"]);

app.controller('boardController', ['$scope','$firebase', function($scope, $firebase){
	
	$scope.gameboard = {};
	$scope.gameboard.scoreKeeper=[0,0];
	$scope.gameboard.initiate = false;
	$scope.gameboard.player= 1;
	$scope.gameboard.end_game;
	$scope.gameboard.over = false;

	
	$scope.playAgain = function (){
		$scope.gameboard.over = false;
		$scope.gameboard.initiate = false;
	};

	$scope.setupBoard = function(){
		// var x = this.range;
		var x = 3;
		$scope.gameboard.playerOne =  this.playerOne || "Player 1";
		$scope.gameboard.playerTwo = this.playerTwo || "Player 2";
		var board=[];
		for(i=0; i<x; i++)
		{
			board[i]=[];
			for(j=0; j<x; j++)
			{
				board[i][j]="";
			}
		}
		$scope.gameboard.board = board;
		var databaseBoard = $firebase(new Firebase("https://trextoe.firebaseio.com/data"));
		databaseBoard.$bind($scope,"gameboard");


		$scope.gameboard.initiate = true;
		console.log($scope.gameboard.initiate);
		$scope.gameboard.itsyourturn = $scope.gameboard.playerOne+"'s turn";	
		$scope.gameboard.winCondition1 = getWinCondition(1);
		$scope.gameboard.winCondition2 = getWinCondition(2);
	};

	$scope.setPic = function(x, y){
		if ($scope.gameboard.board[x][y]==="" && !checkWinner() && !tie())
		{
			$scope.gameboard.board[x][y]=$scope.gameboard.player;
			if (!checkWinner() && !tie()) 
			{
				placePieceChangeTurn();
			}
			else if (checkWinner())
			{
				$scope.gameboard.end_game = $scope.gameboard.player === 1 ? $scope.gameboard.playerOne + " wins!" : $scope.gameboard.playerTwo + " wins!";
				$scope.gameboard.over = true;
				$scope.gameboard.scoreKeeper[$scope.gameboard.player-1]+=1;
			}
			else
			{
				$scope.gameboard.end_game = "Tie.";
				$scope.gameboard.over = true;
			}
		}
	};

	function placePieceChangeTurn(){
		$scope.gameboard.player===2 ? $scope.gameboard.player-=1 : $scope.gameboard.player+=1;
		$scope.gameboard.player===1 ? $scope.gameboard.itsyourturn = $scope.gameboard.playerOne+"'s turn" : $scope.gameboard.itsyourturn = $scope.gameboard.playerTwo+"'s turn";
	};

	// setup logic to test the diff positions
	function checkWinner(){

		var result = false;
		result = ew() || ns() || senw() || swne();
		return result;
	};

	// east west
	function ew(){
		for(i=0; i<$scope.gameboard.board.length; i++)
		{

			var row = removeCommas(flatten($scope.gameboard.board[i]));
			if (row === $scope.gameboard.winCondition1 || row === $scope.gameboard.winCondition2)
			{
				return true;
			}
		}
	};	
	// north south
	function ns(){
		for(i = 0; i<$scope.gameboard.board.length; i++)
		{
			var playerPieces="";
			for(j = 0; j<$scope.gameboard.board.length; j++)
			{
				if($scope.gameboard.board[j][i]===$scope.gameboard.player)
				{
					playerPieces=playerPieces+$scope.gameboard.player.toString();
				}
			}
			if(playerPieces===$scope.gameboard.winCondition1 || playerPieces===$scope.gameboard.winCondition2)
			{
				return true;
			}
		}
	};
	// diagonal \
	function senw(){
		var diagonal=[];
		for(i=0; i<$scope.gameboard.board.length;i++)
		{
			diagonal.push($scope.gameboard.board[i][i]);
		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.gameboard.winCondition1 || diagonal===$scope.gameboard.winCondition2)
		{
			return true;
		}
	};
	
	// diagonal /
	function swne(){
		var diagonal=[];
		for(i=0; i<$scope.gameboard.board.length;i++)
		{
			var x = $scope.gameboard.board.length-1-i;
			diagonal.push($scope.gameboard.board[i][x]);

		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.gameboard.winCondition1 || diagonal===$scope.gameboard.winCondition2)
		{
			return true;
		}
	};

	function tie(){
		var result; 
		for(i = 0; i<$scope.gameboard.board.length; i++)
		{
			for(j=0; j<$scope.gameboard.board.length; j++)
			{
				if($scope.gameboard.board[i][j]==="")
				{
					return false;
				}
				else
				{
					result = true;
				}
			}
		}
		return result; 
	};

	function getWinCondition(player){
		var x = "";
		for (i = 0; i < $scope.gameboard.board.length; i++)
		{
			x+=player.toString();
		}
		return x;
	};

	function flatten(x){
		return x.toString();
	};
	function removeCommas(x){
		return x.replace(/,/g,"");
	};
}]);
