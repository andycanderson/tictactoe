var app = angular.module('tRexToe', []);

app.controller('boardController', ['$scope', function($scope){
	$scope.board = [["","",""],["","",""],["","",""]];
	$scope.player= 1;
	$scope.itsyourturn = "Player 1's turn";
	$scope.winCondition1 = "";
	$scope.winCondition2 = "";
	$scope.boardSize = 3;
	$scope.setPic = function(x, y){
		// add && for win condition
		if ($scope.board[x][y]==="" && !checkWinner() && !tie())
		{
			$scope.board[x][y]=$scope.player;
			console.log(tie());
			$scope.player===2 ? $scope.player-=1 : $scope.player+=1;
			$scope.player===1 ? $scope.itsyourturn = "Player 1's turn" : $scope.itsyourturn = "Player 2's turn";
		}
	};

	// setup logic to test the diff positions
	function checkWinner(){

		var result = false;
		result = ew() || ns(boardSize) || senw() || swne();
		console.log(result);
		return result;
	};



	// <->
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

	// |
	function ns(boardSize){
		var col1 = [];
		var col2 = [];
		var col3 = [];
		for(i=0; i<$scope.board.length;i++)
		{
			for(j=0; j<$scope.board.length;j++)
			{
				if (j === 0)
				{
					col1.push($scope.board[i][j]);
				}
				else if (j ===1)
				{
					col2.push($scope.board[i][j]);
				}
				else
				{
					col3.push($scope.board[i][j]);
				}
			}
		}
		// col1,2,3, to string
		// col1,2,3, remove commas
		col1=removeCommas(flatten(col1));
		col2=removeCommas(flatten(col2));
		col3=removeCommas(flatten(col3));
		
		
		if(col1===$scope.winCondition1 || col1 ===$scope.winCondition2 || col2===$scope.winCondition1 || col2===$scope.winCondition2 || col3===$scope.winCondition1 || col3===$scope.winCondition2)
		{
			return true;
		}
		else
		{
			return false;
		}
	};
	function checkColumn(boardSize){
		return checkColumn(boardSize-1);
	};


	// \
	function senw(){
		var diagonal=[];
		for(i=0; i<$scope.board.length;i++)
		{
			for(j=0; j<$scope.board.length;j++)
			{
				if (i === 0 && j===0)
				{
					diagonal.push($scope.board[i][j]);
				}
				else if (i===1 && j === 1)
				{
					diagonal.push($scope.board[i][j]);
				}
				else if(i===2 && j ===2)
				{
					diagonal.push($scope.board[i][j]);
				}
			}
		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.winCondition1 || diagonal===$scope.winCondition2)
		{
			return true;
		}
		else
		{
			return false;
		}
	};
	
	// /
	function swne(){
		var diagonal=[];
		for(i=0; i<$scope.board.length;i++)
		{
			for(j=0; j<$scope.board.length;j++)
			{
				if (i === 0 && j===2)
				{
					diagonal.push($scope.board[i][j]);
				}
				else if (i===1 && j === 1)
				{
					diagonal.push($scope.board[i][j]);
				}
				else if(i===2 && j ===0)
				{
					diagonal.push($scope.board[i][j]);
				}
			}
		}
		diagonal = removeCommas(flatten(diagonal));
		if(diagonal===$scope.winCondition1 || diagonal===$scope.winCondition2)
		{
			return true;
		}
		else
		{
			return false;
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
