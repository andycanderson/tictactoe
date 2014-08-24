var app = angular.module('tRexToe', []);

app.controller('boardController', ['$scope', function($scope){
	$scope.board = [["","",""],["","",""],["","",""]];
	$scope.player= 1;
	$scope.itsyourturn = "Player 1's turn";
	$scope.winCondition1 = "111";
	$scope.winCondition2 = "222";
	$scope.boardSize = 3;
	$scope.setPic = function(x, y){
		// add && for win condition

		if ($scope.board[x][y]==="" && !checkWinner() && !tie())
		{
			$scope.board[x][y]=$scope.player;
			if (!checkWinner() && !tie()) 
			{
				set_piece_change_turn();
			}
		}
	};

	function set_piece_change_turn(){
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
		for(i=0; i<$scope.boardSize; i++)
		{
			var flatten = $scope.board[i].toString();
			var nocommas = flatten.replace(/,/g , "");
			if (nocommas === $scope.winCondition1 || nocommas === $scope.winCondition2)
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
			var x = scope.board.length-1-i;
			diagonal.push($scope.board[i][x]);

		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.winCondition1 || diagonal===$scope.winCondition2)
		{
			return true;
		}
	};

	function tie(){
		var total_spaces = $scope.board.length*$scope.board.length;
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

	function getWinCondition(size){
		for (i = 0; i < size; i++)
		{
			$scope.winCondition1+="1";
			$scope.winCondition2+="2";
		}
	};

	function flatten(x){
		return x.toString();
	};
	function removeCommas(x){
		return x.replace(/,/g,"");
	};
}]);
