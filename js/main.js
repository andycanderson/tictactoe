var app = angular.module('tRexToe', []);

app.controller('boardController', ['$scope', function($scope){
	
	$scope.scoreKeeper=[0,0];
	$scope.initiate = false;
	$scope.player= 1;
	$scope.itsyourturn = "Player 1's turn";
	
	$scope.setupBoard = function(){
		var x = this.range;
		var board=[];
		for(i=0; i<x; i++)
		{
			board[i]=[];
			for(j=0; j<x; j++)
			{
				board[i][j]="";
			}
		}
		$scope.board = board;
		$scope.initiate = true;	
		$scope.winCondition1 = getWinCondition(1);
		$scope.winCondition2 = getWinCondition(2);
	};

	$scope.setPic = function(x, y){
		if ($scope.board[x][y]==="" && !checkWinner() && !tie())
		{
			$scope.board[x][y]=$scope.player;
			if (!checkWinner() && !tie()) 
			{
				placePieceChangeTurn();
			}
		}
	};

	function placePieceChangeTurn(){
		$scope.player===2 ? $scope.player-=1 : $scope.player+=1;
		$scope.player===1 ? $scope.itsyourturn = "Player 1's turn" : $scope.itsyourturn = "Player 2's turn";
	};

	// setup logic to test the diff positions
	function checkWinner(){

		var result = false;
		result = ew() || ns() || senw() || swne();
		return result;
	};

	// east west
	function ew(){
		for(i=0; i<$scope.board.length; i++)
		{

			var row = removeCommas(flatten($scope.board[i]));
			console.log("this row "+row);
			if (row === $scope.winCondition1 || row === $scope.winCondition2)
			{
				return true;
			}
		}
	};	
	// north south
	function ns(){
		for(i = 0; i<$scope.board.length; i++)
		{
			var playerPieces="";
			for(j = 0; j<$scope.board.length; j++)
			{
				if($scope.board[j][i]===$scope.player)
				{
					playerPieces=playerPieces+$scope.player.toString();
				}
			}
			if(playerPieces===$scope.winCondition1 || playerPieces===$scope.winCondition2)
			{
				return true;
			}
		}
	};
	// diagonal \
	function senw(){
		var diagonal=[];
		for(i=0; i<$scope.board.length;i++)
		{
			diagonal.push($scope.board[i][i]);
		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.winCondition1 || diagonal===$scope.winCondition2)
		{
			return true;
		}
	};
	
	// diagonal /
	function swne(){
		var diagonal=[];
		for(i=0; i<$scope.board.length;i++)
		{
			var x = $scope.board.length-1-i;
			diagonal.push($scope.board[i][x]);

		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.winCondition1 || diagonal===$scope.winCondition2)
		{
			return true;
		}
	};

	function tie(){
		var result; 
		for(i = 0; i<$scope.board.length; i++)
		{
			for(j=0; j<$scope.board.length; j++)
			{
				if($scope.board[i][j]==="")
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
		for (i = 0; i < $scope.board.length; i++)
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
