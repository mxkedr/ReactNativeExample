/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var fetch = require('fetch');
// var rd3 = require('react-d3');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	PixelRatio,
	ListView,
	ScrollView
} = React;

var API_ROUTE = "https://api.imgflip.com/get_memes";
var LOADING = true;
var data = {};
var getImages = function(){
	fetch(API_ROUTE)
	.then((response) => response.json())
	.then((responseText) => {
		LOADING = false;
		data = responseText
		console.log(responseText);
		console.log(data.data.memes[0]['url']);
	})
	.catch((error) => {
		console.warn(error);
	});
};

var ImageCell = React.createClass({
	_onPressButton: function(){
		console.log("pressed");
	},
	imageRender: function(url){
		return (
			<TouchableOpacity onPress={this._onPressButton}>
				<Image style={styles.image} source={{uri: url['url']}}/>
			</TouchableOpacity>
		)
	},
	render: function() {
		return (
			<View style={styles.block}>
				{this.props.images.map(this.imageRender)}
			</View>
		);
	}
});

var awesome = React.createClass({

	getInitialState: function() {
		return {
			isLoading: true,
			dataSource:[]
		};
	},

	componentDidMount: function() {
	    this.loadImages();
	},

	loadImages: function(){
		fetch(API_ROUTE)
		.then((response) => response.json())
		.then((responseText) => {
			this.setState({
				dataSource: responseText.data.memes,
				isLoading: false,
			});
		})
		.catch((error) => {
			console.warn(error);
		});
	},
	renderRow: function(imageArr)  {
		return (
			<ImageCell
				images={imageArr}
			/>
		);
	},
	splitTo: function(arr, num){
		var result = [];
		var time = Math.ceil(arr.length/num);

		for(var i=0; i< time; i ++){
			result.push(arr.splice(0, num))	
		}
		return result;
	},
	render: function() {
		return (
				<ScrollView  style={styles.scrollView}>
					<Text style={styles.welcome}>
						Memes
					</Text>
					{this.splitTo(this.state.dataSource, 3).map(this.renderRow)}
				</ScrollView>
			
		);
	}
});

var pressButton = function(){
	console.log("123");
}

var styles = StyleSheet.create({
	scrollView: {
		marginTop: 30,
	    backgroundColor: '#6A85B1',
	},
	block: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		backgroundColor: '#f6f7f8',
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		marginBottom: 2,
	},
  	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
  	},
  	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
  	},
  	instructions: {
  		flexWrap: 'wrap',
		textAlign: 'center',
		color: '#333333',
  	},
  	image: {
  		marginLeft: 20,
  		width: 50*PixelRatio.get(),
  		height: 50*PixelRatio.get()
	},
	button: {
		height: 36,
		width: 72,
		flexDirection: 'row',
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});

AppRegistry.registerComponent('awesome', () => awesome);
