var app = angular.module('tRexToe', ["firebase"]);

app.controller('boardController', ['$scope','$firebase', function($scope, $firebase){
	
	$scope.q = {};
	$scope.q.scoreKeeper=[0,0];
	$scope.q.initiate = false;
	$scope.q.player= 1;
	$scope.q.end_game;
	$scope.q.over = false;
	$scope.q.swc = [["","",""],["","",""],["","",""]];

	
	$scope.playAgain = function (){
		$scope.q.over = false;
		$scope.q.initiate = false;
		$scope.q.swc = [["","",""],["","",""],["","",""]];
	};

	$scope.setupBoard = function(){
		// var x = this.range;
		var x = 3;
		$scope.q.playerOne = $scope.q.playerOne || "Player 1";
		$scope.q.playerTwo = $scope.q.playerTwo || "Player 2";
		var board=[];
		for(i=0; i<x; i++)
		{
			board[i]=[];
			for(j=0; j<x; j++)
			{
				board[i][j]="";
			}
		}
		$scope.q.board = board;
		var databaseBoard = $firebase(new Firebase("https://trextoe.firebaseio.com/data"));
		databaseBoard.$bind($scope,"q");
		$scope.q.initiate = true;
		$scope.q.itsyourturn = $scope.q.playerOne+"'s turn";	
		$scope.q.winCondition1 = getWinCondition(1);
		$scope.q.winCondition2 = getWinCondition(2);
	};

	$scope.setPic = function(x, y){
		if ($scope.q.board[x][y]==="" && !checkWinner() && !tie())
		{
			$scope.q.board[x][y]=$scope.q.player;
			if (!checkWinner() && !tie()) 
			{
				placePieceChangeTurn();
			}
			else if (checkWinner())
			{
				$scope.q.end_game = $scope.q.player === 1 ? $scope.q.playerOne + " wins!" : $scope.q.playerTwo + " wins!";
				$scope.q.over = true;
				$scope.q.scoreKeeper[$scope.q.player-1]+=1;
			}
			else
			{
				$scope.q.end_game = "Tie.";
				$scope.q.over = true;
			}
		}
	};

	function placePieceChangeTurn(){
		$scope.q.player===2 ? $scope.q.player-=1 : $scope.q.player+=1;
		$scope.q.player===1 ? $scope.q.itsyourturn = $scope.q.playerOne+"'s turn" : $scope.q.itsyourturn = $scope.q.playerTwo+"'s turn";
	};

	// setup logic to test the diff positions
	function checkWinner(){

		var result = false;
		result = ew() || ns() || senw() || swne();

		return result;
	};

	// east west
	function ew(){
		for(i=0; i<$scope.q.board.length; i++)
		{

			var row = removeCommas(flatten($scope.q.board[i]));
			if (row === $scope.q.winCondition1 || row === $scope.q.winCondition2)
			{
				for(k = 0; k<$scope.q.board.length; k++)
				{
					$scope.q.swc[i][k]=1;
				}
				return true;
			}
		}
	};	
	// north south
	function ns(){
		var k;
		for(i = 0; i<$scope.q.board.length; i++)
		{
			var playerPieces="";
			for(j = 0; j<$scope.q.board.length; j++)
			{
				if($scope.q.board[j][i]===$scope.q.player)
				{
					playerPieces=playerPieces+$scope.q.player.toString();
				}
			}
			if(playerPieces===$scope.q.winCondition1 || playerPieces===$scope.q.winCondition2)
			{
				for(k = 0; k<$scope.q.board.length; k++)
				{
					$scope.q.swc[k][i]=1;
				}
				return true;
			}
		}
	};
	// diagonal \
	function senw(){
		var diagonal=[];
		for(i=0; i<$scope.q.board.length;i++)
		{
			diagonal.push($scope.q.board[i][i]);
		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.q.winCondition1 || diagonal===$scope.q.winCondition2)
		{
			for(k=0; k<$scope.q.board.length;k++)
			{
				$scope.q.swc[k][k]="1";
			}
			return true;
		}
	};
	
	// diagonal /
	function swne(){
		var diagonal=[];
		for(i=0; i<$scope.q.board.length;i++)
		{
			var x = $scope.q.board.length-1-i;
			diagonal.push($scope.q.board[i][x]);

		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.q.winCondition1 || diagonal===$scope.q.winCondition2)
		{
			for(k=0; k<$scope.q.board.length; k++)
			{
				var z = $scope.q.board.length-1-k;
				$scope.q.swc[k][z]=1;
			}
			return true;
		}
	};

	function tie(){
		var result; 
		for(i = 0; i<$scope.q.board.length; i++)
		{
			for(j=0; j<$scope.q.board.length; j++)
			{
				if($scope.q.board[i][j]==="")
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
		for (i = 0; i < $scope.q.board.length; i++)
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
