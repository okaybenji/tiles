var tilesApp = angular.module('tilesApp', []);

tilesApp.controller('tileCtrl', ['$scope', '$timeout',
    
    function tileCtrl($scope, $timeout) {
        
        var colors = [
            'rgb(237,28,36)',
            'rgb(248, 96, 0)',
            'rgb(248, 162, 0)',
            'rgb(255,242,0)',
            'rgb(141,199,63)',
            'rgb(0,166,81)',
            'rgb(0,169,157)',
            'rgb(0,174,239)',
            'rgb(0,114,188)',
            'rgb(46,49,146)',
            'rgb(146,39,143)',
            'rgb(236,0,140)',
            'rgb(237,20,91)'
            ];
        
        var numTiles = 144;

        var Tile = function(color) {
            this.color = color || 'none';
        };
        
        Tile.prototype = {
        
            nextColor: function nextColor() {
                var tile = this;
                var i = colors.indexOf(tile.color);
                tile.flip();
                startTone((i+2)*100);
                //change color just as tile flips
                $timeout(function() {
                    tile.color = colors[(i+1)%colors.length];
                    stopTone();
                }, 300);
            },
            
            setColor: function setColor(color) {
                var tile = this;
                var color = color || colors[0];
                var i = colors.indexOf(color);
                tile.flip();
                startTone((i+1)*100);
                //change color just as tile flips
                $timeout(function() {
                    tile.color = color;
                    stopTone();
                }, 300);
            },
            
            flip: function flip() {
                //if tile is flipped one way, flip it back the other way
                this.transform = (this.transform == 'rotateY(180deg)') ? 'rotateY(0deg)' : 'rotateY(180deg)';
            }
            
        };
        
        $scope.reset = function reset() {
            
            $scope.tiles=[];
            
            for (var i=0; i<numTiles; i++) {
                //$scope.tiles.push(new Tile(colors[i%colors.length])); //option A: load tiles with colors (no animation)
                $scope.tiles.push(new Tile);
            }
        }
        
        //color all tiles in sequence with animation
        $scope.autoFill = function autoFill(i) {
            
            i = i || 0;
            var delay = 10;
            
            $timeout(function() {
                $scope.tiles[i].setColor(colors[i%colors.length]);
                if (i<$scope.tiles.length-1) {$scope.autoFill(i+1);}
            }, delay);
        }
        
        $scope.reset();
        
        //color a tile as a hint that page is ready for user interaction
        $timeout(function() {
            $scope.tiles[0].setColor(colors[0]);
        }, 10);
        
    }
]);