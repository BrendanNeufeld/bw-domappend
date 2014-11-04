var domappend = require( '../' ),
	promise = require( 'promise' ),
	find = require( 'dom-select' ),
	test = require( 'tape' );

var nEl = document.createElement( 'div' ),	
	nEl2 = document.createElement( 'div' ),
	nEl3 = document.createElement( 'div' );

nEl.id = 'first';
nEl.innerText = 'Hello burl!';

nEl2.id = 'second';
nEl.innerText = 'Hello world!';

nEl3.id = 'third';
nEl3.innerText = 'Hello whirl!';

test( 'adding dom elements', function( t ) {

	t.plan( 3 );

	promise.resolve( { dataDOM: nEl } )
	.then( domappend )
	.then( function() {

		t.ok( nEl == find( '#first' ), 'appended the first element' );
	})
	.then( function() {

		promise.resolve( { parentDOM: '#first', dataDOM: nEl2 } )
		.then( domappend )
		.then( function() {

			t.ok( nEl2 == find( '#second' ), 'appended the second element to first using string selector' );
		})
		.catch( function( e ) {

			t.error( e, 'second promise failed' );
			t.end();
		});
	})
	.then( function() {

		promise.resolve( { parentDOM: find( '#first' ), dataDOM: nEl3 } )
		.then( domappend )
		.then( function() {

			t.ok( nEl3 == find( '#third' ), 'appended the third element to first using dom element' );
		})
		.catch( function( e ) {

			t.error( e, 'third promise failed' );
			t.end();
		});
	})
	.catch( function( e ) {

		t.error( e, 'main promise failed' );
		t.end();
	});
})

