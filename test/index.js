var domappend = require( '../' )( 'body' );

var nEl = document.createElement( 'div' ),
	nEl2 = document.createElement( 'div' );

nEl.innerText = 'Hello burl!';
nEl2.innerText = 'Hello world!';

domappend( nEl ).then( domappend( nEl2 ) );